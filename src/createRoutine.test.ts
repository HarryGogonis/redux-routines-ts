import { createRoutine, Routine } from "./createRoutine"

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
            payload: params
        })
    })

    it("has a FOO_SUCCESS action", () => {
        const payload: FooPayload = {
            id: '5',
            count: 0,
        }
        expect(routine.success(payload)).toEqual({
            type: 'FOO_SUCCESS',
            payload
        })
    })

    it("has a FOO_FAILURE action", () => {
        const error = new Error('oops!')
        expect(routine.failure(error)).toEqual({
            type: 'FOO_FAILURE',
            payload: error,
            error: true,
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
})
