const fs = require('fs-extra')
const base = process.cwd() + "/src/examples"

const getFileInfo = ([filename, fileContent]) => `
  "${filename}": {
    cmpt: require('./${filename}'),
    content: ${JSON.stringify(fileContent)}
  }
`.trim()

;(async () => {
  const files = await fs.readdir(base)
  const fileInfo = {}
  for (const file of files) {
    if (file === "index.ts") continue
    const fileContent = await fs.readFile(`${base}/${file}`)
    fileInfo[file.split('.').slice(0, -1).join('.')] = fileContent.toString()
  }
  const indexContent = `
export const examples = {
  ${Object.entries(fileInfo).map(getFileInfo)}
}

  `.trim()
  await fs.writeFile(`${base}/index.ts`, indexContent)
})()


