import { Schema } from 'mongoose';
import Schemable from 'src/utils/model';

export const entity: string = 'book';
export const model = {
  name: {
    type: String,
    typed: 'string',
  },
  
  teacher: {
    ref: 'user',
    type: Schema.Types.ObjectId,
    typed: 'id',
  },
  

  entity: {
    type: String,
    typed: entity,
  },
};
class ENTITY_SCHEMA extends Schemable {
  public name: string;

  constructor() {
    super(model, {
      collection: entity,
    });
    this.name = entity;
  }
}

export default ENTITY_SCHEMA;
