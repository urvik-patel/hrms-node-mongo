'use strict'

module.exports = {
  RESPONSE_CODE: {
    SUCCESS: 200,
    SUCCESS_NEW_RESOURCE: 201,
    SUCCESS_WITHOUT_RESPONSE: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    INTERNAL_SERVER: 500
  },
  NODE_ENVIRONMENT: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    STAGING: 'staging'
  },
  SUCCESS: 1,
  FAIL: 0
}
