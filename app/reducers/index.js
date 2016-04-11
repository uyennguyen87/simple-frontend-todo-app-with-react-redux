import {combineReducers} from 'redux'
import * as ActionConstants from '../constants'

export const todo = (state, action) => {
  switch(action.type) {
    case ActionConstants.ADD_TODO:
      return {
        name: action.name,
        id: action.id,
        completed:false
      };

    case ActionConstants.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

export const todos = (state=[], action) => {
  switch(action.type) {
    case ActionConstants.ADD_TODO:
        return [
            ...state,
            todo(undefined, {...action, id: state.length})
        ];

    case ActionConstants.TOGGLE_TODO:
      return state.map(t => todo(t, action));

    default:
      return state;
  }
};


export const visibilityFilter = (state='SHOW_ALL', action) => {
    switch(action.type) {
        case ActionConstants.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}



const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export default todoApp
