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
    resolve(params)
  )
  const success = createActionCreator(`${typePrefix}_SUCCESS`, resolve => (payload: Payload) =>
    resolve(payload)
  )
  const failure = createActionCreator(`${typePrefix}_FAILURE`, resolve => (error: Error) =>
    resolve(error)
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
  trigger: (params: Params) => Action<string, Params>
  success(payload: Payload): Action<string, Payload>
  failure(error: Error): Action<string, Error>
  PREFIX: string
  TRIGGER: string
}

export type RoutineCreator = <Payload, Params = void>(prefix: string) => Routine<Payload, Params>
