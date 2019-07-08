import { AnyAction } from 'redux'
import { DeepImmutableObject } from 'deox'

import { TRIGGER_POSTFIX } from './lib/constants'
import { matchPostfix } from './lib/matchPostfix'

/**
 * Listens to all actions on the store
 * and stores loading state for every routine
 *
 * ```ts
 * // store.ts
 * import { loadingReducer } from 'redux-routines-ts'
 *
 * const rootReducer = combineReducers({
 *   // your other reducers...
 *   loading: loadingReducer,
 * });
 *
 * const store = createStore(rootReducer, middleware)
 * ```
 */
export function loadingReducer<T>(
    state: DeepImmutableObject<T> = {} as DeepImmutableObject<T>,
    { type }: AnyAction
) {
    const matches = matchPostfix(type)

    if (!matches) {
        return state
    }
    const [requestType, requestState] = matches

    return {
        ...state,
        [requestType]: requestState === TRIGGER_POSTFIX,
    }
}
