import ErrorStackParser from 'error-stack-parser'

import defaultStyle from './defaultStyle'
import {isFilenameAbsolute, makeUrl, makeLinkText} from './lib'

let RedBox = ({error, editorScheme, filename, style, useColumns, useLines}) => {
  let {file, frame, linkToFile, message, redbox, stack} = {...defaultStyle, ...style}

  let frames
  try {
    frames = ErrorStackParser.parse(error).map((f, index) => {
      let text
      let url

      if (index === 0 && filename && !isFilenameAbsolute(f.fileName)) {
        url = makeUrl(filename, editorScheme)
        text = makeLinkText(filename)
      }
      else {
        let lines = useLines ? f.lineNumber : null
        let columns = useColumns ? f.columnNumber : null
        url = makeUrl(f.fileName, editorScheme, lines, columns)
        text = makeLinkText(f.fileName, lines, columns)
      }
      return <div style={frame} key={index}>
        <div>{f.functionName}</div>
        <div style={file}>
          <a href={url} style={linkToFile}>{text}</a>
        </div>
      </div>
    })
  }
  catch (e) {
    frames = <div style={frame} key={0}>
      <div>Failed to parse stack trace. Stack trace information unavailable.</div>
    </div>
  }

  return <div style={redbox}>
    <div style={message}>{error.name}: {error.message}</div>
    <div style={stack}>{frames}</div>
  </div>
}

RedBox.displayName = 'RedBox'
RedBox.defaultProps = {
  useColumns: true,
  useLines: true
}

export default RedBox
