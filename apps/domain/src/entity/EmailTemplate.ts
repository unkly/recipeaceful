import { Entity } from '../seed'
import { ActionDivision } from '../valueObject/ActionDivision'
import { TemplateId } from '../valueObject/Ulid'

type Props = {
  templateId: TemplateId
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

  public static validate(_props: Props) {}

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
