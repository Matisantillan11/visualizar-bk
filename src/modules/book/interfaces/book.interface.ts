import InterfaceUtil from 'src/utils/interface';

export default interface User extends InterfaceUtil {
  name: string;
  editorial: string
  course: string
  teacher: string
  author: string
  cover: string
}
