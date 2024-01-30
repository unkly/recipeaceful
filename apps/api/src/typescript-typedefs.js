'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.plugin = void 0
const utils_1 = require('@graphql-tools/utils')
const graphql_1 = require('graphql')
const print = (schema) => `
  export const typeDefs = \`${schema}\`;
`
const plugin = (schema) =>
  print(
    (0, graphql_1.stripIgnoredCharacters)(
      (0, utils_1.printSchemaWithDirectives)(schema)
    )
  )
exports.plugin = plugin
