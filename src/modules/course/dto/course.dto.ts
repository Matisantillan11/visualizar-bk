import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose'
import CourseInterface from 'src/modules/course/interfaces/course.interface';
import { UserDTO } from 'src/modules/user/dto/user.dto';
import DtoUtil from 'src/utils/dto';

export class Course extends DtoUtil implements CourseInterface {
   @ApiProperty()
  public name: string;
   @ApiProperty({ type: UserDTO})
  public teacher: Schema.Types.ObjectId;
}

export class CourseSuccess {
  @ApiProperty({ type: Course})
  public result: Course
  @ApiProperty()
  public message: string
  @ApiProperty({ example: false})
  public error: boolean
  @ApiProperty({ example: HttpStatus.CREATED})
  public status: number
}

export class CourseError {
  @ApiProperty()
  public result: {}
  @ApiProperty()
  public message: string
  @ApiProperty({ example: true})
  public error: boolean
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR})
  public status: number
}