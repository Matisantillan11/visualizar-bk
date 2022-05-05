import { IsNotEmpty, IsString } from 'class-validator';
import Interface from 'src/modules/book/interfaces/book.interface';
import DtoUtil from 'src/utils/dto';

export default class Dto extends DtoUtil implements Interface {
  @IsString({ message: 'El nombre del libro debe ser un string' })
  @IsNotEmpty()
  public name: string;

  @IsString({ message: 'La editorial debe ser un string'})
  @IsNotEmpty()
  public editorial: string

  @IsString({ message: 'El curso debe ser un string'})
  @IsNotEmpty()
  public course: string

  @IsString({ message: 'El profesor debe ser un string'})
  @IsNotEmpty()
  public teacher: string

  @IsString({ message: 'El author debe ser un string'})
  @IsNotEmpty()
  public author: string

  @IsString({ message: 'La tapa del libro debe ser un string'})
  public cover: string

}
