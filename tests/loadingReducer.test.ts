import { loadingReducer } from '../src/loadingReducer'

describe('#loadingReducer', () => {
    describe('TRIGGER', () => {
        const action = { type: 'FOO_TRIGGER' }

        it('sets state.FOO to true', () => {
            const newState: any = loadingReducer(undefined, action)
            expect(newState.FOO).toEqual(true)
        })
    })

    describe("SUCCESS", () => {
        const state = {
            FOO: true
        }
        const action = { type: 'FOO_TRIGGER' }

        it('sets state.FOO to true', () => {
            const newState = loadingReducer(state, action)
            expect(newState.FOO).toEqual(true)
        })
    })

    describe("FAILURE", () => {
        const state = {
            FOO: true
        }
        const action = { type: 'FOO_FAILURE' }

        it('sets state.FOO to false on FAILURE', () => {
            const newState = loadingReducer(state, action)
            expect(newState.FOO).toEqual(false)
        })
    })

    describe("Invalid Type", () => {
        const state = {
            FOO: true
        }

        const action = { type: 'INVALID' }

        it('does not mutate state', () => {
            const newState = loadingReducer(state, action)
            expect(newState).toBe(state)
        })
    })
})