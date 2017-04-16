import cache from './cache'
import base from './base'
import open from './open'

const getLinks = async () => {
  return await cache.get('politician-links', async () => {
    const results = await open.getPagedData('/politicians/')
    console.log(`Downloaded links for ${results.length} politicians`)
    return results
  })
}

const getData = async () => {
  return await cache.get('politicians', async () => {
    const results = []
    for (const link of await getLinks()) {
      results.push(await open.getData(link.url))
      console.log(`Downloaded data for ${results.length} politicians`)
    }
    return results
  })
}

const convertToRecord = data => {
  const getLink = name => {
    const link = data.links.find(link => link.note === name)
    return link ? link.url : undefined
  }
  const getOtherInfo = key => {
    const value = data.other_info[key]
    return value ? value[0] : undefined
  }

  const membership = data.memberships[0]

  const image = data.image
  const twitter = getOtherInfo('twitter')

  const createAttachment = url => [ { url } ]

  return {
    'Name': data.name,
    'Party': membership.party.short_name.en,
    'Riding': membership.riding.name.en,
    'Photo': image ? createAttachment(open.getHumanURL(data.image)) : undefined,
    'Email': data.email,
    'Twitter': twitter ? `https://twitter.com/${twitter}` : undefined,
    'Homepage': getLink('Official site'),
    'openparliament.ca': open.getHumanURL(data.url)
  }
}

export default {
  async create () {
    const data = await getData()
    await base.create(data.map(convertToRecord), 'openparliament.ca')
  }
}
