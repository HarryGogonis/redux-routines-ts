import { createActionCreator, getType, Action } from 'deox'

/**
 * Creates a set of life-cycle actions that are
 * useful for asynchronous actions like fetching data
 *
 * ```ts
 * const fetchFoo = createRoutine<Foo, { id: string }>('FETCH_FOO')
 * const fetchAll = createRoutine<Foo[]>('FETCH_ALL_FOO')
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
  /**
   * Trigger the start of a Routine
   * ```ts
   * dispatch(fetchFoo.trigger({ id: '5'}))
   * ```
   */
  trigger: ((params: Params) => Action<string, undefined, Params>) & {
    type: string
    toString(): string
  }

  /**
   * Signal the end of a Routine that was successful
   *
   * ```ts
   * dispatch(fetchFoo.success(foo))
   * ```
   */
  success: ((payload: Payload, params: Params) => Action<string, Payload, Params>) & {
    type: string
    toString(): string
  }

  /**
   * Signal the end of a Routine that failed
   *
   * ```ts
   * dispatch(fetchFoo.failure(error))
   * ```
   */
  failure: ((error: Error, params: Params) => Action<string, Error, Params>) & {
    type: string
    toString(): string
  }

  /**
   * The prefix the routine was created with
   */
  PREFIX: string

  /**
   * Type used by `trigger()`, subscribe to this in your Saga
   */
  TRIGGER: string
}

export type RoutineCreator = <Payload, Params = void>(prefix: string) => Routine<Payload, Params>
