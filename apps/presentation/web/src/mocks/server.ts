'use client'
import { setupServer, SetupServer } from 'msw/node'
import { handlers } from './handler'

export const worker: SetupServer = setupServer(...handlers)
