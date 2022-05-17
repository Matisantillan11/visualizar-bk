import GeteableAll from "./geteableAll";
import Saveable from "./saveable";
import Updateable from "./updateable";

export default interface Serviceable extends GeteableAll, Saveable, Updateable {}