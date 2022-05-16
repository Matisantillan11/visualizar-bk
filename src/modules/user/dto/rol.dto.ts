import { IsNotEmpty, IsString } from 'class-validator';
import DtoUtil from 'src/utils/dto';
import Interface from 'src/modules/user/interfaces/rol.interface';
import { ApiProperty } from '@nestjs/swagger';

export class RolDTO extends DtoUtil implements Interface {
  @ApiProperty()
  @IsString({ message: 'El nombre del rol debe ser un string' })
  @IsNotEmpty()
  public name: string;
}
