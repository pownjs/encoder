const rot = require('rot')
const hexy = require('hexy')
const crypto = require('crypto')
const jsonpath = require('jsonpath')
const entities = require('entities')
const punycode = require('punycode')

const basex = require('./basex')

const transforms = {
    none: {
        title: 'None',

        options: {},

        aliases: [],

        func: (input, options) => {
            return input
        }
    },

    md5: {
        group: 'Hash',

        title: 'MD5',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(crypto.createHash('md5').update(input).digest('hex'))
        }
    },

    sha1: {
        group: 'Hash',

        title: 'SHA1',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(crypto.createHash('sha1').update(input).digest('hex'))
        }
    },

    sha256: {
        group: 'Hash',

        title: 'SHA256',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(crypto.createHash('sha256').update(input).digest('hex'))
        }
    },

    sha512: {
        group: 'Hash',

        title: 'SHA512',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(crypto.createHash('sha512').update(input).digest('hex'))
        }
    },

    encbase64: {
        group: 'Base64',

        title: 'Encode Base64',

        func: (input) => {
            return Buffer.from(Buffer.from(input).toString('base64'))
        }
    },

    decbase64: {
        group: 'Base64',

        title: 'Decode Base64',

        func: (input) => {
            return Buffer.from(input, 'base64')
        }
    },

    rot: {
        group: 'Crypto',

        title: 'Rot',

        options: {
            shift: {
                type: 'range',
                min: 0,
                max: 26,
                defaultValue: 13
            }
        },

        aliases: [],

        func: (input, options) => {
            const { shift = 13 } = options

            return Buffer.from(rot(input, shift))
        }
    },

    encascii: {
        group: 'Chars',

        title: 'Encode ASCII',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from((Buffer.from(input)).toString('ascii'))
        }
    },

    decascii: {
        group: 'Chars',

        title: 'Decode ASCII',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(input, 'ascii')
        }
    },

    encutf16le: {
        group: 'Chars',

        title: 'Encode UTF16LE',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from((Buffer.from(input)).toString('utf16le'))
        }
    },

    decutf16le: {
        group: 'Chars',

        title: 'Decode UTF16LE',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(input, 'utf16le')
        }
    },

    enchex: {
        group: 'Binary',

        title: 'Encode Hex',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from((Buffer.from(input)).toString('hex'))
        }
    },

    dechex: {
        group: 'Binary',

        title: 'Decode Hex',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(input, 'hex')
        }
    },

    encurlesc: {
        group: 'URL',

        title: 'Encode URL (escape)',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(escape(input.toString()))
        }
    },

    decurlesc: {
        group: 'URL',

        title: 'Decode URL (unescape)',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(unescape(input.toString()))
        }
    },

    encuricomp: {
        group: 'URL',

        title: 'Encode URL (encodeURIComponent)',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(encodeURIComponent(input.toString()))
        }
    },

    decuricomp: {
        group: 'URL',

        title: 'Decode URL (decodeURIComponent)',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(decodeURIComponent(input.toString()))
        }
    },

    encurl: {
        group: 'URL',

        title: 'Encode URL (all)',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(input.toString().split('').map(c => `%${c.charCodeAt(0).toString(16)}`).join(''))
        }
    },

    decurl: {
        group: 'URL',

        title: 'Decode URL (all)',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from((unescape || decodeURIComponent)(input.toString()))
        }
    },

    enchtmlents: {
        group: 'HTML',

        title: 'Encode HTML Entities',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(entities.encodeHTML(input.toString()))
        }
    },

    dechtmlents: {
        group: 'HTML',

        title: 'Decode HTML Entities',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(entities.decodeHTML(input.toString()))
        }
    },

    encxmlents: {
        group: 'XML',

        title: 'Encode XML Entities',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(entities.encodeXML(input.toString()))
        }
    },

    decxmlents: {
        group: 'XML',

        title: 'Decode XML Entities',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(entities.decodeXML(input.toString()))
        }
    },

    encdatauri: {
        group: 'Data URI',

        title: 'Encode Data URI',

        options: {
            mimetype: {
                type: 'string',
                placeholder: 'Mime Type',
                defaultValue: 'text/html'
            },
            base64: {
                type: 'boolean',
                label: 'Base64',
                defaultValue: true
            }
        },

        aliases: [],

        func: (input, options) => {
            const { mimetype = 'text/html', base64 = true } = options

            let suffix
            let data

            if (base64) {
                suffix = ';base64'
                data = input.toString('base64')
            }
            else {
                suffix = ''
                data = input.toString()
            }

            return Buffer.from(`data:${mimetype}${suffix},${encodeURIComponent(data)}`)
        }
    },

    decdatauri: {
        group: 'Data URI',

        title: 'Decode Data URI',

        options: {},

        aliases: [],

        func: (input, options) => {
            input = input.toString()

            let index = input.indexOf(',')

            if (index < 0) {
                throw new Error(`Invalid Data URI`)
            }

            const header = input.substring(0, index)
            const data = decodeURIComponent(input.substring(index + 1))

            if (/;base64/i.test(header)) {
                return Buffer.from(data, 'base64')
            }
            else {
                return Buffer.from(data)
            }
        }
    },

    encpunycode: {
        group: 'Punycode',

        title: 'Encode Punycode',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(punycode.encode(input.toString()))
        }
    },

    decpunycode: {
        group: 'Punycode',

        title: 'Decode Punycode',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(punycode.decode(input.toString()))
        }
    },

    prettifyjson: {
        group: 'JSON',

        title: 'Prettify JSON',

        options: {},

        aliases: [],

        func: (input, options) => {
            try {
                return Buffer.from(JSON.stringify(JSON.parse(input.toString()), ' ', ' '))
            }
            catch (e) {
                return Buffer.from(e.message)
            }
        }
    },

    uglifyjson: {
        group: 'JSON',

        title: 'Uglify JSON',

        options: {},

        aliases: [],

        func: (input, options) => {
            try {
                return Buffer.from(JSON.stringify(JSON.parse(input.toString())))
            }
            catch (e) {
                return Buffer.from(e.message)
            }
        }
    },

    jsonpath: {
        group: 'JSON',

        title: 'Extract JSON Path',

        options: {
            path: {
                type: 'string',
                defaultValue: '$'
            }
        },

        aliases: [],

        func: (input, options) => {
            const { path = '$' } = options

            let value

            try {
                value = jsonpath.value(JSON.parse(input), path)

                if (!['number', 'boolean', 'string'].includes(typeof(value))) {
                    value = JSON.stringify(value)
                }
            }
            catch (e) {
                return Buffer.from(e.message)
            }

            if (value) {
                return Buffer.from(value)
            }
            else {
                return Buffer.alloc(0)
            }
        }
    },

    parsejwt: {
        group: 'Utils',

        title: 'Parse JWT',

        options: {},

        aliases: [],

        func: (input, options) => {
            const parts = input.toString().split('.')
            const payload = parts.length > 1 ? parts[1] : parts[0]

            return Buffer.from((Buffer.from(payload, 'base64')).toString('utf8'))
        }
    },

    hexdump: {
        group: 'Utils',

        title: 'Hex Dump',

        options: {},

        aliases: [],

        func: (input, options) => {
            return Buffer.from(hexy.hexy(input))
        }
    },

    cbuffer: {
        group: 'Programming',

        title: 'C/C++ Buffer',

        options: {},

        aliases: [],

        func: (input, options) => {
            input = input.toString('hex').replace(/(..)/g, '0x$1,').replace(/,$/m, '')

            return Buffer.from(`char buf[] = { ${input} };`)
        }
    },

    prbuffer: {
        group: 'Programming',

        title: 'Python/Ruby Buffer',

        options: {},

        aliases: [],

        func: (input, options) => {
            input = input.toString('hex').replace(/(..)/g, '\\x$1')

            return Buffer.from(`buf = "${input}"`)
        }
    },

    ...Object.assign({}, ...(Object.entries(basex).map(([name, util]) => {
        return {
            [`enc${name}`]: {
                group: 'Base X',

                title: 'Encode ' + name[0].toUpperCase() + name.substring(1),

                options: {},

                aliases: [],

                func: (input, options) => {
                    return Buffer.from(util.encode(input))
                }
            },

            [`dec${name}`]: {
                group: 'Base X',

                title: 'Decode ' + name[0].toUpperCase() + name.substring(1),

                options: {},

                aliases: [],

                func: (input, options) => {
                    return Buffer.from(util.decode(input.toString()))
                }
            }
        }
    })))
}

module.exports = { transforms }
