import { AppService } from 'src/app.service';
import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import Serviceable from 'src/modules/course/ports/serviceable';
import Responseable from 'src/utils/Ports/Responseable';
import { Course } from '../dto/course.dto';

@Injectable()
export class CourseService implements Serviceable {
  constructor(
    private readonly utilService: AppService
  ) {}

  getAll(model: Model<Document, {}>, aggregations: {}): Promise<Responseable> {
    return this.utilService.getAll(model, aggregations)
  }

  create(model: Model<Document, {}>, data: Course, idUser: string): Promise<Responseable> {
    return this.utilService.save(data, model, model, idUser)
  }

  update(model: Model<Document, {}>, id: string, data: Course, idUser: string): Promise<Responseable> {
    return this.utilService.update(id, data, model, model, idUser)
  }
}
