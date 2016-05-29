export function filenameWithoutLoaders(filename = '') {
  let index = filename.lastIndexOf('!')
  return index < 0 ? filename : filename.substr(index + 1)
}

export function filenameHasLoaders(filename) {
  return filenameWithoutLoaders(filename) !== filename
}

export function filenameHasSchema(filename) {
  return /^[\w]+:/.test(filename)
}

export function isFilenameAbsolute(filename) {
  return filenameWithoutLoaders(filename).indexOf('/') === 0
}

export function makeUrl(filename, scheme, line, column) {
  let actualFilename = filenameWithoutLoaders(filename)

  if (filenameHasSchema(filename)) {
    return actualFilename
  }

  let url = `file://${actualFilename}`
  if (scheme) {
    url = `${scheme}://open?url=${url}`
    if (line && actualFilename === filename) {
      url = `${url}&line=${line}`
      if (column) {
        url = `${url}&column=${column}`
      }
    }
  }
  return url
}

export function makeLinkText(filename, line, column) {
  let text = filenameWithoutLoaders(filename)
  if (line && text === filename) {
    text = `${text}:${line}`
    if (column) {
      text = `${text}:${column}`
    }
  }
  return text
}
