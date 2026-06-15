import type { DropSpeed, FallingLetter } from './types'
import { getFallSpeedMultiplier } from './dropSpeed'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
export const MAX_FALLING_LETTERS = 14
export const SPAWN_INTERVAL_MS = 650

export function parseWordList(input: string): string[] {
  return input
    .split(',')
    .map((w) => w.trim().toLowerCase().replace(/[^a-z]/g, ''))
    .filter((w) => w.length > 0)
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickSpawnChar(word: string, nextIndex: number): string {
  const next = word[nextIndex]
  if (!next) return ALPHABET[Math.floor(Math.random() * 26)]

  const roll = Math.random()
  if (roll < 0.5) return next
  if (roll < 0.55) {
    const otherWordLetters = [...new Set(word.split(''))].filter((c) => c !== next)
    if (otherWordLetters.length > 0) {
      return otherWordLetters[Math.floor(Math.random() * otherWordLetters.length)]
    }
  }

  let decoy = ALPHABET[Math.floor(Math.random() * 26)]
  let attempts = 0
  while (decoy === next && attempts < 4) {
    decoy = ALPHABET[Math.floor(Math.random() * 26)]
    attempts++
  }
  return decoy
}

export function createSpawnedLetter(
  word: string,
  nextLetterIndex: number,
  containerWidth: number,
  dropSpeed: DropSpeed = 'normal',
): FallingLetter {
  const char = pickSpawnChar(word, nextLetterIndex)
  const padding = 56
  const usable = Math.max(containerWidth - padding * 2, 200)
  const speedMul = getFallSpeedMultiplier(dropSpeed)

  return {
    id: `${char}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    char,
    x: padding + Math.random() * usable,
    y: -60 - Math.random() * 120,
    speed: (0.45 + Math.random() * 0.55) * speedMul,
    rotation: (Math.random() - 0.5) * 30,
    wobble: Math.random() * Math.PI * 2,
  }
}

export function createInitialBurst(
  word: string,
  nextLetterIndex: number,
  containerWidth: number,
  dropSpeed: DropSpeed = 'normal',
  count = 5,
): FallingLetter[] {
  return Array.from({ length: count }, (_, i) => {
    const letter = createSpawnedLetter(word, nextLetterIndex, containerWidth, dropSpeed)
    return { ...letter, y: -60 - i * 90 - Math.random() * 40 }
  })
}

export function calculateWordScore(elapsedMs: number, wordLength: number): number {
  const seconds = elapsedMs / 1000
  const base = wordLength * 100
  const timeBonus = Math.max(50, Math.round(600 - seconds * 45))
  return base + timeBonus
}

export function getSpeedLabel(elapsedMs: number): string {
  const seconds = elapsedMs / 1000
  if (seconds < 4) return 'Lightning!'
  if (seconds < 7) return 'Super fast!'
  if (seconds < 11) return 'Nice work!'
  return 'Keep practising!'
}

export function countTotalLetters(words: string[]): number {
  return words.reduce((sum, w) => sum + w.length, 0)
}

type SoundType = 'tap' | 'swipe' | 'complete' | 'mode'

const SOUND_STORAGE_KEY = 'ninjaboom-sound'

const SWIPE_FILES = ['hwo1.mp3', 'hwi1.mp3'] as const
const COMPLETE_FILES = ['hoowar.mp3', 'hoooowar.mp3'] as const

const soundCache = new Map<string, HTMLAudioElement>()
type SoundListener = () => void
const soundListeners = new Set<SoundListener>()

let swipeAlt = 0
let completeAlt = 0

function loadSoundEnabled(): boolean {
  try {
    const raw = localStorage.getItem(SOUND_STORAGE_KEY)
    if (raw === null) return true
    return raw === 'true'
  } catch {
    return true
  }
}

let soundEnabled = loadSoundEnabled()

export function isSoundEnabled(): boolean {
  return soundEnabled
}

export function setSoundEnabled(enabled: boolean) {
  if (soundEnabled === enabled) return
  soundEnabled = enabled
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled))
  } catch {
    // Storage not available
  }
  soundListeners.forEach((listener) => listener())
}

export function toggleSoundEnabled() {
  setSoundEnabled(!soundEnabled)
}

export function subscribeSound(listener: SoundListener): () => void {
  soundListeners.add(listener)
  return () => soundListeners.delete(listener)
}

function soundFileFor(type: SoundType): string {
  switch (type) {
    case 'tap':
      return 'hiya.mp3'
    case 'swipe': {
      const file = SWIPE_FILES[swipeAlt % SWIPE_FILES.length]
      swipeAlt += 1
      return file
    }
    case 'complete': {
      const file = COMPLETE_FILES[completeAlt % COMPLETE_FILES.length]
      completeAlt += 1
      return file
    }
    case 'mode':
      return 'ninjaboom.mp3'
  }
}

function getSoundClip(file: string): HTMLAudioElement {
  let clip = soundCache.get(file)
  if (!clip) {
    clip = new Audio(`${import.meta.env.BASE_URL}sounds/${file}`)
    soundCache.set(file, clip)
  }
  return clip
}

export function playSound(type: SoundType) {
  if (!soundEnabled) return
  try {
    const file = soundFileFor(type)
    const clip = getSoundClip(file).cloneNode() as HTMLAudioElement
    clip.volume = type === 'mode' ? 0.7 : 0.75
    void clip.play()
  } catch {
    // Audio not available
  }
}
