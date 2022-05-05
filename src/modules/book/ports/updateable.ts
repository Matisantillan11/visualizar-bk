import { Model, Document } from 'mongoose';
import Book from 'src/modules/book/interfaces/book.interface';
import Responseable from 'src/utils/Ports/Responseable';

export default interface Updateable {
  update(
    id: string,
    data: Book,
    model: Model<Document, {}>,
    idUser: string,
  ): Promise<Responseable>;
}