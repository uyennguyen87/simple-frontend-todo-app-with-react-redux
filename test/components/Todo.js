import Todo from '../../app/components/Todo'
import expect from 'expect'
import React from 'react'
import getRenderOutput from './TestComponentUtils'

export const testRenderIncompleteTodo = () => {
    const props = {
        onClick: () => {},
        name: 'Learn Redux',
        completed: false
    }

    const output = getRenderOutput(<Todo {...props} />)

    expect(output.type).toBe('li')
    expect(output.props.children).toBe('Learn Redux')
    expect(output.props.style).toEqual({textDecoration:'none'})
}

export const testRenderCompletedTodo = () => {
    const props = {
        onClick: () => {},
        name: 'Learn Redux',
        completed: true
    }

    const output = getRenderOutput(<Todo {...props} />)

    expect(output.type).toBe('li')
    expect(output.props.children).toBe('Learn Redux')
    expect(output.props.style).toEqual({textDecoration:'line-through'})
}
