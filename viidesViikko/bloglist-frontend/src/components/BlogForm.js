import React from 'react'

const BlogForm = (props) => {
  const { titleFieldValue, authorFieldValue, urlFieldValue, blogFormSubmitFunction, blogFormChangeFunction } = props
  return (
    <form onSubmit={blogFormSubmitFunction}>
      <div>
        title
              <input
          type="text"
          name="title"
          value={titleFieldValue}
          onChange={blogFormChangeFunction} />
      </div>
      <div>
        author
              <input
          type="text"
          name="author"
          value={authorFieldValue}
          onChange={blogFormChangeFunction} />
      </div>
      <div>
        url
              <input
          type="text"
          name="url"
          value={urlFieldValue}
          onChange={blogFormChangeFunction} />
      </div>
      <button>create</button>
    </form>
  )
}

export default BlogForm