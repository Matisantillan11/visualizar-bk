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

export class RolSuccessfully {
  @ApiProperty({type: RolDTO})
  public result: RolDTO;

  @ApiProperty()
  message: string

  @ApiProperty({ example: false})
  error: boolean

  @ApiProperty({ example: 200})
  status: number
}


export class RolError {
  @ApiProperty()
  public result: {};

  @ApiProperty()
  message: string

  @ApiProperty({ example: true})
  error: boolean

  @ApiProperty()
  status: number
}