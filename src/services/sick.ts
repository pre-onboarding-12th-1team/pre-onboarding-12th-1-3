import { AxiosPromise } from 'axios'
import { SickResponseData } from 'types/sick'
import instance from 'utils/axios'

export default {
  getSick(sick: string): AxiosPromise<SickResponseData> {
    return instance({
      method: 'GET',
      url: `/sick?q=${sick}`,
    })
  },
}
