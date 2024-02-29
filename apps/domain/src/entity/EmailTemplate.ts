import { Entity } from '../seed'
import { ActionDivision } from 'valueObject/ActionDivision'
import { Ulid } from 'valueObject/Ulid'

type Props = {
  templateId: Ulid
  actionDivision: ActionDivision
  content: string
}

export class EmailTemplate extends Entity {
  private constructor(private readonly _props: Props) {
    super()
  }

  public static create(props: Props) {
    this.validate(props)
    return new EmailTemplate(props)
  }

  public static validate(props: Props) {}

  get templateId() {
    return this._props.templateId
  }

  get actionDivision() {
    return this._props.actionDivision
  }

  get content() {
    return this._props.content
  }
}
