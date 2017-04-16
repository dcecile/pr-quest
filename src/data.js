import pathToRegexp from 'path-to-regexp'
import create from 'lodash/create'

import dynamicRoutes from './dynamic-routes.js'
import liberalObjects from '../obj/liberal-objects.json'

const externalLink = pathToRegexp.compile('https://openparliament.ca/politicians/:id/')

const liberals = liberalObjects.map(leader => create(leader, {
  link: dynamicRoutes.details.link({ id: leader.openID }),
  externalLink: externalLink({ id: leader.openID }),
  email: `mailto:${leader.email}`
}))

const findLiberal = id =>
  liberals.find(leader => leader.openID === id)

export default {
  liberals,
  findLiberal
}
