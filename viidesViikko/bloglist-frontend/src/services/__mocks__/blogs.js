let token = null

const blogs = [
  {
    id: "5a522fafb0df8c093d4bc5f7",
    title: "Password rules are bullshit",
    author: "Jeff Atwood",
    url: "https://blog.codinghorror.com/password-rules-are-bullshit/",
    likes: 0,
    user: {
      _id: "5a4b04e6e52e397be8c6cda3",
      username: "AntonM",
      name: "Anton Moroz"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }