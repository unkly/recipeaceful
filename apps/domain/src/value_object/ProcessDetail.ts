import { PrimitiveValueObject } from '../seed'

/**
 * プロセス
 */
export class ProcessDetail extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new ProcessDetail(prop)
  }

  get(): string {
    return this._value
  }

  static valid(prop: string) {
    // 100文字以下
    if (prop.length > 100) throw new Error(`invalid processDetail: ${prop}`)
  }
}
