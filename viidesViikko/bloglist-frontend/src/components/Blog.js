import React from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const { blog, likeFunction, removeFunction } = props
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  const addedByAnon = !blog.user // Voi kattoa joku this.state.blogs.find(blog => blog.... === ...)
  const match = addedByAnon ?
    false : // Tarkastelua ei lähdetä suorittamaan (satavarma error)
    blog.user.username === loggedInUser.username // Normaali tarkastelu
  return (
    <div>
      {blog.title} {blog.author}
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<a href={blog.url}>{blog.url}</a></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;{blog.likes} likes <button onClick={likeFunction(blog.id)}>like</button></p>
      {addedByAnon ?
        <p>&nbsp;&nbsp;&nbsp;&nbsp;added by anon</p> :
        <p>&nbsp;&nbsp;&nbsp;&nbsp;added by {blog.user.name}</p>}
      {match || addedByAnon ?
        <button onClick={removeFunction(blog.id)}>delete</button> :
        <p></p>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeFunction: PropTypes.func.isRequired,
  removeFunction: PropTypes.func.isRequired
}

export default Blog