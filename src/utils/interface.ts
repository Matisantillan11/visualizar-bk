import Registrable from './Ports/Registrable';
import Identificable from './Ports/Identificable';
import Observationable from './Ports/Observationable';
import OperationableType from './Ports/OperationableType';
import Validable from './Ports/Validable';

export default interface Dtoable extends Registrable, Identificable, Observationable, OperationableType, Validable {
  creationDate: string | Date;
  updateDate: string | Date;
}
