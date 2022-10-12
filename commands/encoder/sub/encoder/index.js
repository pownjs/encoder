exports.yargs = {
    command: '$0 <transform>',
    describe: 'Encoder/Decoder',
    aliases: ['encoder', 'enc', 'decoder', 'dec'],

    handler: async(argv) => {
        const { transform } = argv

        const { transforms } = require('../../../../lib/transforms')

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

        const input = await read(process.stdin)
        const output = await util.func(input, {})

        console.log(output.toString())
    }
}
