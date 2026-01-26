const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg'
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path) => getImageUrl(path, 'original')
export const getPosterUrl = (path) => getImageUrl(path, 'w500')
export const getThumbnailUrl = (path) => getImageUrl(path, 'w200')
