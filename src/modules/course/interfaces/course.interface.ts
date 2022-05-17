import { Schema } from 'mongoose';
import InterfaceUtil from 'src/utils/interface';

export default interface Course extends InterfaceUtil{
  name: string;
  teacher: Schema.Types.ObjectId;
}