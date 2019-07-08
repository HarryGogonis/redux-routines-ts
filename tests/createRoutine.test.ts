import { createRoutine, Routine } from "../src/createRoutine"
import { createReducer, Immutable } from "deox";

interface FooPayload {
    id: string;
    count: number;
}

interface FooParams {
    id: string
}

describe("#createRoutine", () => {
    let routine: Routine<FooPayload, FooParams>;

    beforeEach(() => {
        routine = createRoutine<FooPayload, FooParams>('FOO')
    })

    it("has a FOO_TRIGGER action", () => {
        const params: FooParams = {
            id: '5',
        }
        expect(routine.trigger(params)).toEqual({
            type: 'FOO_TRIGGER',
            meta: params
        })
    })

    it("has a FOO_SUCCESS action", () => {
        const params = { id: '5' }
        const payload: FooPayload = {
            id: '5',
            count: 0,
        }
        expect(routine.success(payload, params)).toEqual({
            type: 'FOO_SUCCESS',
            payload,
            meta: params
        })
    })

    it("has a FOO_FAILURE action", () => {
        const error = new Error('oops!')
        const params = { id: '5' }
        expect(routine.failure(error, params)).toEqual({
            type: 'FOO_FAILURE',
            payload: error,
            error: true,
            meta: params
        })
    })

    it("has a prefix string", () => {
        expect(routine.PREFIX).toEqual("FOO")
    })

    it("has a trigger string", () => {
        expect(routine.TRIGGER).toEqual("FOO_TRIGGER")
    })

    describe('no params', () => {
        const noParamsRoutine = createRoutine<FooPayload>('FOO')

        it("has a FOO_TRIGGER action", () => {
            expect(noParamsRoutine.trigger()).toEqual({
                type: 'FOO_TRIGGER',
            })
        })
    })

    describe('reducer', () => {
        const foo: FooPayload = {
            id: '5',
            count: 0,
        }
        const initialState = {} as Immutable<FooPayload>;
        it("supports createReducer", () => {
            const reducer = createReducer(initialState, handleAction => [
                handleAction(routine.success, (state, { payload, meta }) => {
                    return { ...state, [meta.id]: payload }
                })
            ])

            const state = reducer(initialState, routine.success(foo, { id: '5' }))
            expect(state).toEqual({ '5': { id: '5', count: 0 } })
        })
    })
})
