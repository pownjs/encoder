exports.yargs = {
    command: 'encoder <transform>',
    describe: 'Encoder/Decoder',

    handler: async(argv) => {
        const { transform } = argv

        const { transforms } = require('../lib/transforms')

        const util = transforms[transform]

        if (!util) {
            console.error(`Unrecognized transform ${transform}`)

            return
        }

        const read = async function(stream) {
            let buffer = Buffer.alloc(0)

            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }

            return buffer
        }

        const buffer = await read(process.stdin)

        console.log(util.func(buffer, {}).toString())
    }
}
