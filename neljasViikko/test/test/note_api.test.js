const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog') // Ei exportata kahdesta moduulista
const { initialBlogData, blogsInDb } = require('./test_helper')

describe('when some blogs have been saved beforehand', async () => {
  beforeEach(async () => {
    //Viimeinen rivi odottaa, että 
    await Blog.remove({})
    const blogs = initialBlogData.map(blogObject => new Blog(blogObject))
    // blog.save() ---> promise - olio
    const promiseArray = blogs.map(blog => blog.save())
    //viimeinen rivi odottaa, että promiseArrayn toteutus valmis ennen
    //testeihin etenemistä
    await Promise.all(promiseArray)
  })

  test('a specific blog is also included by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb() //return ---> ()
    const blogByDijkstra = blogsInDatabase[0]
    const allBlogs =
      await api
        .get('/api/blogs')

    expect(allBlogs.body[0].author).toBe(blogByDijkstra.author)
  })

  test('the amount of all blogs is known by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()
    const allBlogs =
      await api
        .get('/api/blogs')
    expect(allBlogs.body.length).toBe(blogsInDatabase.length)
  })

  //Ei muutoksia aiempaan suoritukseen
  test('an unknown blog is not included by GET /api/blogs', async () => {
    const allBlogs =
      await api
        .get('/api/blogs')
    const blogAuthors = allBlogs.body.map(blog => blog.author)
    expect(blogAuthors).not.toContain('Geir Siirde')
  })

  describe('addition of a new blog', async () => {
    test('POST /api/blogs succeeds with valid input data', async () => {
      const blogsBeforeOperation = await blogsInDb()
      console.log(blogsBeforeOperation)
      const newBlog = {
        title: "Sample resume",
        author: "Anton Moroz",
        url: "cs.helsinki.fi/u/amoroz",
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

      const blogsAfterOperation = await blogsInDb()
      console.log(blogsAfterOperation)
      //1. varmistus ---> blogeja on yksi enemmän kuin aikaisemmin
      //Nyt skaalautuva versio
      expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length + 1)
      const titles = blogsAfterOperation.map(blog => blog.title)
      //2. varmistus ---> äsken lisätyn blogin sisältö on mukana
      expect(titles).toContain("Sample resume")
    })

    test('POST /api/blogs fills in the "likes" - field if one is not given', async () => {
      const blogsBeforeOperation = await blogsInDb()
      console.log(blogsBeforeOperation)
      const newBlogWithNoLikes = {
        title: "A programmers resume",
        author: "Anton Moroz",
        url: "cs.helsinki.fi/u/amoroz"
      }
      await api
        .post('/api/blogs')
        .send(newBlogWithNoLikes)
        .expect(200)

      const blogsAfterOperation = await blogsInDb()
      console.log(blogsAfterOperation)
      const allBlogLikes = blogsAfterOperation.map(blog => blog.likes)
      const lastIndex = blogsBeforeOperation.length
      expect(allBlogLikes[lastIndex]).toBe(0)

    })
    test('POST /api/blogs fails with improper title input', async () => {
      const newBlogWithNoTitle = {
        author: "Anton Moroz",
        url: "cs.helsinki.fi/u/amoroz"
      }
      const blogsBeforeOperation = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlogWithNoTitle)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })
    test('POST /api/blogs fails with improper url input', async () => {
      const newBlogWithEmptyUrl = {
        author: "Anton Moroz",
        url: "   "
      }
      const blogsBeforeOperation = await blogsInDb()
      // console.log(blogsBeforeOperation)

      await api
        .post('/api/blogs')
        .send(newBlogWithEmptyUrl)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()
      // console.log(blogsAfterOperation)
      expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })
  })

  describe('deletion of a blog', async () => {
    //muuttuja
    let newBlog

    beforeAll(async () => {
      newBlog = new Blog({
        title: "Soppakulho",
        author: "Anton Moroz",
        url: "cs.helsinki.fi/u/amoroz"
      })
      await newBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper input', async () => {
      const blogsBeforeDeletion = await blogsInDb()
      await api
        .delete(`/api/blogs/${newBlog._id}`)
        .expect(204)

      const blogsAfterDeletion = await blogsInDb()
      const titles = blogsAfterDeletion.map(blog => blog.title)
      expect(titles).not.toContain(newBlog.title)
      expect(blogsAfterDeletion.length).toBe(blogsBeforeDeletion.length)

    })

  })

})

afterAll(() => {
  server.close()
})
