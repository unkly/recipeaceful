export const DIFFICULTY: Record<number, string> = {
  1: 'めっちゃ簡単',
  2: '簡単',
  3: '普通',
  4: '難しい',
  5: 'めっちゃ難しい'
}

export const ACTION_DIVISION_KEY = {
  EMAIL_VARIFY: 1
} as const

export const ACTION_DIVISION: Record<(typeof ACTION_DIVISION_KEY)[keyof typeof ACTION_DIVISION_KEY], string> = {
  1: 'メール認証'
}

export const NOTIFICATION_STATUS_KEY = {
  PENDING: 0,
  SUCCEEDED: 1,
  FAILED: 2
}

export const NOTIFICATION_STATUS: Record<
  (typeof NOTIFICATION_STATUS_KEY)[keyof typeof NOTIFICATION_STATUS_KEY],
  string
> = {
  0: 'pending',
  1: 'succeeded',
  2: 'failed'
}
