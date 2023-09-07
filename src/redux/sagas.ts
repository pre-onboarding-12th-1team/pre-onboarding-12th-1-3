import { AxiosResponse } from 'axios'
import { all, debounce, put } from 'redux-saga/effects'
import sick from 'services/sick'
import { SickResponseData } from 'types/sick'
import { getCache, setCache } from 'utils/cache'

import { changeInput, setSick } from './sickSlice'

function* fetchData(action: ReturnType<typeof changeInput>) {
  try {
    const cachedData: SickResponseData | undefined = yield getCache(
      `/sick?q=${action.payload}`,
    )
    if (!cachedData) {
      const response: AxiosResponse<SickResponseData> = yield sick.getSick(action.payload)
      if (response.config.url) {
        const myResponse = new Response(JSON.stringify(response.data), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        setCache(response.config.url, myResponse)
      }
      yield put(setSick(response.data))
    } else {
      yield put(setSick(cachedData))
    }
  } catch (e) {
    console.error(e)
  }
}

function* watchChangeInput() {
  yield debounce(100, changeInput.type, fetchData)
}

export default function* rootSaga() {
  yield all([watchChangeInput()])
}
