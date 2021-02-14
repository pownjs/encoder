exports.yargs = {
    command: 'show',
    describe: 'Show available transforms',

    handler: async(argv) => {
        const { transforms } = require('../../../../lib/transforms')

        console.table(Object.entries(transforms).map(([name, { title, group }]) => ({ name, title, group })))
    }
}
