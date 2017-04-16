import process from 'process'

export default {
  async logAsyncErrors (func) {
    try {
      await func()
      process.exit(0)
    } catch (err) {
      if (err.response) {
        console.error(`Response: ${err.response.data}`)
      }
      console.error(err)
      process.exit(1)
    }
  }
}
