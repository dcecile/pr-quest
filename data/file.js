import fs from 'fs'

const convertToPromise = func => (...args) => {
  return new Promise((resolve, reject) =>
      func(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }))
}

export default {
  write: convertToPromise(fs.writeFile),
  read: convertToPromise(fs.readFile),
  mkdir: convertToPromise(fs.mkdir),
  unlink: convertToPromise(fs.unlink)
}
