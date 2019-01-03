export const getAudio = (url = '') => (
  new Promise((resolve, reject) => {
    const audio = new Audio()

    audio.addEventListener('canplay', () => resolve(audio))

    audio.onerror = reject

    audio.src = url

    audio.preload = 'auto'

    audio.load()
  })
)
