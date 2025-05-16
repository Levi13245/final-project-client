/* ===== /src/store/reducers/campus.js ===== */
import { 
  FETCH_CAMPUS, 
  ADD_STUDENT_TO_CAMPUS, 
  REMOVE_STUDENT_FROM_CAMPUS 
} from "../actions/actionTypes";

const initialState = {
  students: []
};

const campus = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAMPUS:
      return action.payload;
    case ADD_STUDENT_TO_CAMPUS:
      return {
        ...state,
        students: [...state.students, action.payload]
      };
    case REMOVE_STUDENT_FROM_CAMPUS:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
    default:
      return state;
  }
};

export default campus;