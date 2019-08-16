# Routines - A Redux/Saga Pattern for Fetching Data

TLDR:
I have a package [redux-routines-ts](https://www.npmjs.com/package/redux-routines-ts) that
implements routines with TypeScript types and inferences, and an [full example](https://codesandbox.io/s/typescript-redux-routines-c7nde).

## Motivation

Often when writing Redux code with API requests,
there is a popular pattern for handling loading and error state.

```
GET_TODOS_REQUEST
GET_TODOS_SUCCESS
GET_TODOS_FAILURE
```

There are some very tedious parts to this:

-   Writing 3 or more action creators for every asyncronous action (thunk/saga)

```js
function getTodosRequest(id) {
    return {
        type: 'GET_TODOS_REQUEST',
        id,
    }
}
function getTodosSuccess(payload) {
    return {
        type: 'GET_TODOS_SUCCESS',
        payload,
    }
}
function getTodosFailure(error) {
    return {
        type: 'GET_TODOS_FAILURE',
        error,
    }
}
```

-   Adding type definitions for the actions, if using types

```ts
interface GetTodosRequestAction {
    type: 'GET_TODOS_REQUEST'
    id: string
}

interface GetTodosSuccessAction {
    type: 'GET_TODOS_SUCCESS'
    payload: Foo
}

interface GetTodosFailureAction {
    type: 'GET_TODOS_FAILURE'
    payload: string
}

export type TodoActions =
    | GetTodosSuccessAction
    | GetTodosFailureAction
    | GetTodosRequestAction
```

-   Writing a reducer for each

```js
function reducer(state, action) {
    switch (action.type) {
        case 'GET_TODOS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'GET_TODOS_SUCCESS':
            return {
                ...state,
                loading: false,
                todos: action.payload,
            }
        case 'GET_TODOS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error,
            }
    }
}
```

## Routines

Since our code follows a pattern, we can abstract it. Instead of writing all this code for a _single_ API call, let's create some helpers that create the actions for us.

`createRoutine()` returns an object that contains the 3 action creators needed as well as the ability to provide the `payload` (data being requested) type and `meta` (params required for request) type

```ts
import { createRoutine } from 'redux-routines-ts'

export const fetchTodos = createRoutine<Foo, { id: string }>('GET_TODOS')

fetchTodos.trigger({ id: '12345' })
// { type: 'FETCH_TODOS_TRIGGER', meta: { id: '12345' } }

fetchTodos.success(todos)
// { type: 'FETCH_TODOS_SUCCESS', payload: todos }

fetchTodos.failure(new Error('oops'))
// { type: 'FETCH_TODOS_FAILURE', error: new Error('oops')}
```
