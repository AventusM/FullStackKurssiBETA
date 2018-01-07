import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
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

  it('clicking like button twice calls its event handler twice', () => {
    const blog = {
      title: 'Password rules are bullshit',
      author: 'Jeff Atwood',
      likes: 10
    }

    const mockHandler = jest.fn()
    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const likeAddingButton = simpleBlogComponent.find('button')
    likeAddingButton.simulate('click')
    likeAddingButton.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)

  })

})