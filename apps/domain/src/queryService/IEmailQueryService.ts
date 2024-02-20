import { ActionDivision } from 'value_object/ActionDivision'

export interface IEmailQueryService {
  findContentFromActionDivision(actionDivision: ActionDivision): Promise<string>
}
