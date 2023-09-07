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
      console.log('api called!')
      if (response.config.url) {
        setCache(response.config.url, response)
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
  yield debounce(1000, changeInput.type, fetchData)
}

export default function* rootSaga() {
  yield all([watchChangeInput()])
}
