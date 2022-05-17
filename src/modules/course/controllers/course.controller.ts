import { Model, Document } from 'mongoose'
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { ConnectionProvider } from 'src/application/database/connectionProvider.service';

import { CourseService } from '../providers/course.service';
import CourseSchema from 'src/modules/course/schemas/course.model'

import UserSchema from 'src/modules/user/schemas/user.model'

import Responseable from 'src/utils/Ports/Responseable';
import { UserService } from 'src/modules/user/providers/user.service';
import { Course, CourseError, CourseSuccess } from '../dto/course.dto';
import { RequestAuthenticate } from 'src/utils/Ports/Request'
import { Response } from 'express';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  private readonly courseSchema: CourseSchema
  private readonly userSchema: UserSchema
  responseService: Responseable

  constructor(
    @Inject(ConnectionProvider) private readonly connectionProvider: ConnectionProvider,
    private readonly courseService: CourseService,
    private readonly userService: UserService
  ){
    this.courseSchema = new CourseSchema()
    this.userSchema = new UserSchema()
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
