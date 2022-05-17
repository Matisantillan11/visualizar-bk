import { Model, Document } from 'mongoose';
import Responseable from "src/utils/Ports/Responseable";
import Course from '../interfaces/course.interface';

export default interface Saveable {
  create(
    model: Model<Document, {}>, 
    data: Course, 
    idUser: string
    ): Promise<Responseable>;
}