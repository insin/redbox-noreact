import ErrorStackParser from 'error-stack-parser'

import {redbox, message, stack, frame, file, linkToFile} from './style'

let Redbox = ({error}) => <div style={redbox}>
  <div style={message}>{error.name}: {error.message}</div>
  <div style={stack}>
    {ErrorStackParser.parse(error).map((f, index) => {
      const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`
      return <div style={frame} key={index}>
        <div>{f.functionName}</div>
        <div style={file}>
          <a href={link} style={linkToFile}>{link}</a>
        </div>
      </div>
    })}
  </div>
</div>

Redbox.displayName = 'RedBox'

export default Redbox
