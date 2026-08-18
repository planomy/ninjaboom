import { useState } from 'react'
import TeacherSetup from './components/TeacherSetup'
import GameScreen from './components/GameScreen'
import MathGameScreen from './components/MathGameScreen'
import SpellingTest from './components/SpellingTest'
import type { GameSettings } from './types'
import type { SpellingTestMode } from './spellingDiagnostic'
import './App.css'

type Screen = 'setup' | 'spell-game' | 'math-game' | 'spelling-test'

export default function App() {
  const [screen, setScreen] = useState<Screen>('setup')
  const [words, setWords] = useState<string[]>([])
  const [spellingTestMode, setSpellingTestMode] = useState<SpellingTestMode>('diagnostic')
  const [settings, setSettings] = useState<GameSettings>({
    mode: 'spell',
    previewSeconds: 2,
    dropSpeed: 'normal',
  })

  function handleStart(wordList: string[], gameSettings: GameSettings) {
    setSettings(gameSettings)
    if (gameSettings.mode === 'math') {
      setScreen('math-game')
    } else {
      setWords(wordList)
      setScreen('spell-game')
    }
  }

  function handleBack() {
    setScreen('setup')
  }

  function handleStartSpellingTest(mode: SpellingTestMode) {
    setSpellingTestMode(mode)
    setScreen('spelling-test')
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        {screen === 'setup' && (
          <TeacherSetup
            onStart={handleStart}
            onStartSpellingTest={handleStartSpellingTest}
            initialSettings={settings}
          />
        )}
        {screen === 'spelling-test' && (
          <SpellingTest mode={spellingTestMode} onBack={handleBack} />
        )}
        {screen === 'spell-game' && settings.mode === 'spell' && (
          <GameScreen words={words} settings={settings} onBack={handleBack} />
        )}
        {screen === 'math-game' && settings.mode === 'math' && (
          <MathGameScreen settings={settings} onBack={handleBack} />
        )}
      </div>
    </div>
  )
}
