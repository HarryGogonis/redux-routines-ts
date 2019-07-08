# Redux-Routines-Ts

A helper for the REQUEST/SUCCESS/FAILURE action creator pattern found in Redux.

Utilizes [deox](https://github.com/thebrodmann/deox) to provide strong TypeScript inferences.

Helps reduce boilerplate when making asynchronous API calls in Sagas or Thunks.

## [API Reference](https://harrygogonis.github.io/redux-routines-ts/)
## [Full Example](https://codesandbox.io/s/typescript-redux-routines-c7nde)
---

### Example Usage
```ts
// saga.ts
function* fetchFooSaga({ meta }: ReturnType<typeof fetchFoo.trigger>) {
  const { id } = meta;

  try {
    const foo = yield call(api, id);
    yield put(fetchFoo.success(foo, meta));
  } catch (error) {
    yield put(fetchFoo.failure(error, meta));
  }
}

export function* fooSaga() {
  yield takeEvery(fetchFoo.TRIGGER, fetchFooSaga);
}

// Component.tsx
dispatch(fetchFoo.trigger({ id: '5' }))
```
### Inspired By
* https://github.com/afitiskin/redux-saga-routines
* https://github.com/svagi/redux-routines
* https://github.com/thebrodmann/deox
* https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6