import { Model, Document } from 'mongoose';
import Responseable from 'src/utils/Ports/Responseable';

export default interface GeteableAll {
  getAll(
    model: Model<Document, {}>,
    aggregations: {},
  ): Promise<Responseable>
}