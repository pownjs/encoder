const baseX = require('base-x')

const BASE2 = '01'
const BASE8 = '01234567'
const BASE11 = '0123456789a'
const BASE16 = '0123456789abcdef'
const BASE32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const BASE32z = 'ybndrfg8ejkmcpqxot1uwisza345h769'
const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz'
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const BASE66 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~'

module.exports = {
    base2: baseX(BASE2),
    base8: baseX(BASE8),
    base11: baseX(BASE11),
    base16: baseX(BASE16),
    base32: baseX(BASE32),
    base32z: baseX(BASE32z),
    base36: baseX(BASE36),
    base58: baseX(BASE58),
    base62: baseX(BASE62),
    base64: baseX(BASE64),
    base66: baseX(BASE66)
}
