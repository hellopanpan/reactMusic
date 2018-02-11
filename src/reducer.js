import {combineReducers} from "redux"
import { MUSIC_LIST } from "./playlistFile"
const Length = MUSIC_LIST.length;
const reducer1 = (state = MUSIC_LIST[0], action) => {
  switch (action.type) {
    case 'NEXT':
      let index = state.id-1+1;
      if(index> Length-1){
        index = 0;
      }
      return MUSIC_LIST[index];
    case "PRE":
      let indexnum = state.id-1-1;
      if(indexnum < 0){
        indexnum = Length-1;
      }
      return MUSIC_LIST[indexnum];
    case "Listen":
      let indexN = action.playload-1;
      return MUSIC_LIST[indexN];
    default:
      return state;
  }
};
const reducer2 = (state = false, action) => {

  switch (action.type) {
    case 'CIRCLE':
      return true;
    case 'NOCIRCLE':
      return false;
    default:
      return state;
  }
};
let reducer	 = combineReducers({
	reducer1,
	reducer2
})
export default	reducer	;
