const dummy = (bloglist) => {
    return 1
}

const totalLikes = (bloglist) => {
    const sumReducer = (sum, item) => {
        return sum + item
    }
    return bloglist.length === 0 ?
        0 :
        bloglist.map(blog => blog.likes).reduce(sumReducer, 0)
}

const favoriteBlog = (bloglist) => {
    const mostLikes = Math.max.apply(null, bloglist.map(blog => blog.likes))
    //Otetaan ensimmäinen (jos monta samanlukuista)
    return bloglist.length === 0 ?
        "No blogs specified" :
        bloglist.filter(blog => blog.likes === mostLikes)[0]
}

module.exports = { dummy, totalLikes, favoriteBlog }