import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import Interface from 'src/modules/book/interfaces/book.interface';
import DtoUtil from 'src/utils/dto';

export class BookDTO extends DtoUtil implements Interface {
  @ApiProperty()
  @IsString({ message: 'El nombre del libro debe ser un string' })
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString({ message: 'La editorial debe ser un string' })
  @IsNotEmpty()
  public editorial: string;

  @ApiProperty()
  @IsString({ message: 'El curso debe ser un string' })
  @IsNotEmpty()
  public course: string;

  @ApiProperty()
  @IsString({ message: 'El profesor debe ser un string' })
  @IsNotEmpty()
  public teacher: string;

  @ApiProperty()
  @IsString({ message: 'El author debe ser un string' })
  @IsNotEmpty()
  public author: string;

  @ApiProperty()
  @IsString({ message: 'La tapa del libro debe ser un string' })
  public cover: string;
}
