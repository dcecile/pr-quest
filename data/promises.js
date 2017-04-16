import axios from 'axios'
import parse5 from 'parse5'

import cache from './cache'
import base from './base'
import open from './open'

const findGetText = (nodes, nodeName) => {
  const results = []
  const find = (matchingParent, nodes) => {
    for (const node of nodes) {
      if (matchingParent && node.nodeName === '#text') {
        results.push(node.value)
      }
      if (node.childNodes) {
        find(node.nodeName === nodeName, node.childNodes)
      }
    }
  }
  find(false, nodes)
  return results
}

const getData = async () => {
  return await cache.get('promises2015', async () => {
    const newsURL = 'https://web-beta.archive.org/web/20170325122343/https://www.hilltimes.com/2017/02/13/liberals-say-electoral-reform-wont-main-issue-next-election-cause-problems/95863'
    const response = await axios.get(newsURL, { responseType: 'text' })
    const document = parse5.parse(response.data)
    const text = findGetText(document.childNodes, 'p')
    const parser = /^(.+?)\s{2,}(.+?),\s(.+?)\s+([.\d]+?)$/
    const parserAlt = /^(.+?(?:Murray|McKenna|Rota|Lametti|Sohi|Leslie))\s(.+?),\s(.+?)\s+([.\d]+?)$/
    return text
      .map(line => {
        const parsed = parser.exec(line) || parserAlt.exec(line)
        if (parsed) {
          return {
            name: parsed[1],
            riding: parsed[2],
            region: parsed[3],
            margin: parsed[4]
          }
        }
      })
      .filter(result => result)
  })
}

const correctedNames = {
  'Alexandra Mendès': 'Alexandra Mendes',
  'Harjit Sajjan': 'Harjit S. Sajjan',
  'Jennifer O’Connell': 'Jennifer O\'Connell',
  'Leon Alleslev': 'Leona Alleslev',
  'Nathaniel Erskine Smith': 'Nathaniel Erskine-Smith',
}

const convertToRecord = data => {
  return {
    'Name': correctedNames[data.name] || data.name,
    'Promise in 2015': 'Yes'
  }
}

export default {
  async update () {
    const data = await getData()
    const records = data.map(convertToRecord)
    await base.patch(records, 'Name')
    await base.checkKeys(records, 'Name')
  }
}
