import Schemable from 'src/utils/model';

export const entity: string = 'book';
export const model = {
  name: {
    type: String,
    typed: 'string',
  },
  editorial: {
    type: String,
    typed: 'string',
  },
  course: {
    type: String,
    typed: 'string',
  },
  teacher: {
    type: String,
    typed: 'string',
  },
  author: {
    type: String,
    typed: 'string',
  },
  cover: {
    type: String,
    typed: 'string',
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
