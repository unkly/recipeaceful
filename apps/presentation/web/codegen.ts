import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../api/src/schema/schema.graphql',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false
        },
        scalars: {
          Date: 'DateString'
        },
        enumsAsTypes: true
      }
    }
  }
}

export default config
