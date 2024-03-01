export const DIFFICULTY_KEY = {
  VERY_EASY: 1,
  EASY: 2,
  NORMAL: 3,
  HARD: 4,
  VERY_HARD: 5
} as const

export const DIFFICULTY: Record<(typeof DIFFICULTY_KEY)[keyof typeof DIFFICULTY_KEY], string> = {
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
  0: '送信中',
  1: '送信成功',
  2: '送信失敗'
}

export const USER_STATUS_KEY = {
  PENDING: 0,
  ACTIVE: 1,
  REVOKED: 2
}

export const USER_STATUS: Record<(typeof USER_STATUS_KEY)[keyof typeof USER_STATUS_KEY], string> = {
  0: '仮登録',
  1: '登録済み',
  2: '削除済み'
}

export const AWS_REGION = 'ap-northeast-1'
