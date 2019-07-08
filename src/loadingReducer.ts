import { AnyAction } from 'redux'
import { DeepImmutableObject } from 'deox'

import { TRIGGER_POSTFIX, SUCCESS_POSTFIX, FAILURE_POSTFIX } from './constants'

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
    action: AnyAction
) {
    const { type } = action
    const re = new RegExp(
        `(.*)_(${TRIGGER_POSTFIX}|${SUCCESS_POSTFIX}|${FAILURE_POSTFIX})`
    )
    const matches = re.exec(type)

    if (!matches) {
        return state
    }
    const [, requestType, requestState] = matches

    return {
        ...state,
        [requestType]: requestState === TRIGGER_POSTFIX,
    }
}
