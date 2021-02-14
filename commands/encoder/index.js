exports.yargs = {
    command: 'encoder <command>',
    describe: 'Encoder/Decoder',
    aliases: ['enc', 'decoder', 'dec'],

    builder: (yargs) => {
        yargs.command(require('./sub/encoder').yargs)
        yargs.command(require('./sub/show').yargs)
    }
}
