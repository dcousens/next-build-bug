const nextBuild = require('next/dist/build').default
const path = require('path')

async function main () {
  console.log('building')
  await nextBuild(path.join(process.cwd(), 'app/'))
  console.log('built')
}
main()

