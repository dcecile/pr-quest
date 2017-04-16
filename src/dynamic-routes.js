import pathToRegexp from 'path-to-regexp'

const create = path => ({
  serve: path,
  link: pathToRegexp.compile(path)
})

export default {
  details: create('/report-vote/leader/:id')
}
