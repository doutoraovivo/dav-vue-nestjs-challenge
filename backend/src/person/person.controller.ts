import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Query,
  Param,
  Post,
  Put,
  Res,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PersonService } from './person.service';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  PersonDto,
  CreatePersonRequestDto,
  UpdatePersonRequestDto,
} from './schema';
import { CreatePersonResponseDto } from './schema/create.person.response.dto';
import { EntityNotFound } from '../persistence/error';
import { Response } from 'express';
import { Criteria } from '../persistence/abstract.database';
import { ReadQueryPersonRequestDto } from './schema/read.query.person.request.dto';
import { ReadParamPersonRequestDto } from './schema/read.param.person.request.dto';
import { BaseController } from '../base.controller';

/**
 *
 */
@Controller('backend/person')
@ApiTags('person')
export class PersonController extends BaseController {
  constructor(private service: PersonService) {
    super();
  }

  /**
   *
   * @returns
   */
  @Get()
  @ApiOkResponse({
    type: () => PersonDto,
    isArray: true,
  })
  async readPersons(
    @Query() filter: ReadQueryPersonRequestDto,
  ): Promise<PersonDto[]> {
    try {
      const criteria: Criteria[] = [{ key: 'status', op: '==', compare: true }];
      if (filter.name)
        criteria.push({
          key: 'name',
          op: 'like',
          compare: `*${filter.name.replace(/\s/, '*')}*`,
        });

      const result = await this.service.query(filter.itemsPerPage, ...criteria);

      return result.map((person) => ({
        key: person.key,
        name: person.name,
        birth_date: person.birthDate,
        status: person.status,
      }));
    } catch (e) {}
  }

  /**
   *
   * @returns
   */
  @Post()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async createPerson(
    @Body() entity: CreatePersonRequestDto,
  ): Promise<CreatePersonResponseDto> {
    return this.service.put({
      name: entity.name,
      birthDate: entity.birth_date,
    });
  }

  /**
   *
   * @returns
   */
  @Delete(':key')
  @ApiOkResponse()
  @ApiNoContentResponse()
  async deletePerson(@Param() param: ReadParamPersonRequestDto): Promise<void> {
    try {
      await this.service.delete(param.key);
    } catch (e) {
      if (e.constructor.name === EntityNotFound.name) {
        throw new NotFoundException();
      } else {
        throw new ServiceUnavailableException();
      }
    }
  }

  /**
   *
   * @returns
   */
  @Get(':key')
  @ApiOkResponse()
  @ApiNoContentResponse()
  async readPerson(
    @Param() param: ReadParamPersonRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const person = await this.service.get(param.key);
      res.json({
        key: person.key,
        name: person.name,
        birth_date: person.birthDate,
        status: person.status,
      });
    } catch (e) {
      if (e.constructor.name === EntityNotFound.name) {
        res.status(HttpStatus.NO_CONTENT).send();
      } else {
        throw new ServiceUnavailableException();
      }
    }
  }

  /**
   *
   * @returns
   */
  @Put(':key')
  @ApiOkResponse()
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  async updatePerson(
    @Param() param: ReadParamPersonRequestDto,
    @Res() res: Response,
    @Body() person: UpdatePersonRequestDto,
  ): Promise<void> {
    try {
      const updated = await this.service.update(param.key, {
        name: person.name,
        birthDate: person.birth_date,
      });
      res.json({
        key: param.key,
        name: updated.name,
        birth_date: updated.birthDate,
        status: updated.status,
      });
    } catch (e) {
      if (e.constructor.name === EntityNotFound.name) {
        res.status(HttpStatus.NO_CONTENT).send();
      } else {
        throw new ServiceUnavailableException();
      }
    }
  }
}
