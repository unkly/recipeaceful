import { PrimitiveValueObject } from '../seed'

/**
 * プロセス
 */
export class ProcessDetail extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    // 100文字以下
    if (value.length > 100) throw new Error(`invalid processDetail: ${value}`)
  }
}
