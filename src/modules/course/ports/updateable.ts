import { Model, Document } from 'mongoose';
import Responseable from 'src/utils/Ports/Responseable';
import Course from '../interfaces/course.interface';

export default interface Updateable {
  update(
    model: Model<Document, {}>,
    id: string,
    data: Course,
    idUser: string,
  ): Promise<Responseable>;
}