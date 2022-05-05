import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { AppService } from 'src/app.service';
import Responseable from 'src/utils/Ports/Responseable';
import Serviceable from '../ports/serviceable';

@Injectable()
export class BookService implements Serviceable {
  constructor(private readonly utilService: AppService) {}

  getAll(model: Model<Document, {}>, aggregations: {}): Promise<Responseable> {
    return this.utilService.getAll(model, aggregations);
  }

  create(model: Model<Document, {}>, data: any, idUser: string): Promise<Responseable> {
    return this.utilService.save(data, model, model, idUser);
  }

  update(id: string, data: any, model: Model<Document, {}>, idUser: string): Promise<Responseable> {
    return this.utilService.update(id, data, model, model, idUser);
  }
}
