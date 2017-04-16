import file from './file'

const prettyStringify = value =>
  JSON.stringify(value, null, 4)

const mkdir = async () => {
  try {
    await file.mkdir('obj')
  } catch (err) {
  }
}

const path = name => `obj/${name}.json`

const write = async (name, data) => {
  await mkdir()
  await file.write(path(name), prettyStringify(data))
}

const read = async (name) => {
  const data = JSON.parse(await file.read(path(name)))
  console.log(`Cache found for ${name}`)
  return data
}

const get = async (name, func) => {
  try {
    return await read(name)
  } catch (err) {
    console.log(`No cache for ${name}`)
    const data = await func()
    await write(name, data)
    console.log(`Cache written for ${name}`)
    return data
  }
}

export default {
  get,
  write
}
