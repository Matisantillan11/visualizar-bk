import UserTokenable from 'src/application/authentication/Ports/UserTokenable';

import { UserDTO } from 'src/modules/user/dto/user.dto';
import Tokenizable from '../Ports/Tokenizable';

export default class UserToken implements UserTokenable {
  public user: UserDTO;
  public token: Tokenizable;
}
