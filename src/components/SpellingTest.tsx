import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GameLogo from './GameLogo'
import {
  DIAGNOSTIC_BATCH_SIZE,
  DIAGNOSTIC_WORDS,
  getNextDiagnosticWords,
  loadSpellingDiagnostic,
  normaliseSpellingAnswer,
  recordDiagnosticAnswer,
  type DiagnosticWord,
} from '../spellingDiagnostic'
import './SpellingTest.css'

interface Props {
  onBack: () => void
}

interface TestResult {
  word: string
  answer: string
  isCorrect: boolean
}

type TestPhase = 'testing' | 'results' | 'complete'

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const message = new SpeechSynthesisUtterance(text)
  message.lang = 'en-AU'
  message.rate = 0.78
  message.pitch = 1
  const australianVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase() === 'en-au')
  if (australianVoice) message.voice = australianVoice
  window.speechSynthesis.speak(message)
}

function wordPrompt(item: DiagnosticWord) {
  speak(`${item.word}. ${item.sentence} ${item.word}.`)
}

export default function SpellingTest({ onBack }: Props) {
  const initialWords = useMemo(() => getNextDiagnosticWords(), [])
  const [words, setWords] = useState(initialWords)
  const [phase, setPhase] = useState<TestPhase>(initialWords.length > 0 ? 'testing' : 'complete')
  const [wordIndex, setWordIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [results, setResults] = useState<TestResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const currentWord = words[wordIndex]
  const progress = loadSpellingDiagnostic()
  const testedBeforeBatch = Math.max(0, progress.testedWords.length - results.length)
  const checkedCount = phase === 'testing'
    ? Math.min(DIAGNOSTIC_WORDS.length, testedBeforeBatch + wordIndex)
    : progress.testedWords.length
  const progressPercent = Math.round((checkedCount / DIAGNOSTIC_WORDS.length) * 100)
  const correctCount = results.filter((result) => result.isCorrect).length
  const missedResults = results.filter((result) => !result.isCorrect)
  const remainingCount = Math.max(0, DIAGNOSTIC_WORDS.length - progress.testedWords.length)

  useEffect(() => {
    if (phase !== 'testing' || !currentWord) return
    inputRef.current?.focus()
    const timer = window.setTimeout(() => wordPrompt(currentWord), 260)
    return () => window.clearTimeout(timer)
  }, [currentWord, phase])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function submitAnswer(event: React.FormEvent) {
    event.preventDefault()
    if (!currentWord) return
    const cleanAnswer = normaliseSpellingAnswer(answer)
    if (!cleanAnswer) return

    const isCorrect = cleanAnswer === currentWord.word.toLowerCase()
    const nextResults = [
      ...results,
      { word: currentWord.word, answer: cleanAnswer, isCorrect },
    ]
    recordDiagnosticAnswer(currentWord.word, isCorrect)
    setResults(nextResults)
    setAnswer('')

    if (wordIndex >= words.length - 1) {
      window.speechSynthesis?.cancel()
      setPhase('results')
    } else {
      setWordIndex((index) => index + 1)
    }
  }

  function startNextBatch() {
    const nextWords = getNextDiagnosticWords()
    if (nextWords.length === 0) {
      setPhase('complete')
      return
    }
    setWords(nextWords)
    setResults([])
    setWordIndex(0)
    setAnswer('')
    setPhase('testing')
  }

  return (
    <div className="spelling-test">
      <header className="spelling-test__header">
        <button type="button" className="spelling-test__back" onClick={onBack}>
          ← Games
        </button>
        <GameLogo size="sm" />
        <span className="spelling-test__saved">
          {progress.misspeltWords.length} list {progress.misspeltWords.length === 1 ? 'word' : 'words'}
        </span>
      </header>

      <div className="spelling-test__progress" aria-label={`${checkedCount} of ${DIAGNOSTIC_WORDS.length} words checked`}>
        <div className="spelling-test__progress-copy">
          <span>Word check progress</span>
          <strong>{checkedCount}/{DIAGNOSTIC_WORDS.length}</strong>
        </div>
        <div className="spelling-test__progress-track">
          <motion.div
            className="spelling-test__progress-fill"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      {phase === 'testing' && currentWord && (
        <motion.main
          key={`${currentWord.word}-${wordIndex}`}
          className="spelling-test__card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="spelling-test__eyebrow">SPELLING TEST MODE</div>
          <h1>Word {wordIndex + 1} of {words.length}</h1>
          <p className="spelling-test__instruction">Listen, then type the word. It will not appear on screen.</p>

          <div className="spelling-test__listen-row">
            <button
              type="button"
              className="spelling-test__listen spelling-test__listen--primary"
              onClick={() => wordPrompt(currentWord)}
            >
              <span className="spelling-test__speaker" aria-hidden="true">◖))</span>
              Hear word
            </button>
            <button
              type="button"
              className="spelling-test__listen"
              onClick={() => speak(currentWord.sentence)}
            >
              Hear sentence
            </button>
          </div>

          <form className="spelling-test__form" onSubmit={submitAnswer}>
            <label htmlFor="spelling-answer">Type the spelling</label>
            <input
              ref={inputRef}
              id="spelling-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="text"
              placeholder="Type here…"
              aria-describedby="spelling-test-help"
            />
            <span id="spelling-test-help" className="spelling-test__help">
              Answers are checked when you press Enter or tap Submit.
            </span>
            <motion.button
              type="submit"
              className="spelling-test__submit"
              disabled={!normaliseSpellingAnswer(answer)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SUBMIT
            </motion.button>
          </form>
        </motion.main>
      )}

      {phase === 'results' && (
        <motion.main
          className="spelling-test__card spelling-test__results"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="spelling-test__eyebrow">BATCH COMPLETE</div>
          <div className="spelling-test__score">{correctCount}/{results.length}</div>
          <h1>{missedResults.length === 0 ? 'Perfect ninja work!' : 'Your list words are saved'}</h1>
          <p className="spelling-test__instruction">
            {missedResults.length === 0
              ? 'You nailed every word in this set.'
              : `${missedResults.length} ${missedResults.length === 1 ? 'word has' : 'words have'} been added to My Misspelt Words.`}
          </p>

          {missedResults.length > 0 && (
            <div className="spelling-test__missed-list">
              {missedResults.map((result) => (
                <div key={result.word} className="spelling-test__missed-item">
                  <span>{result.answer}</span>
                  <span aria-hidden="true">→</span>
                  <strong>{result.word}</strong>
                </div>
              ))}
            </div>
          )}

          <div className="spelling-test__result-actions">
            <button type="button" className="spelling-test__secondary" onClick={onBack}>
              Make a game
            </button>
            {remainingCount > 0 && (
              <button type="button" className="spelling-test__submit" onClick={startNextBatch}>
                Next {Math.min(DIAGNOSTIC_BATCH_SIZE, remainingCount)} words
              </button>
            )}
          </div>
        </motion.main>
      )}

      {phase === 'complete' && (
        <motion.main
          className="spelling-test__card spelling-test__results"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="spelling-test__eyebrow">WORD CHECK COMPLETE</div>
          <div className="spelling-test__complete-mark" aria-hidden="true">✓</div>
          <h1>You checked every word!</h1>
          <p className="spelling-test__instruction">
            You now have {progress.misspeltWords.length} personalised list {progress.misspeltWords.length === 1 ? 'word' : 'words'} ready for Ninja Boom games.
          </p>
          <button type="button" className="spelling-test__submit" onClick={onBack}>
            Make a game
          </button>
        </motion.main>
      )}
    </div>
  )
}
