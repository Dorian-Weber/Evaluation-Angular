export interface GameStats {
  date: Date,
  wordToFind: string,
  lettersFound: string[],
  errors: number,
  isWon: boolean
}
