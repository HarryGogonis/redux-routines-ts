import { AnyAction } from 'redux'
import { DeepImmutableObject } from 'deox'

import { matchPostfix } from './lib/matchPostfix'

/**
 * Listens to all actions on the store
 * and stores error state for every routine
 *
 * ```ts
 * // store.ts
 * import { errorReducer } from 'redux-routines-ts'
 *
 * const rootReducer = combineReducers({
 *   // your other reducers...
 *   error: errorReducer,
 * });
 *
 * const store = createStore(rootReducer, middleware)
 * ```
 */
export function errorReducer<T>(
    state: DeepImmutableObject<T> = {} as DeepImmutableObject<T>,
    { type, payload }: AnyAction
) {
    const matches = matchPostfix(type)

    if (!matches) {
        return state
    }
    const [requestType, requestState] = matches

    return {
        ...state,
        [requestType]: requestState === 'FAILURE' ? (payload as Error) : null,
    }
}
