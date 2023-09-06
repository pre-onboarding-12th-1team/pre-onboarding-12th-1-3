import { all, debounce, put } from 'redux-saga/effects'
import sick from 'services/sick'

import { changeInput, setSick } from './sickSlice'

function* fetchData(action: ReturnType<typeof changeInput>) {
  try {
    const { data } = yield sick.getSick(action.payload)
    yield put(setSick(data))
  } catch (e) {
    console.error(e)
  }
}

function* watchChangeInput() {
  yield debounce(500, changeInput.type, fetchData)
}

export default function* rootSaga() {
  yield all([watchChangeInput()])
}
