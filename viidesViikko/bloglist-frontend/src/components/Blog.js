import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      user: this.props.user,
      likes: 0
    }
  }

  componentWillMount() {
    blogService.getAll()
      .then(blogs =>
        blogs.filter(blog => blog.id === this.props.blog.id))
      .then(result => result.map(blog => blog.likes))
      .then(blogLikes => this.setState({ likes: blogLikes[0] }))
  }


  addLike = async (event) => {
    event.preventDefault()
    event.stopPropagation() // Estetään parentin toiminto (toggle)
    console.log('likes before update --> ' + this.state.likes)
    try {
      await this.setState({ likes: this.state.likes + 1 })
      console.log('likes w/await setState --> ' + this.state.likes)

      console.log(this.props.user)
      const blogObject = {
        user: this.state.user._id,
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
        likes: this.state.likes
      }

      console.log(blogObject)
      blogService.updateBlog(this.props.blog.id, blogObject)

    } catch (exception) {
      console.log(exception)
    }
  }

  render() {

    return (
      <div>
        {this.state.title} {this.state.author}
        <div>&nbsp;&nbsp;&nbsp;&nbsp;<a href={this.state.url}>{this.state.url}</a></div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.likes} likes <button onClick={this.addLike}>like</button></div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;added by {this.state.user.name}</div>
      </div>
    )
  }
}

export default Blog