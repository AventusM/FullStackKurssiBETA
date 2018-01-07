import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders its contents', () => {
    const blog = {
      title: 'Password rules are bullshit',
      author: 'Jeff Atwood',
      likes: 10
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const blogContentDiv = simpleBlogComponent.find('.wrapper')
    expect(blogContentDiv.text()).toContain(blog.title)
    expect(blogContentDiv.text()).toContain(blog.author)
    expect(blogContentDiv.text()).toContain(blog.likes)

  })
})