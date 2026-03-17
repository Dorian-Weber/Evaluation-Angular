export interface GameHistory {
  date: Date,
  wordToFind: string,
  lettersFound: string[],
  errors: number,
  state: string
}
