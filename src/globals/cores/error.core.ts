import HTTP_STATUS from '../constants/http.constant'

export abstract class CustomError extends Error {
  abstract status: string
  abstract statusCode: number

  constructor(message: string) {
    super(message)
  }
}

export class BadRequestException extends CustomError {
  status = 'error'
  statusCode = HTTP_STATUS.BAD_REQUEST

  constructor(message: string) {
    super(message)
  }
}

export class NotFoundException extends CustomError {
  status = 'error'
  statusCode = HTTP_STATUS.NOT_FOUND

  constructor(message: string) {
    super(message)
  }
}

export class UnauthorizedException extends CustomError {
  status = 'error'
  statusCode = HTTP_STATUS.UNAUTHORIZED

  constructor(message: string) {
    super(message)
  }
}

export class ForbiddenException extends CustomError {
  status = 'error'
  statusCode = HTTP_STATUS.FORBIDDEN

  constructor(message: string) {
    super(message)
  }
}

export class InternalServerError extends CustomError {
  status = 'error'
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR

  constructor(message: string = 'Internal server error') {
    super(message)
  }
}
