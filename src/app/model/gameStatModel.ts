export interface GameStatModel {
  date: Date,
  wordToFind: string,
  lettersFound: string[],
  errors: number,
  isWon: boolean
}
