const CACHE_NAME = 'sicks'

export const setCache = async (request: RequestInfo | URL, response: Response) => {
  const cache = await caches.open(CACHE_NAME)
  await cache.put(request, response)
}

export const getCache = async (request: RequestInfo | URL) => {
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(request)
  return await response?.json()
}
