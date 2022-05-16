import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import Interface from 'src/modules/user/interfaces/user.interface';
import DtoUtil from 'src/utils/dto';

export class UserDTO extends DtoUtil implements Interface {
  @ApiProperty()
  @IsString({ message: 'El nombre del usuario debe ser un string' })
  @IsNotEmpty()
  public name: string;

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
