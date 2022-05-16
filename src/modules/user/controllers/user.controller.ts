import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';

import { UserDTO } from 'src/modules/user/dto/user.dto';
import UserSchema from 'src/modules/user/schemas/user.model';

import Responseable from 'src/utils/Ports/Responseable';

//services
import { UserService } from 'src/modules/user/providers/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  private readonly userSchema: any;
  private responseService: Responseable;

  constructor(
    @Inject(ConnectionProvider) private readonly connectionProvider: ConnectionProvider,
    private readonly userService: UserService,
  ) {
    this.userSchema = new UserSchema();
  }

  @Get('/withoutAuth/:db')
  private async getAllWithoutAuth(@Res() response: Response, @Req() request: Request, @Param('db') db: string) {
    try {
      const model: any = await this.connectionProvider.getModel(db, this.userSchema.name, this.userSchema);
      let aggregations: any = request.query.aggregations || {};

      if (request.query) {
        if (request.query.aggregations) {
          try {
            aggregations = JSON.parse(aggregations);
          } catch (error) {
            error = error;
          }
        }
      }

      const userResponse: Responseable = await this.userService.getAll(model, aggregations);

      if (Array.isArray(userResponse.result) && userResponse.result.length > 0) {
        this.responseService = {
          result: userResponse.result,
          status: HttpStatus.OK,
          message: userResponse.message,
          error: '',
        };
      } else {
        this.responseService = {
          result: userResponse.result,
          status: userResponse.status || HttpStatus.NOT_FOUND,
          message: userResponse.message,
          error: userResponse.error,
        };
      }
    } catch (error) {
      console.log(error);

      this.responseService = {
        result: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '',
        error: error.message,
      };
    }

    if (this.responseService.status) {
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    /* return this.userService.getOne(name); */
  }

  @Post()
  async createOne(@Body() payload: UserDTO) {
    const model: any = await this.connectionProvider.getModel('goodforlife', this.userSchema.name, this.userSchema);
    return this.userService.create(model, payload, '61f9d64e2009201a81607470');
  }

  @Delete('/:id')
  async deleteOne(@Res() response: Response, @Req() request: Request, @Param('id') id: string) {
    try {
      const model: any = await this.connectionProvider.getModel('goodforlife', this.userSchema.name, this.userSchema);
      let obj: UserDTO;

      const match = {
        operationType: { $ne: 'D' },
        _id: { $oid: id },
      };

      const aggregations = {
        match,
        limit: 1,
        skip: 0,
      };

      const responseService: Responseable = await this.userService.getAll(model, aggregations);

      if (Object.keys(responseService.result).length > 0) {
        let obj = responseService.result;
        obj.operationType = 'D';

        const deleteResponse = await this.userService.update(id, obj, model, '61f9d64e2009201a81607470');

        this.responseService = {
          result: deleteResponse.result,
          message: deleteResponse.message,
          error: deleteResponse.error,
          status: deleteResponse.status,
        };
      } else {
        this.responseService = {
          result: responseService.result,
          message: responseService.message,
          error: responseService.error,
          status: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      console.log(error);

      this.responseService = {
        result: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '',
        error: error.message,
      };
    }

    if (this.responseService.status) {
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }
  }
}
