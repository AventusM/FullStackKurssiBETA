const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogData = [
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
    title: 'Russian food',
    author: 'AntonM',
    url: '',
    likes: 1,
    __v: 0
  }
]

beforeAll(async () => {
  //Viimeinen rivi odottaa, että 
  await Blog.remove({})
  const blogs = initialBlogData.map(blogObject => new Blog(blogObject))
  // blog.save() ---> promise - olio
  const promiseArray = blogs.map(blog => blog.save())
  //viimeinen rivi odottaa, että promiseArrayn toteutus valmis ennen
  //testeihin etenemistä
  await Promise.all(promiseArray)
})

//GET-tason testit (pelkkä GET, käytetään olemassaolevaa dataa)
//1. Jokin spesifi olemassaoleva blogi näytetään listassa
test('a specific pre-existing blog can be viewed', async () => {
  const allBlogs =
    await api
      .get('/api/blogs')

  expect(allBlogs.body[0].author).toBe('Edsger W. Dijkstra')
})
//2. Blogien määrä tiedetään
test('the length of the bloglist is known', async () => {
  const allBlogs =
    await api
      .get('/api/blogs')

  expect(allBlogs.body.length).toBe(initialBlogData.length)
})
//3. Blogi, jota ei ole olemassa ei voi nähdä
test('unknown blog does not have a known property', async () => {
  const allBlogs =
    await api
      .get('/api/blogs')
  const blogAuthors = allBlogs.body.map(blog => blog.author)
  expect(blogAuthors).not.toContain('Geir Siirde')
})

//POST-tason testit (POST, lopuksi GET - tarkistus)
//1. Yksinkertainen testi blogin lisäämiselle
test('a valid new blog can be added', async () => {
  const newBlog = {
    title: "Sample resume",
    author: "Anton Moroz",
    url: "cs.helsinki.fi/u/amoroz",
    likes: 1
  }

  //Suoritetaan lisäys
  await api
    .post('/api/blogs')
    .send(newBlog)

  //Tarkistus GET:llä
  const allBlogs =
    await api
      .get('/api/blogs')

  //Tarkistetaan otsikot (tässä esimerkkinä)
  const titles = allBlogs.body.map(blog => blog.title)

  //1. varmistus ---> blogeja on yksi enemmän kuin aikaisemmin
  //HUOMIO - TESTIN SIJAINTI KOODISSA SAATTAA OLLA TÄRKEÄ -> initialBlogData.length + 1 EI SKAALAUDU!!!
  expect(allBlogs.body.length).toBe(initialBlogData.length + 1)
  //2. varmistus ---> äsken lisätyn blogin sisältö on mukana
  expect(titles).toContain('Sample resume')

})

//2. Varmistetaan, että tyhjän 'likes' - kentän arvoksi tulee 0
test('empty likes field puts zero in said field', async () => {
  const newBlogWithNoLikes = {
    title: "A programmers resume",
    author: "Anton Moroz",
    url: "cs.helsinki.fi/u/amoroz"
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithNoLikes)

  const allBlogs =
    await api
      .get('/api/blogs')

  //Haetaan lisätty blogi (viimeisin) tietokannasta ja varmistetaan 'likes' - kentän arvo
  const allBlogLikes = allBlogs.body.map(blog => blog.likes)
  // console.log(allBlogLikes)
  const lastIndex = allBlogs.body.length - 1
  // console.log(lastIndex)
  expect(allBlogLikes[lastIndex]).toBe(0)
})

afterAll(() => {
  server.close()
})
