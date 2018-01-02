import React from 'react'



const Blog = ({ blog, user }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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