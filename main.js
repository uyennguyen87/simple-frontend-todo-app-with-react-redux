import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import deepFreeze from 'deep-freeze'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import TodoApp from './app/TodoApp'
import todoApp from './app/reducers'
import Middleware from './middleware'



ReactDOM.render(
    <Provider store={
        createStore(
            todoApp,
            applyMiddleware (
                Middleware.rafScheduler,
                Middleware.timeoutScheduler,
                Middleware.thunk,
                Middleware.vanillaPromise,
                Middleware.readyStatePromise,
                Middleware.logger,
                Middleware.crashReporter
            )
        )
    }>
        <TodoApp />
    </Provider>,
    document.getElementById('app')
)
