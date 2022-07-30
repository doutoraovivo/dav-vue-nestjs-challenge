import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
  Param,
  Post,
  Put,
  Res,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ProfessionalDto,
  CreateProfessionalRequestDto,
  UpdateProfessionalRequestDto,
} from './schema';
import { CreateProfessionalResponseDto } from './schema/create.professional.response.dto';
import { EntityNotFound } from '../core/error';
import { Response } from 'express';
import { Criteria } from '../core/abstract.database';
import { ReadQueryProfessionalRequestDto } from './schema/read.query.professional.request.dto';
import { ReadParamProfessionalRequestDto } from './schema/read.param.professional.request.dto';
import { BaseController } from '../base.controller';

/**
 *
 */
@Controller('backend/professional')
@ApiTags('professional')
export class ProfessionalController extends BaseController {
  constructor(private professionalService: ProfessionalService) {
    super();
  }

  /**
   *
   * @returns
   */
  @Get()
  @ApiOkResponse({
    type: () => ProfessionalDto,
    isArray: true,
  })
  async readProfessionals(
    @Query() filter: ReadQueryProfessionalRequestDto,
  ): Promise<ProfessionalDto[]> {
    try {
      const criteria: Criteria[] = [{ key: 'status', op: '==', compare: true }];
      if (filter.name)
        criteria.push({
          key: 'name',
          op: 'like',
          compare: `*${filter.name.replace(/\s/, '*')}*`,
        });

      const result = await this.professionalService.query(filter.itemsPerPage, ...criteria);

      return result.map((professional) => ({
        key: professional.key,
        name: professional.name,
        register: professional.register,
        status: professional.status,
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
  async createProfessional(
    @Body() entity: CreateProfessionalRequestDto,
  ): Promise<CreateProfessionalResponseDto> {
    return this.professionalService.put({
      name: entity.name,
      register: entity.register,
    });
  }

  /**
   *
   * @returns
   */
  @Delete(':key')
  @ApiOkResponse()
  @ApiNoContentResponse()
  async deleteProfessional(@Param() param: ReadParamProfessionalRequestDto): Promise<void> {
    try {
      await this.professionalService.delete(param.key);
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
  async readProfessional(
    @Param() param: ReadParamProfessionalRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const professional = await this.professionalService.get(param.key);
      res.json({
        key: professional.key,
        name: professional.name,
        register: professional.register,
        status: professional.status,
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
  async updateProfessional(
    @Param() param: ReadParamProfessionalRequestDto,
    @Res() res: Response,
    @Body() professional: UpdateProfessionalRequestDto,
  ): Promise<void> {
    try {
      const updated = await this.professionalService.update(param.key, {
        name: professional.name,
        register: professional.register,
      });
      res.json({
        key: param.key,
        name: updated.name,
        register: updated.register,
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
