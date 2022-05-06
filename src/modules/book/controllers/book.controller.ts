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
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';
import { BookService } from 'src/modules/book/providers/book.service';
import Book from 'src/modules/book/interfaces/book.interface';
import BookSchema from 'src/modules/book/schemas/book.model';
import UserSchema from 'src/modules/user/schemas/user.model';

import Responseable from 'src/utils/Ports/Responseable';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/modules/aws/providers/aws.service';

@Controller('book')
export class BookController {

  private readonly bookSchema: BookSchema
  private readonly userSchema: UserSchema;
  private responseService: Responseable;

  constructor(
    @Inject(ConnectionProvider) private readonly connectionProvider: ConnectionProvider,
    private readonly awsService: AwsService,
    private readonly bookService: BookService,
  ) {
    this.bookSchema = new BookSchema();
    this.userSchema = new UserSchema();
  }

  @Get('/withoutAuth/:db')
  private async getAllWithouthAuth(@Res() response: Response, @Req() request: Request, @Param('db') db: string) {
    try {
      const model: any = await this.connectionProvider.getModel(db, this.bookSchema.name, this.bookSchema);
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

      const bookResponse: Responseable = await this.bookService.getAll(model, aggregations);
    
      if (Array.isArray(bookResponse.result) && bookResponse.result.length > 0) {
        this.responseService = {
          result: bookResponse.result,
          status: HttpStatus.OK,
          message: bookResponse.message,
          error: bookResponse.error,
        }
      } else {
        this.responseService = {
          result: bookResponse.result,
          status: HttpStatus.OK,
          message: bookResponse.message,
          error: bookResponse.error,
        }
      }
    
    } catch (error) {
      console.log(error);

      this.responseService = {
        result: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '',
        error: error.message,
      }
    }

    if(this.responseService.status){
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }

  }

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  private async create(@Res() response: Response, @Body() payload: Book, @UploadedFile() cover: Express.Multer.File) {

    try {
      const model: any = await this.connectionProvider.getModel('visualizar', this.bookSchema.name, this.bookSchema);
      const userModel = await this.connectionProvider.getModel('visualizar', this.userSchema.name, this.userSchema);
      const userAggregtions = {
        match: { 
          //operationType: {$ne: 'D'},
          email: process.env.ADMIN_USER
        },
        limit: 1,
        skip: 0
      }
      const adminResponse = await this.bookService.getAll(userModel, userAggregtions);



      if(Object.keys(adminResponse.result).length > 0){

        if(cover){
          const file: any = await this.awsService.upload(cover);
          if(file.Location){
            payload.cover = file.Location;
          }
        }
        
        const saveResponse = await this.bookService.create(model, payload, adminResponse.result._id);
        if(Object.keys(saveResponse).length > 0){
          this.responseService = {
            result: saveResponse.result,
            status: HttpStatus.CREATED,
            message: saveResponse.message,
            error: saveResponse.error,
          }
        } else{
          this.responseService = {
            result: saveResponse.result,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: saveResponse.message,
            error: saveResponse.error,
          }
        }
      } else {
        this.responseService = {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: adminResponse.message,
          error: adminResponse.error
        }
      }

    }catch(error){
      console.log(error)
      this.responseService = {
        result: error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '',
        error: 'Book cannot be updated.',
      }
    }

    if(this.responseService.status){
      response.status(this.responseService.status).send(this.responseService);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }

  }


  @Put('/:id')
  @UseInterceptors(FileInterceptor('cover'))
  private async Update(@Req() request: Request, @Res() response: Response, @Param('id') id: string, @Body() payload: Book, @UploadedFile() cover: Express.Multer.File) {

    try {
      
      const model: any = await this.connectionProvider.getModel('visualizar', this.bookSchema.name, this.bookSchema);
      const userModel = await this.connectionProvider.getModel('visualizar', this.userSchema.name, this.userSchema);
      const id = request.params.id;
    
      const userAggregtions = {
        match: { 
          //operationType: {$ne: 'D'},
          email: process.env.ADMIN_USER
        },
        limit: 1,
        skip: 0
      }
      const adminResponse = await this.bookService.getAll(userModel, userAggregtions);

      if(Object.keys(adminResponse.result).length > 0){
        if(cover){
          const file: any = await this.awsService.upload(cover);
          if(file.Location){
            payload.cover = file.Location;
          }
        }

        payload.operationType = 'U'
        const updateResponse = await this.bookService.update(model, id, payload, adminResponse.result._id);
        if(Object.keys(updateResponse.result).length > 0){
          this.responseService = {
            result: updateResponse.result,
            status: HttpStatus.OK,
            message: updateResponse.message,
            error: updateResponse.error,
          }
        }else{
          this.responseService = {
            result: updateResponse.result,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: updateResponse.message,
            error: updateResponse.error,
          }
        }
      }else {
        this.responseService = {
          result: adminResponse.result,
          status: HttpStatus.NOT_FOUND,
          message: adminResponse.message,
          error: adminResponse.error,
        }
      }

    } catch (error) {
      this.responseService = {
        result: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        error: error,
      }
    }

    if(this.responseService.status){
      response.status(this.responseService.status).send(this.responseService);
    }else{
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }

  }

  @Delete('/:id')
  private async Delete(@Req() request: Request, @Res() response: Response, @Param('id') id: string) {
    try {
      
      const model: any = await this.connectionProvider.getModel('visualizar', this.bookSchema.name, this.bookSchema);
      const userModel = await this.connectionProvider.getModel('visualizar', this.userSchema.name, this.userSchema);
      const id = request.params.id;

      const aggregations = {
        match: { 
          operationType: {$ne: 'D'},
          _id: { $oid: id }
        },
        limit: 1,
        skip: 0
      }
      const payload = await this.bookService.getAll(model, aggregations)
    
      if(Object.keys(payload.result).length > 0){

        const userAggregtions = {
          match: { 
            //operationType: {$ne: 'D'},
            email: process.env.ADMIN_USER
          },
          limit: 1,
          skip: 0
        }
        const adminResponse = await this.bookService.getAll(userModel, userAggregtions);
  
        if(Object.keys(adminResponse.result).length > 0){
          
          payload.result.operationType = 'D'
          const deleteResponse = await this.bookService.update(model, id, payload.result, adminResponse.result._id);
          if(Object.keys(deleteResponse.result).length > 0){
            this.responseService = {
              result: deleteResponse.result,
              status: HttpStatus.OK,
              message: deleteResponse.message,
              error: deleteResponse.error,
            }
          }else{
            this.responseService = {
              result: deleteResponse.result,
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: deleteResponse.message,
              error: deleteResponse.error,
            }
          }
        }else {
          this.responseService = {
            result: adminResponse.result,
            status: HttpStatus.NOT_FOUND,
            message: adminResponse.message,
            error: adminResponse.error,
          }
        }
      }else{
        this.responseService = {
          result: payload.result,
          status: HttpStatus.NOT_FOUND,
          message: payload.message,
          error: payload.error,
        }
      }

    } catch (error) {
      this.responseService = {
        result: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        error: error,
      }
    }

    if(this.responseService.status){
      response.status(this.responseService.status).send(this.responseService);
    }else{
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService);
    }
  }
  
}
