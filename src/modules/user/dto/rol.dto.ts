import { IsNotEmpty, IsString } from 'class-validator';
import DtoUtil from 'src/utils/dto';
import Interface from 'src/modules/user/interfaces/rol.interface';

export default class Dto extends DtoUtil implements Interface {
  @IsString({ message: 'El nombre del rol debe ser un string' })
  @IsNotEmpty()
  public name: string;
}
