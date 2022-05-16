import { UserDTO } from 'src/modules/user/dto/user.dto';
import Tokenizable from './Tokenizable';

export default interface UserTokenable {
  user: UserDTO;
  token: Tokenizable;
}
