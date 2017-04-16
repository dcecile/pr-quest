import escapeRegExp from 'lodash/escapeRegExp'
import axios from 'axios'

const createRegExp = input =>
  new RegExp(`^${escapeRegExp(input)}`, 'i')

const splitRegExp = /[\s-—]/

const splitWords = original =>
  original.split(splitRegExp).filter(word => word)

const gatherWords = (...fields) =>
  [].concat(...fields.map(splitWords))

const isLeaderTextMatch = inputRegExps => leader => {
  const words = gatherWords(leader.name, leader.riding)
  return inputRegExps.every(inputRegExp =>
    words.some(word => inputRegExp.test(word)))
}

const findTextMatches = (input, leaders) => {
  const inputWords = splitWords(input)
  const inputRegExps = inputWords.map(createRegExp)
  return leaders.filter(isLeaderTextMatch(inputRegExps))
}

const postalCodeRegExp = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/

let currentPromise = null
const findPostalCodeMatches = async (input, leaders) => {
  const promise = currentPromise = axios.get(`http://represent.opennorth.ca/postcodes/${input.replace(/\s/, '').toUpperCase()}/?sets=federal-electoral-districts`)
  const response = await promise
  if (promise !== currentPromise) {
    throw new Error('Aborting promise')
  }
  const ridings = response.data.boundaries_centroid.map(boundary => boundary.name)
  return leaders.filter(leader =>
    ridings.some(riding => leader.riding === riding))
}

const findMatches = async (input, leaders) => {
  currentPromise = null
  if (postalCodeRegExp.test(input)) {
    return await findPostalCodeMatches(input, leaders)
  } else {
    return findTextMatches(input, leaders)
  }
}

export default {
  findMatches
}
