if (process.env.USE_MOCK) {
  if (typeof window !== 'undefined') {
    void (async () => {
      const { worker } = await import('@/mocks/server')
      await worker.listen()
    })
  }
}
