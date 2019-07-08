import { errorReducer } from '../src/errorReducer'

describe('#errorReducer', () => {
    describe('TRIGGER', () => {
        const action = { type: 'FOO_TRIGGER' }
        const state = { FOO: new Error() }

        it('sets state.FOO to null', () => {
            const newState = errorReducer(state, action)
            expect(newState.FOO).toBeNull()
        })
    })

    describe('SUCCESS', () => {
        const state = {
            FOO: new Error(),
        }
        const action = { type: 'FOO_TRIGGER' }

        it('sets state.FOO to null', () => {
            const newState = errorReducer(state, action)
            expect(newState.FOO).toBeNull()
        })
    })

    describe('FAILURE', () => {
        const error = new Error()
        const action = { type: 'FOO_FAILURE', payload: error }

        it('sets state.FOO to error on FAILURE', () => {
            const newState: any = errorReducer(undefined, action)
            expect(newState.FOO).toBe(error)
        })
    })

    describe('Invalid Type', () => {
        const state = {
            FOO: true,
        }

        const action = { type: 'INVALID' }

        it('does not mutate state', () => {
            const newState = errorReducer(state, action)
            expect(newState).toBe(state)
        })
    })
})
