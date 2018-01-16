import React from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const { blog, likeFunction, removeFunction, commentSubmitFunction, commentFormChangeFunction, commentFieldValue } = props
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  const addedByAnon = !blog.user // Voi kattoa joku this.state.blogs.find(blog => blog.... === ...)
  const match = addedByAnon ?
    false : // Tarkastelua ei lähdetä suorittamaan (satavarma error)
    blog.user.username === loggedInUser.username // Normaali tarkastelu
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div className="blogs">
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={likeFunction(blog.id)}>like</button></div>
        {addedByAnon ?
          <div>added by anon</div> :
          <div>added by {blog.user.name}</div>}
        {match || addedByAnon
          ? <button onClick={removeFunction(blog.id)}>delete</button>
          : <div></div>}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={commentSubmitFunction(blog.id)}>
          <div>
            <input
              placeholder="kommentti"
              type="text"
              name="comment"
              value={commentFieldValue}
              onChange={commentFormChangeFunction}
            />
            <button>add comment</button>
          </div>
        </form>
      </div>
      <div>
        <ul>
          {blog.comments.map(comment =>
            <li>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeFunction: PropTypes.func.isRequired,
  removeFunction: PropTypes.func.isRequired,
  commentFieldValue: PropTypes.string.isRequired //Ei toimi? Väännetään näitä lopputehtävässä erikseen...
}

export default Blog