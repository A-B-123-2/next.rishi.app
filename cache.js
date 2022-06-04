export const foreverEdge = {
  browser: false,
  edge: {
    staleWhileRevalidateSeconds: 1,
    maxAgeSeconds: 60 * 60 * 60 * 365,
  },
}

export const assetCache = {
  edge: {
    maxAgeSeconds: 60 * 60 * 60 * 365,
    forcePrivateCaching: true,
  },
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24,
  },
}

export const nextCache = (swrSeconds = 0) => ({
  browser: false,
  edge: {
    maxAgeSeconds: 60,
    staleWhileRevalidateSeconds: swrSeconds,
  },
})
