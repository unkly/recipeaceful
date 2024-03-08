import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  documents: 'src/graphql/queries.ts',
  schema: '../api/schema/schema.graphql',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
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
    },
    'src/graphql/generated/mock.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-msw']
    }
  }
}

export default config
