import Airtable from 'airtable'
import pathToRegexp from 'path-to-regexp'
import keyBy from 'lodash/keyBy'
import toPairs from 'lodash/toPairs'

import cache from './cache'

const base = Airtable.base('appzzA5gPh0e2WSiZ')
const table = base('MPs')

const openparliamentHumanURL = 'https://openparliament.ca'
const openparliamentPoliticianParser = pathToRegexp(
  `${openparliamentHumanURL}/politicians/:id/`)

const promise = func => new Promise((resolve, reject) => {
  func((err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

const createOne = async record => {
  const result = await promise(callback => table.create(record, callback))
  console.log(`Created record ${result.fields['Name']} ${result.getId()}`)
}

const select = options => new Promise((resolve, reject) => {
  const results = []
  const page = (records, fetchNextPage) => {
    results.push(...records)
    fetchNextPage()
  }
  const done = err => {
    if (err) {
      reject(err)
    } else {
      resolve(results)
    }
  }
  table.select(options).eachPage(page, done)
})

const convertToObject = record => {
  const fields = record.fields
  const getAttachmentUrl = attachments =>
    (attachments || []).map(attachment => attachment.url)[0]

  return {
    baseID: record.getId(),
    openID: openparliamentPoliticianParser.exec(fields['openparliament.ca'])[1],
    name: fields['Name'],
    party: fields['Party'],
    riding: fields['Riding'],
    support2017: fields['Support in 2017'],
    promise2015: fields['Promise in 2015'],
    vote2014: fields['Vote in 2014'],
    photo: getAttachmentUrl(fields['Photo']),
    email: fields['Email'],
    twitter: fields['Twitter'],
    homepage: fields['Homepage']
  }
}

const getLiberalObjects = async () => {
  const records = await select({ view: 'Liberal MPs' })
  return records.map(convertToObject)
}

export default {
  async create (records, primaryKey) {
    const oldRecords = await select()
    const keyedOldRecords = keyBy(
      oldRecords,
      oldRecord => oldRecord.fields[primaryKey])
    for (const record of records) {
      if (!keyedOldRecords[record[primaryKey]]) {
        await createOne(record)
      }
    }
  },
  async patch (newRecords, primaryKey) {
    const keyedNewRecords = keyBy(newRecords, primaryKey)
    for (const oldRecord of await select()) {
      const patchValue = oldRecord.fields[primaryKey]
      const newRecord = keyedNewRecords[patchValue]
      if (!newRecord) {
        continue
      }
      const changes = {}
      for (const [key, value] of toPairs(newRecord)) {
        if (value && oldRecord.fields[key] !== value) {
          changes[key] = value
        }
      }
      if (toPairs(changes).length > 0) {
        const result = await promise(callback => oldRecord.patchUpdate(changes, callback))
        console.log(`Patched record ${result.fields['Name']} ${result.getId()}`)
      }
    }
  },
  async checkKeys (records, primaryKey) {
    const oldRecords = await select()
    const keyedOldRecords = keyBy(
      oldRecords,
      oldRecord => oldRecord.fields[primaryKey])
    for (const record of records) {
      if (!keyedOldRecords[record[primaryKey]]) {
        console.log(`Missing ${record[primaryKey]}`)
      } else {
        console.log(`Found ${record[primaryKey]}`)
      }
    }
  },
  async exportObjects () {
    const objects = await getLiberalObjects()
    await cache.write('liberal-objects', objects)
    console.log(objects.length)
  }
}
