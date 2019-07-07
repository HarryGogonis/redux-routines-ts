import { createActionCreator, getType, Action } from 'deox';

/**
 * Creates a set of saga lifecycle actions
 * Useful for async actions like fetching data
 *
 * inspired by https://github.com/afitiskin/redux-saga-routines
 */
export const createRoutine: RoutineCreator = <Payload, Params = void>(typePrefix: string) => {
    const trigger = createActionCreator(
        `${typePrefix}_TRIGGER`,
        resolve => (params: Params) => resolve(params)
    );
    const success = createActionCreator(`${typePrefix}_SUCCESS`, resolve => (payload: Payload) =>
        resolve(payload)
    );
    const failure = createActionCreator(`${typePrefix}_FAILURE`, resolve => (error: Error) => resolve(error));
    return {
        trigger,
        success,
        failure,
        PREFIX: typePrefix,
        TRIGGER: getType(trigger),
    };
};


export interface Routine<Payload, Params = void> {
    trigger(params: Params): Action<string, Params>,
    success(payload: Payload): Action<string, Payload>,
    failure(error: Error): Action<string, Error>,
    PREFIX: string,
    TRIGGER: string,
}

export type RoutineCreator = <Payload, Params = void>(prefix: string) => Routine<Payload, Params>