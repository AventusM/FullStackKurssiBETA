import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
  const { titleFieldValue, authorFieldValue, urlFieldValue, blogFormSubmitFunction, blogFormChangeFunction } = props
  return (
    <form onSubmit={blogFormSubmitFunction} className="blogForm">
      <div>
        title&nbsp;&nbsp;&nbsp;&nbsp;
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
        url&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

BlogForm.propTypes = {
  titleFieldValue: PropTypes.string.isRequired,
  authorFieldValue: PropTypes.string.isRequired,
  urlFieldValue: PropTypes.string.isRequired,
  blogFormSubmitFunction: PropTypes.func.isRequired,
  blogFormChangeFunction: PropTypes.func.isRequired
}

export default BlogForm