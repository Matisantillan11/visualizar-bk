import { Model, Document } from 'mongoose';
import Book from 'src/modules/book/interfaces/book.interface';
import Responseable from 'src/utils/Ports/Responseable';

export default interface Updateable {
  update(
    model: Model<Document, {}>,
    id: string,
    data: Book,
    idUser: string,
  ): Promise<Responseable>;
}