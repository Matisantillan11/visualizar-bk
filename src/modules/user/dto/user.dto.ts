import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import Interface from 'src/modules/user/interfaces/user.interface';
import DtoUtil from 'src/utils/dto';
import { RolDTO } from './rol.dto';

export class UserDTO extends DtoUtil implements Interface {
  @ApiProperty()
  @IsString({ message: 'El nombre del usuario debe ser un string' })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({type: RolDTO})
  public rol: Schema.Types.ObjectId;

  @ApiProperty()
  @IsString({ message: 'El teléfono debe ser un string' })
  @IsNotEmpty()
  public phone: string;

  @ApiProperty()
  @IsEmail({ message: 'El email debe ser válido. example@example.com' })
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString({ message: 'La dirección debe ser un string' })
  @IsNotEmpty()
  public address: string;

  @ApiProperty()
  @IsString({ message: 'El país debe ser un string' })
  @IsNotEmpty()
  public country: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public enabled: boolean;
}

export class UserSuccessfully {
  @ApiProperty({ type: UserDTO })
  public result: UserDTO;

  @ApiProperty()
  message: string

  @ApiProperty({ example: false})
  error: boolean

  @ApiProperty({ example: 200})
  status: number
}

export class UserError {
  @ApiProperty()
  public result: {};

  @ApiProperty()
  message: string

  @ApiProperty({ example: true})
  error: boolean

  @ApiProperty()
  status: number
}
