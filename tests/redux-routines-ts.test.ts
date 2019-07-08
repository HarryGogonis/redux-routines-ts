import { createRoutine, loadingReducer } from '../src/redux-routines-ts'

describe('redux-routines-ts', () => {
  it('exports createRoutine', () => {
    expect(createRoutine).toBeDefined()
  })

  it('exports loadingReducer', () => {
    expect(loadingReducer).toBeDefined()
  })
})
