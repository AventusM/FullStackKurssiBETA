
const list = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
    const blogs = []
    const result = list.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    test('when list has only one blog equals the likes of that', () => {
        //Testikamaa oppimisen vuoksi, jutut siirretty omaan moduuliin

        // const likesOnly = listWithOneBlog.map(blog => blog.likes)
        // const sumOfLikes = (accumulator, item) => accumulator + item
        // const result = likesOnly.reduce(sumOfLikes)
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'Go To Statement Considered Best Practice',
            author: 'Matti Luukkainen',
            url: 'rtfm.fi',
            likes: 9001,
            __v: 0
        }
    ]
    test('when list has two blogs equals the likes of their sum', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(9006)
    })

    const listWithNoBlogs = []
    test('empty list returns zero', () => {
        const result = listHelper.totalLikes(listWithNoBlogs)
        expect(result).toBe(0)
    })
})

describe('most likes', () => {
    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'Microservices',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/articles/microservices.html',
            likes: 90,
            __v: 0
        }
    ]

    test('of list with two blogs is the one by Martin Fowler', () => {
        // const maxLikesOfMap = Math.max.apply(null, listWithTwoBlogs.map(blog => blog.likes))
        // console.log(maxLikesOfMap)
        //Otetaan 1. matchi, voi olla duplikaattejakin
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        console.log(result)
        expect(result.title).toBe('Microservices')
    })

    const listWithNoBlogs = []
    test('of an empty list is nothing', () => {
        const result = listHelper.favoriteBlog(listWithNoBlogs)
        console.log(result)
        expect(result).toBe('No blogs specified')
    })
})