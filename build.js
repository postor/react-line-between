const { join, dirname } = require('path')
const { readdir, writeFile, ensureDir, lstat, removeSync } = require('fs-extra')
const { transformFileAsync } = require("@babel/core")


const babelConfig = {
  "presets": [
    "@babel/env",
  ],
  "plugins": [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-class-properties",

  ]
}


async function recursiveBuild(from, to) {
  const stat = await lstat(from)
  if (stat.isDirectory()) {
    const entries = await readdir(from)
    entries.forEach(x => {
      recursiveBuild(join(from, x), join(to, x))
    })
    return
  }

  if (!from.endsWith('.js')) {
    return
  }

  const { code, map, ast } = await transformFileAsync(from, babelConfig)
  await ensureDir(dirname(to))
  await writeFile(to, code)
  map && await writeFile(`${to}.map`, map)
  ast && await writeFile(`${to}.ast`, ast)

}

removeSync(join(__dirname, 'dist'))
recursiveBuild(join(__dirname, 'lib'), join(__dirname, 'dist'))