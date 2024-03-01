import { ValidationError } from 'class-validator'

export class CallbackError {
  constructor(errorMessages: string, errorType: 'ERROR' | 'WARNING' | 'INFO') {
    return {
      errorMessages,
      errorType
    }
  }
}

export class ValidateError {
  private readonly errors: ValidationError[]

  constructor(errors: ValidationError[]) {
    this.errors = errors
  }

  private contexts() {
    return this.errors.flatMap((error) => {
      const message = Object.values(error.contexts?.isNotEmpty || {}).join('')
      return {
        property: error.property,
        message: message
      }
    })
  }

  text() {
    return this.contexts()
      .map((error) => `${error.property}: ${error.message}`)
      .join('\n')
  }
}
