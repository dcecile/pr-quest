import errors from './errors'
import politicians from './politicians'
import votes from './votes'
import promises from './promises'

errors.logAsyncErrors(async () => {
  await politicians.create()
  await votes.update()
  await promises.update()
})
