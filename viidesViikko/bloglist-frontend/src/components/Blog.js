import React from 'react'



const Blog = ({ blog, user }) => {

  return (
    <div>
      {blog.title} {blog.author}
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<a href={blog.url}>{blog.url}</a></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;{blog.likes} likes <button>like</button></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;added by {user.name}</div>
    </div>
  )
}

export default Blog