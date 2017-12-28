const palindrom = (string) => {
    return string.split('').reverse().join('')
}

const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0 ?
        0 : //keskiarvon laskeminen ei onnistu tyhjällä taulukolla vanhalla tavalla
        array.reduce(reducer, 0) / array.length
}

module.exports = {
    palindrom,
    average
}