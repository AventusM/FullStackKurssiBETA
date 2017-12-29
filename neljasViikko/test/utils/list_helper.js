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

const mostBlogs = (bloglist) => {
    if (bloglist.length === 0) {
        return "No blogs specified"
    }
    const sortedAuthors = bloglist.map(blog => blog.author).sort()
    // console.log(sortedAuthors)
    const blogAmounts = sortedAuthors.map(author => sortedAuthors.lastIndexOf(author) - sortedAuthors.indexOf(author) + 1)
    // console.log(blogAmounts)
    const maxBlogAmount = Math.max.apply(null, blogAmounts)
    // console.log(maxBlogAmount)
    //Indeksi suoraan verrattavissa sortedAuthors - taulukkoon.
    const maxBlogAmountIndex = blogAmounts.indexOf(maxBlogAmount)
    // console.log(maxBlogAmountIndex)
    // console.log('author -> ' + sortedAuthors[maxBlogAmountIndex])
    return { author: sortedAuthors[maxBlogAmountIndex], blogs: maxBlogAmount }

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }