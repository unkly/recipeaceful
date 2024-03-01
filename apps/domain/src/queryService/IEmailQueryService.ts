import { ActionDivision } from 'valueObject/ActionDivision'

export interface IEmailQueryService {
  findContentFromActionDivision(actionDivision: ActionDivision): Promise<string>
}
