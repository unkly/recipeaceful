import { SES } from 'aws-sdk'
import { FromMailAddress } from 'const/notification'

type SendEmailProps = {
  content: string
  toAddresses: string
}

export class SESUtil {
  constructor(private readonly _sesClient: SES) {}

  public async sendEmail({ content, toAddresses }: SendEmailProps) {
    // TODO: SESの本番環境利用申請にWEBサイトが必須なのでmockでもよいのFEを実装したのち実装する
    // const params = {
    //   Destination: {
    //     ToAddresses: [toAddresses]
    //   },
    //   Message: {
    //     Body: {
    //       Text: {
    //         Data: content
    //       }
    //     },
    //     Subject: {
    //       Data: '初回メールアドレス認証',
    //       Charset: 'utf-8'
    //     }
    //   },
    //   Source: FromMailAddress
    // }
    // await this._sesClient.sendEmail(params).promise()
  }
}
