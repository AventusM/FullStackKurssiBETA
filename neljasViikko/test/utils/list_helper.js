const dummy = (bloglist) => {
    return 1
}

const totalLikes = (array) => {
    const sumReducer = (sum, item) => {
        return sum + item
    }
    return array.length === 0 ?
        0 :
        array.map(blog => blog.likes).reduce(sumReducer, 0)
}

module.exports = { dummy, totalLikes }