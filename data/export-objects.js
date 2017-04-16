import errors from './errors'
import base from './base'

errors.logAsyncErrors(async () => {
  await base.exportObjects()
})
