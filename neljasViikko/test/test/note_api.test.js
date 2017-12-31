const supertest = require('supertest')
//Export indeksistä
//mockaamisen sijasta (käytössä oikea tietokanta)
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog') // Ei exportata kahdesta moduulista
const User = require('../models/user')
const { initialBlogData, blogsInDb, usersInDb } = require('./test_helper')

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
    const firstBlog = blogsInDatabase[0]
    const allBlogs =
      await api
        .get('/api/blogs')

    expect(allBlogs.body[0].author).toBe(firstBlog.author)
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

  //1. Edit w/proper input
  //2. id not accepted
  // describe('altering blogs contents', async () => {

  //   test('PUT /api/blogs/:id can update likes of an existing blog', async () => {
  //     const blogsBeforeUpdate = await blogsInDb()
  //     //new Blog ei käy ---> tulee uusi, erillinen id
  //     const firstBlog = blogsBeforeUpdate[0]
  //     let currentLikes = firstBlog.likes
  //     console.log('CURRENT LIKES ---> ' + currentLikes)

  //     firstBlog.likes += 1
  //     await firstBlog.update()

  //     await api
  //       .put(`/api/blogs/${firstBlog._id}`)
  //       .send(firstBlog)

  //     const blogsAfterUpdate = await blogsInDb()
  //     console.log(blogsAfterUpdate[0].likes)

  //     expect(blogsAfterUpdate[0].likes).toBe(currentLikes + 1)
  //   })
  // })

})

describe('when a single user is in the database', async () => {

  beforeEach(async () => {
    //Tyhjennetään käyttäjät tietokannasta ennen jokaista yksittäistä testiä
    await User.remove({})
    const user = new User({
      username: "AntonM",
      name: "Anton",
      pw: "secret",
      adult: true
    })
    //Talletetaan yksi käyttäjä tulevia duplikaattitestejä varten
    //Validi syöte
    await user.save()
  })

  test('POST /api/users succeeds with unique username and empty adult value', async () => {
    const usersBeforeAddition = await usersInDb()
    console.log(usersBeforeAddition[0])

    const userToBeAdded = {
      username: "Whiteknight108",
      name: "Matti Sormunen",
      pw: "worth"
    }

    await api
      .post('/api/users')
      .send(userToBeAdded)

    const usersAfterAddition = await usersInDb()
    //Varmistus, että käyttäjiä on 1 enemmän kuin ennen lisäysoperaatiota
    expect(usersAfterAddition.length).toBe(usersBeforeAddition.length + 1)
    //Varmistetaan, että uusi käyttäjänimi löytyy kaikkien käyttäjänimien joukosta
    const allUsernames = usersAfterAddition.map(user => user.username)
    expect(allUsernames).toContain(userToBeAdded.username)
    //Tarkistetaan, että ilman adult - kenttää asetettu käyttäjä saa oletusarvokseen true
    expect(usersAfterAddition[usersBeforeAddition.length].adult).toBe(true)
  })

  test('POST /api/users fails with a duplicate username', async () => {

    const duplicateToBeAdded = {
      username: "AntonM",
      name: "Petteri Punakuono",
      pw: "publicknowledge"
    }

    //Käytetään tulosta hyödyksi testissä
    //Käytetään tulosta hyödyksi testissä
    const result = await api
      .post('/api/users')
      .send(duplicateToBeAdded)
      .expect(409)

    expect(result.body).toEqual({ error: 'duplicate username found' })

  })

  test('POST /api/users fails with too short of a username', async () => {
    const tooShortUserNameToBeAdded = {
      username: "ab",
      name: "Peter Rednose",
      pw: "creativecommons"
    }

    const result = await api
      .post('/api/users')
      .send(tooShortUserNameToBeAdded)
      .expect(400)

    expect(result.body).toEqual({ error: 'username and/or password too short' })
  })

  test('POST /api/users fails with too short of a password', async () => {
    const tooShortPasswordToBeAdded = {
      username: "abc",
      name: "mr.perfect",
      pw: "xd"
    }

    const result = await api
      .post('/api/users')
      .send(tooShortPasswordToBeAdded)
      .expect(400)

    expect(result.body).toEqual({ error: 'username and/or password too short' })
  })
})

afterAll(() => {
  server.close()
})
