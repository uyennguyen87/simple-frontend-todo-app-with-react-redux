import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import deepFreeze from 'deep-freeze'
import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'

// -------actions-------//
const addTodo = (name) => {
  return {
    type: "ADD_TODO",
    name
  };
};

const toggleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};

const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

//----------reducers ----------------------------
let initialId = 0;


const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        name: action.name,
        id: initialId ++,
        completed:false
      };

    case 'TOGGLE_TODO':
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

const todos = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO':
        return [
            ...state,
            todo(undefined, action)
        ];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));

    default:
      return state;
  }
};


const visibilityFilter = (state='SHOW_ALL', action) => {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const getVisibleTodos = (
    todos,
    filter
) => {
    switch(filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

 //---------view --------------




const TodoList = ({todos, onTodoClick}) => (
    <ul>
    {
        todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )
    }
    </ul>
)

const Todo = ({onClick, name, completed}) => (
<li
    onClick={onClick}
    style={{
        textDecoration:
            completed?
                'line-through':
                'none'
    }}>
    {name}
 </li>
);

const Link = ({active, children, onClick}) => {
    if (!active) {
        return <span>{children}</span>
    }

    return <a href='#'
            onClick={e => {
                e.preventDefault();
                onClick();
            }}>
            {children}
        </a>
};


const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter="SHOW_ALL"> All </FilterLink>
        {' '}
        <FilterLink filter="SHOW_ACTIVE"> Active </FilterLink>
        {' '}
        <FilterLink filter="SHOW_COMPLETED"> Completed </FilterLink>
    </p>
)



const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer/>
    </div>
)





// --------Container ---------
let AddTodo = ({dispatch}) => {
    let input;
    return (
    <div>
        <input ref={node => {
              input = node;
          }} />
          <button
            onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
              }}>
            Add </button>
  </div>
)}

AddTodo = connect()(AddTodo)


const mapStateToVisibleTodoListProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToVisibleTodoListProps = (dispatch, ownProps) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        }
    }
}

const VisibleTodoList = connect(
    mapStateToVisibleTodoListProps,
    mapDispatchToVisibleTodoListProps
)(TodoList);


const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter !== state.visibilityFilter
    };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () =>  {
            dispatch(setVisibilityFilter(ownProps.filter));
        }
    }
}

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link)


// --------map view & ---- store
ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('app')
)


// const testAddTodo = () => {
//   const beforeState = [];
//   const action = addTodo('Learn Redux');
//   const afterState = [{
//     name: 'Learn Redux',
//         id: 0,
//         completed:false
//   }];

//   deepFreeze(beforeState);
//   deepFreeze(action);

//   expect(todos(beforeState, action)).toEqual(afterState);

// }

// const testToggleTodo = () => {
//     const beforeState = [
//         {
//             name: 'Learn Redux',
//             id: 0,
//             completed: false
//         },
//         {
//             name: 'Learn Redux',
//             id: 1,
//             completed: false
//         }
//     ];

//     const action = toggleTodo(1);


//     const afterState = [
//         {
//             name: 'Learn Redux',
//             id: 0,
//             completed: false
//         },
//         {
//             name: 'Learn Redux',
//             id: 1,
//             completed: true
//         }
//     ];

//     deepFreeze(beforeState);
//     deepFreeze(action);

//     expect(todos(beforeState, action)).toEqual(afterState);
// }


// testAddTodo();
// testToggleTodo();
// console.log('PASSS----');
