export const Regex = {
  ULID: /[0-9a-hjkmnp-zA-HJKMNP-Z]{26}/,
  MAIL_ADDRESS: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
  BASE_64: /^data:\w+\/[a-zA-Z_0-9-.]+;base64,/
}
