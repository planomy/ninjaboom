export interface DiagnosticWord {
  word: string
  sentence: string
}

export interface SpellingDiagnosticProgress {
  testedWords: string[]
  misspeltWords: string[]
}

export type SpellingTestMode = 'diagnostic' | 'retest'

export const DIAGNOSTIC_BATCH_SIZE = 10

// A single, grade-free check of useful school words. The order moves broadly
// from familiar high-frequency words to words with trickier spelling patterns.
export const DIAGNOSTIC_WORDS: DiagnosticWord[] = [
  { word: 'also', sentence: 'We also packed fruit for lunch.' },
  { word: 'almost', sentence: 'The class was almost ready to begin.' },
  { word: 'always', sentence: 'I always check my work before submitting it.' },
  { word: 'although', sentence: 'Although it was raining, the game continued.' },
  { word: 'another', sentence: 'Please choose another book from the shelf.' },
  { word: 'answer', sentence: 'Write your answer in a complete sentence.' },
  { word: 'around', sentence: 'We walked around the oval at lunchtime.' },
  { word: 'because', sentence: 'I wore a jacket because the morning was cold.' },
  { word: 'become', sentence: 'A caterpillar will become a butterfly.' },
  { word: 'before', sentence: 'Wash your hands before you eat.' },
  { word: 'believe', sentence: 'I believe you can solve this problem.' },
  { word: 'below', sentence: 'Write your response in the space below.' },
  { word: 'between', sentence: 'The library is between the hall and the office.' },
  { word: 'brought', sentence: 'Mia brought her project to school.' },
  { word: 'caught', sentence: 'The goalkeeper caught the ball.' },
  { word: 'children', sentence: 'The children waited quietly for the bus.' },
  { word: 'could', sentence: 'We could finish the task after lunch.' },
  { word: 'country', sentence: 'Australia is a large island country.' },
  { word: 'decided', sentence: 'Our group decided to test the second idea.' },
  { word: 'describe', sentence: 'Describe what happened in the experiment.' },
  { word: 'different', sentence: 'Each group chose a different topic.' },
  { word: 'difficult', sentence: 'The final question was difficult but possible.' },
  { word: 'early', sentence: 'We arrived early for the excursion.' },
  { word: 'enough', sentence: 'There was enough paint for everyone.' },
  { word: 'every', sentence: 'Every student needs a pencil.' },
  { word: 'everyone', sentence: 'Everyone listened to the instructions.' },
  { word: 'example', sentence: 'Use an example to support your explanation.' },
  { word: 'exercise', sentence: 'Regular exercise helps keep your body healthy.' },
  { word: 'experience', sentence: 'The camp was an unforgettable experience.' },
  { word: 'favourite', sentence: 'Science is her favourite subject.' },
  { word: 'February', sentence: 'Our swimming carnival is held in February.' },
  { word: 'finally', sentence: 'We finally completed the group project.' },
  { word: 'forward', sentence: 'Take one step forward when your name is called.' },
  { word: 'friend', sentence: 'My friend helped me find the classroom.' },
  { word: 'grammar', sentence: 'Check the grammar in your final paragraph.' },
  { word: 'happened', sentence: 'Explain what happened at the end of the story.' },
  { word: 'heard', sentence: 'We heard thunder in the distance.' },
  { word: 'height', sentence: 'Measure the height of the plant each week.' },
  { word: 'history', sentence: 'We learned about local history.' },
  { word: 'imagine', sentence: 'Imagine living without electricity.' },
  { word: 'important', sentence: 'It is important to read the question carefully.' },
  { word: 'instead', sentence: 'We worked inside instead of going outdoors.' },
  { word: 'interest', sentence: 'Her interest in space began with a telescope.' },
  { word: 'knowledge', sentence: 'The quiz tested our knowledge of fractions.' },
  { word: 'language', sentence: 'Language can change over time.' },
  { word: 'length', sentence: 'Record the length in centimetres.' },
  { word: 'library', sentence: 'Return the novel to the library.' },
  { word: 'medicine', sentence: 'The nurse stored the medicine safely.' },
  { word: 'minute', sentence: 'You have one minute to finish.' },
  { word: 'natural', sentence: 'The cave is a natural formation.' },
  { word: 'necessary', sentence: 'Bring all the necessary equipment.' },
  { word: 'often', sentence: 'We often read quietly after lunch.' },
  { word: 'once', sentence: 'Check your answer once more.' },
  { word: 'opposite', sentence: 'The sports field is opposite the school gate.' },
  { word: 'ordinary', sentence: 'An ordinary day became an exciting adventure.' },
  { word: 'particular', sentence: 'Choose one particular feature to explain.' },
  { word: 'people', sentence: 'Many people attended the school concert.' },
  { word: 'perhaps', sentence: 'Perhaps we should try another method.' },
  { word: 'possible', sentence: 'Find every possible solution.' },
  { word: 'probably', sentence: 'It will probably rain this afternoon.' },
  { word: 'question', sentence: 'Read the whole question before answering.' },
  { word: 'quiet', sentence: 'The room became quiet when the bell rang.' },
  { word: 'quite', sentence: 'The puzzle was quite challenging.' },
  { word: 'really', sentence: 'I really enjoyed the performance.' },
  { word: 'receive', sentence: 'You will receive feedback on your draft.' },
  { word: 'remember', sentence: 'Remember to include your name.' },
  { word: 'right', sentence: 'Turn right at the end of the corridor.' },
  { word: 'said', sentence: 'The coach said the team had improved.' },
  { word: 'school', sentence: 'Our school planted a vegetable garden.' },
  { word: 'sentence', sentence: 'Begin each sentence with a capital letter.' },
  { word: 'separate', sentence: 'Keep the wet materials separate from the dry ones.' },
  { word: 'should', sentence: 'You should show your working.' },
  { word: 'something', sentence: 'Something moved behind the curtain.' },
  { word: 'sometimes', sentence: 'Sometimes a plan needs to change.' },
  { word: 'straight', sentence: 'Use a ruler to draw a straight line.' },
  { word: 'strange', sentence: 'A strange sound came from the cupboard.' },
  { word: 'surprise', sentence: 'The ending of the story was a surprise.' },
  { word: 'taught', sentence: 'Our teacher taught us a new strategy.' },
  { word: 'their', sentence: 'The students placed their bags near the wall.' },
  { word: 'there', sentence: 'Put the finished books over there.' },
  { word: 'though', sentence: 'The climb was tiring, though the view was worth it.' },
  { word: 'thought', sentence: 'I thought carefully before I answered.' },
  { word: 'through', sentence: 'Sunlight shone through the window.' },
  { word: 'together', sentence: 'The partners worked together on the model.' },
  { word: 'tomorrow', sentence: 'The assignment is due tomorrow.' },
  { word: 'trouble', sentence: 'Ask for help if you have trouble logging in.' },
  { word: 'truly', sentence: 'It was a truly remarkable performance.' },
  { word: 'until', sentence: 'Wait until the paint is completely dry.' },
  { word: 'usually', sentence: 'We usually meet in the science room.' },
  { word: 'various', sentence: 'The display included various types of rocks.' },
  { word: 'wanted', sentence: 'The class wanted to continue the investigation.' },
  { word: 'weather', sentence: 'The weather changed during the afternoon.' },
  { word: 'Wednesday', sentence: 'The next lesson will be on Wednesday.' },
  { word: 'were', sentence: 'The books were stacked on the desk.' },
  { word: 'where', sentence: 'Do you know where the meeting will be held?' },
  { word: 'whether', sentence: 'We discussed whether the rule was fair.' },
  { word: 'which', sentence: 'Which method produced the best result?' },
  { word: 'while', sentence: 'Read quietly while you wait.' },
  { word: 'whole', sentence: 'The whole class joined the discussion.' },
  { word: 'women', sentence: 'The museum celebrated women in science.' },
  { word: 'world', sentence: 'Maps help us understand the world.' },
  { word: 'would', sentence: 'What would you do differently next time?' },
  { word: 'writing', sentence: 'Plan your writing before you begin.' },
  { word: 'young', sentence: 'The young bird remained close to its nest.' },
  { word: 'beautiful', sentence: 'The artist created a beautiful mural.' },
  { word: 'business', sentence: 'The class designed a small business idea.' },
  { word: 'complete', sentence: 'Complete the final section independently.' },
  { word: 'continue', sentence: 'You may continue working after the break.' },
  { word: 'environment', sentence: 'Recycling can help protect the environment.' },
  { word: 'government', sentence: 'The government makes laws for the country.' },
  { word: 'immediately', sentence: 'Report the broken equipment immediately.' },
  { word: 'recommend', sentence: 'Which novel would you recommend to a friend?' },
  { word: 'beginning', sentence: 'The beginning introduces the main character.' },
  { word: 'calendar', sentence: 'Mark the due date on your calendar.' },
  { word: 'centre', sentence: 'Draw a dot in the centre of the circle.' },
  { word: 'colour', sentence: 'Choose a contrasting colour for the heading.' },
  { word: 'disappear', sentence: 'The puddles will disappear in the sunlight.' },
  { word: 'especially', sentence: 'The path was slippery, especially near the creek.' },
  { word: 'guarantee', sentence: 'Careful planning does not guarantee success.' },
  { word: 'occasion', sentence: 'The assembly marked a special occasion.' },
  { word: 'privilege', sentence: 'Representing the school was a privilege.' },
  { word: 'rhythm', sentence: 'Clap the rhythm before playing the music.' },
]

const STORAGE_KEY = 'ninjaboom-spelling-diagnostic-v1'

function normaliseWord(word: string): string {
  return word.trim().toLowerCase().replace(/[^a-z]/g, '')
}

function normaliseProgress(raw: Partial<SpellingDiagnosticProgress>): SpellingDiagnosticProgress {
  const validWords = new Set(DIAGNOSTIC_WORDS.map((item) => item.word.toLowerCase()))
  const clean = (words: string[] | undefined) =>
    [...new Set((words ?? []).map(normaliseWord).filter((word) => validWords.has(word)))]

  return {
    testedWords: clean(raw.testedWords),
    misspeltWords: clean(raw.misspeltWords),
  }
}

export function loadSpellingDiagnostic(): SpellingDiagnosticProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return normaliseProgress(JSON.parse(raw) as Partial<SpellingDiagnosticProgress>)
  } catch {
    // Storage may be unavailable in a private or restricted browser session.
  }
  return normaliseProgress({})
}

function saveSpellingDiagnostic(progress: SpellingDiagnosticProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normaliseProgress(progress)))
  } catch {
    // Keep the current session usable even if storage is unavailable.
  }
}

export function recordDiagnosticAnswer(word: string, isCorrect: boolean): SpellingDiagnosticProgress {
  const progress = loadSpellingDiagnostic()
  const cleanWord = normaliseWord(word)
  const testedWords = [...new Set([...progress.testedWords, cleanWord])]
  const misspeltWords = isCorrect
    ? progress.misspeltWords.filter((savedWord) => savedWord !== cleanWord)
    : [...new Set([...progress.misspeltWords, cleanWord])]
  const updated = normaliseProgress({ testedWords, misspeltWords })
  saveSpellingDiagnostic(updated)
  return updated
}

export function getNextDiagnosticWords(limit = DIAGNOSTIC_BATCH_SIZE): DiagnosticWord[] {
  const tested = new Set(loadSpellingDiagnostic().testedWords)
  return DIAGNOSTIC_WORDS.filter((item) => !tested.has(item.word.toLowerCase())).slice(0, limit)
}

export function getMisspeltDiagnosticWords(): DiagnosticWord[] {
  const misspelt = new Set(loadSpellingDiagnostic().misspeltWords)
  return DIAGNOSTIC_WORDS.filter((item) => misspelt.has(item.word.toLowerCase()))
}

export function pickMisspeltWords(limit = DIAGNOSTIC_BATCH_SIZE): string[] {
  const words = [...loadSpellingDiagnostic().misspeltWords]
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[words[i], words[j]] = [words[j], words[i]]
  }
  return words.slice(0, limit)
}

export function normaliseSpellingAnswer(answer: string): string {
  return normaliseWord(answer)
}
