import { AxiosResponse } from 'axios'

const CACHE_NAME = 'sicks'

// 캐시타임 기본 20초
const EXPIRE_TIME = 200000

export const setCache = async (
  request: RequestInfo | URL,
  axiosResponse: AxiosResponse,
  expireTime = EXPIRE_TIME,
) => {
  const expireDate = new Date().getTime() + expireTime
  const response = new Response(JSON.stringify(axiosResponse.data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'EXPIRE-DATE': `${expireDate}`,
    },
  })

  const cache = await caches.open(CACHE_NAME)
  await cache.put(request, response)
}

export const getCache = async (request: RequestInfo | URL) => {
  const nowTime = new Date().getTime()
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(request)

  if (!response) return

  const dueTime = Number(response.headers.get('EXPIRE-DATE'))

  if (dueTime - nowTime < 0) {
    await cache.delete(request)
    console.log('cache deleted')
    return
  }

  return await response.json()
}
