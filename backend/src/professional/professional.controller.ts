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
  CreateProfessionalResponseDto,
  ReadQueryProfessionalRequestDto,
  ReadParamProfessionalRequestDto,
} from './schema';

import { EntityNotFound } from '../persistence/error';
import { Response } from 'express';
import { Criteria } from '../persistence/abstract.database';
import { BaseController } from '../base.controller';
import { ProfessionalService } from './professional.service';

@Controller('backend/professional')
@ApiTags('professional')
export class ProfessionalController extends BaseController {
  constructor(private service: ProfessionalService) {
    super();
  }

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

      const result = await this.service.query(filter.itemsPerPage, ...criteria);

      return result.map((professional) => ({
        key: professional.key,
        name: professional.name,
        registry: professional.registry,
        status: professional.status,
      }));
    } catch (e) {}
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async createProfessional(
    @Body() entity: CreateProfessionalRequestDto,
  ): Promise<CreateProfessionalResponseDto> {
    return this.service.put({
      name: entity.name,
      registry: entity.registry,
    });
  }

  @Delete(':key')
  @ApiOkResponse()
  @ApiNoContentResponse()
  async deleteProfessional(
    @Param() param: ReadParamProfessionalRequestDto,
  ): Promise<void> {
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

  @Get(':key')
  @ApiOkResponse()
  @ApiNoContentResponse()
  async readProfessional(
    @Param() param: ReadParamProfessionalRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const professional = await this.service.get(param.key);
      res.json({
        key: professional.key,
        name: professional.name,
        registry: professional.registry,
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
      const updated = await this.service.update(param.key, {
        name: professional.name,
        registry: professional.registry,
      });
      res.json({
        key: param.key,
        name: updated.name,
        registry: updated.registry,
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
