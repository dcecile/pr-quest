import pathToRegexp from 'path-to-regexp'
import create from 'lodash/create'

import dynamicRoutes from './dynamic-routes.js'
import liberalObjects from '../obj/liberal-objects.json'

const externalLink = pathToRegexp.compile('https://openparliament.ca/politicians/:id/')

const formatDate = dateText => new Date(dateText).toLocaleString(
  'en-US',
  {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

const liberals = liberalObjects.map(leader => create(leader, {
  link: dynamicRoutes.details.link({ id: leader.openID }),
  externalLink: externalLink({ id: leader.openID }),
  email: `mailto:${leader.email}`,
  statementDate: formatDate(leader.statementDate)
}))

const findLiberal = id =>
  liberals.find(leader => leader.openID === id)

export default {
  liberals,
  findLiberal
}
