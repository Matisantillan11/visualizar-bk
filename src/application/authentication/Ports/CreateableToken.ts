import Identificable from 'src/utils/Ports/Identificable';
import Tokenizable from './Tokenizable';

export default interface CreateableToken {
  createToken(user: Identificable, database: string): Tokenizable;
}
