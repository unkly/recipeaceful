import { format as Cformat } from 'date-fns/format'

export const Format = {
  YYYYMMDD_HYPHEN: 'yyyy-MM-dd',
  YMD_HMS: 'yyyy-MM-dd HH:mm:ss',
  ISO: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`
}

// 現在時刻取得
export const getCurrentDate = () => {
  return dateFormat(new Date(), Format.ISO)
}

// 日付フォーマット
export const dateFormat = (date: Date, format: (typeof Format)[keyof typeof Format] = Format.YMD_HMS) => {
  return Cformat(date, format)
}
