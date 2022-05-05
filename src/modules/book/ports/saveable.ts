import { Model, Document } from 'mongoose';
import Book from 'src/modules/book/interfaces/book.interface';
import Responseable from "src/utils/Ports/Responseable";

export default interface Saveable {
  create(
    model: Model<Document, {}>, 
    data: Book, 
    idUser: string
    ): Promise<Responseable>;
}