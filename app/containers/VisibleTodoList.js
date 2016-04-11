import TodoList from '../components/TodoList'
import {connect}  from 'react-redux'
import * as ActionConstants from '../constants'
import {toggleTodo} from '../actions'

const getVisibleTodos = (
    todos,
    filter
) => {
    switch(filter) {
        case ActionConstants.SHOW_ALL:
            return todos;
        case ActionConstants.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case ActionConstants.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}
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

export default VisibleTodoList
