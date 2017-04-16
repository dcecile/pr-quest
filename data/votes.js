import cache from './cache'
import base from './base'
import open from './open'

const getData = async () => {
  return await cache.get('votes2014', async () => {
    const results = await open.getPagedData(
      '/votes/ballots/',
      { vote: '/votes/41-2/291/' })
    console.log(`Downloaded votes for ${results.length} politicians`)
    return results
  })
}

const convertToRecord = data => {
  return {
    'Vote in 2014': data.ballot,
    'openparliament.ca': open.getHumanURL(data.politician_url)
  }
}

export default {
  async update () {
    const data = await getData()
    await base.patch(
      data.map(convertToRecord),
      'openparliament.ca')
  }
}
