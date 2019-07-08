import { TRIGGER_POSTFIX, SUCCESS_POSTFIX, FAILURE_POSTFIX } from './constants'

export const matchPostfix = (type: string): [string, string] | null => {
    const re = new RegExp(
        `(.*)_(${TRIGGER_POSTFIX}|${SUCCESS_POSTFIX}|${FAILURE_POSTFIX})`
    )
    const matches = re.exec(type)

    if (!matches) {
        return null
    }
    const [, requestType, requestState] = matches
    return [requestType, requestState]
}
