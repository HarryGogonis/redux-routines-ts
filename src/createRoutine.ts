import { createActionCreator, getType, Action } from 'deox'

/**
 * Creates a set of life-cycle actions that are
 * useful for asynchronous actions like fetching data
 *
 * Creating a Routine
 * ```ts
 * // actions.ts
 * const fetchFoo = createRoutine<Foo, { id: string }>('FETCH_FOO')
 * ```
 *
 * ```ts
 * dispatch(fetchFoo.trigger({ id: '5'}))
 * // { type: 'FETCH_FOO_TRIGGER', payload: { id: '5' }}
 * ```
 *
 * ```ts
 * const foo: Foo = { count: 1 }
 * dispatch(fetchFoo.success(foo))
 * // { type: 'FETCH_FOO_SUCCESS', payload: { count: 1 } }
 * ```
 *
 * ```ts
 * const error = new Error()
 * dispatch(fetchFoo.failure(error))
 * // { type: 'FETCH_FOO_FAILURE', payload: error }
 * ```
 */
export const createRoutine: RoutineCreator = <Payload, Params>(typePrefix: string) => {
  const trigger = createActionCreator(`${typePrefix}_TRIGGER`, resolve => (params: Params) =>
    resolve(undefined, params)
  )
  const success = createActionCreator(
    `${typePrefix}_SUCCESS`,
    resolve => (payload: Payload, params: Params) => resolve(payload, params)
  )
  const failure = createActionCreator(
    `${typePrefix}_FAILURE`,
    resolve => (error: Error, params: Params) => resolve(error, params)
  )
  return {
    trigger,
    success,
    failure,
    PREFIX: typePrefix,
    TRIGGER: getType(trigger)
  }
}

export interface Routine<Payload, Params> {
  trigger: ((params: Params) => Action<string, undefined, Params>) & {
    type: string
    toString(): string
  }
  success: ((payload: Payload, params: Params) => Action<string, Payload, Params>) & {
    type: string
    toString(): string
  }
  failure: ((error: Error, params: Params) => Action<string, Error, Params>) & {
    type: string
    toString(): string
  }
  PREFIX: string
  TRIGGER: string
}

export type RoutineCreator = <Payload, Params = void>(prefix: string) => Routine<Payload, Params>
