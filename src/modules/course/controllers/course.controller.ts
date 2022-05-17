import { Model, Document } from 'mongoose'
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Inject, Post, Query, Req, Res } from '@nestjs/common';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';

import { CourseService } from '../providers/course.service';
import { Course, CourseError, CourseSuccess } from '../dto/course.dto';
import CourseSchema from 'src/modules/course/schemas/course.model'

import Responseable from 'src/utils/Ports/Responseable';

import { RequestAuthenticate } from 'src/utils/Ports/Request'
import { Response } from 'express';


@ApiTags('Course')
@Controller('course')
export class CourseController {
  private readonly courseSchema: CourseSchema
  responseService: Responseable

  constructor(
    @Inject(ConnectionProvider) private readonly connectionProvider: ConnectionProvider,
    private readonly courseService: CourseService,
  ){
    this.courseSchema = new CourseSchema()
  }

  @ApiQuery({name: 'aggregations', description: 'query param used to send to the method all query aggregations of mongodb', required: false})
  @ApiResponse({ status: HttpStatus.OK, description: 'Courses obtained successfully', type: CourseSuccess})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized', type: CourseError})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Courses not found', type: CourseError})
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unhandled Exception.', type: CourseError})
  @Get()
  private async getAll(@Req() req: RequestAuthenticate, @Query() query, @Res() res: Response){
    try {
      const database: string = req.database
      let aggregations: any = query.aggregations || {};

      if (query) {
        if (query.aggregations) {
          try {
            aggregations = JSON.parse(aggregations);
          } catch (error) {
            error = error;
          }
        }
      }

      if(database){
        const model: Model<Document, {}> = await this.connectionProvider.getModel(database, this.courseSchema.name, this.courseSchema)
        const courseResponse = await this.courseService.getAll(model, aggregations)
        if(courseResponse.result.length > 0) {
          this.responseService = {
            result: courseResponse.result,
            message: courseResponse.message,
            error: false,
            status: HttpStatus.OK
          }
        }else{
          this.responseService = {
            result: courseResponse.result,
            message: courseResponse.message,
            error: true,
            status: HttpStatus.NOT_FOUND
          }
        }

      }else{
        this.responseService = {
          result: {},
          message: 'Unauthorized.',
          error: true,
          status: HttpStatus.UNAUTHORIZED
        }
      }
    } catch (error) {
      this.responseService = {
        result: {},
        message: error.message,
        error: true,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

    if(this.responseService.status){
      res.status(this.responseService.status).send(this.responseService)
    } else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService)
    }
  }


  @ApiConsumes('application/json')
  @ApiBody({ type: Course})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Course created successfully', type: CourseSuccess})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized', type: CourseError})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unhandled exception', type: CourseError})
  @Post()
  private async create(@Body() payload: Course, @Req() req: RequestAuthenticate, @Res() res: Response){
    try {
      const database = req.database
      const userId = req.user._id
      if(database){
        const model: Model<Document, {}> = await this.connectionProvider.getModel(database, this.courseSchema.name, this.courseSchema)
        const createCourse = await this.courseService.create(model, payload, userId )

        if(Object.keys(createCourse.result).length > 0){
          

          this.responseService = {
            result: createCourse.result,
            message: createCourse.message,
            error: false,
            status: HttpStatus.CREATED
          }
        }else{
          this.responseService = {
            result: createCourse.result,
            message: createCourse.message,
            error: true,
            status: HttpStatus.INTERNAL_SERVER_ERROR
          }
        }
      } else{
        this.responseService = {
          result: {},
          message: 'Unhauthorized',
          error: true,
          status: HttpStatus.UNAUTHORIZED
        }
      }

    } catch (error) {
      this.responseService = {
        result: {},
        message: error.message,
        error: true,
        status: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

    if(this.responseService.status){
      res.status(this.responseService.status).send(this.responseService)
    } else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.responseService)
    }
  }
}
