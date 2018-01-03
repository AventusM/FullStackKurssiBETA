// import React from 'react'
// import blogService from '../services/blogs'

// class Blog extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   addLike = (event) => {
//     event.preventDefault()
//     event.stopPropagation() // Estetään parentin toiminto (toggle)
//     console.log('likes before update --> ' + this.props.blog.likes)
//     try {

//       console.log(this.props.user)
//       const blogObject = {
//         user: this.props.user._id,
//         title: this.props.blog.title,
//         author: this.props.blog.author,
//         url: this.props.blog.url,
//         likes: this.props.blog.likes + 1
//       }

//       console.log(blogObject)
//       blogService.updateBlog(this.props.blog.id, blogObject)
//       console.log('likes after update ---> ' + this.props.blog.likes)
//     } catch (exception) {
//       console.log(exception)
//     }
//   }

//   render() {

//     return (
//       <div>
//         {this.props.blog.title} {this.props.blog.author}
//         <div>&nbsp;&nbsp;&nbsp;&nbsp;<a href={this.props.blog.url}>{this.props.blog.url}</a></div>
//         <div>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.blog.likes} likes <button onClick={this.addLike}>like</button></div>
//         <div>&nbsp;&nbsp;&nbsp;&nbsp;added by {this.props.user.name}</div>
//         <button>delete</button>
//       </div>
//     )
//   }
// }

// export default Blog