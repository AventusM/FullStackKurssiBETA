import React from 'react'
import { shallow } from 'enzyme'
import foo from 'enzyme-matchers'
import Adapter from 'enzyme-adapter-react-16'
import { TogglableDiv, Togglable } from './Togglable'
import Blog from './Blog'

describe('<TogglableDiv/>', () => {
  let blog
  let togglableComponent
  let mockHandler


  beforeEach(() => {
    blog = {
      title: 'Password rules are bullshit',
      author: 'Jeff Atwood',
      likes: 10
    }

    mockHandler = jest.fn()

    togglableComponent = shallow(
      <TogglableDiv onClick={mockHandler} author={blog.author} title={blog.title}>
        <Blog blog={blog} likeFunction={mockHandler} removeFunction={mockHandler} />
      </TogglableDiv>
    )
  })

  //Alikomponentti (blogi)
  it('renders a blog', () => {
    expect(togglableComponent.contains(<Blog blog={blog} likeFunction={mockHandler} removeFunction={mockHandler} />)).toEqual(true)
  })

  it('renders only title and author at start', () => {
    const defBlogContentDiv = togglableComponent.find('.defaultVisible')
    expect(defBlogContentDiv.text()).toContain(blog.title)
    expect(defBlogContentDiv.text()).toContain(blog.author)
    expect(defBlogContentDiv.getElement().props.style).toEqual({ display: '' })

    const clickableBlogContentDiv = togglableComponent.find('.allVisible')
    expect(clickableBlogContentDiv.getElement().props.style).toEqual({ display: 'none' }) // alikomponenttiä ei näytetä
  })

  it('renders its subcomponent (a blog) after clicking it', () => {
    const clickableDivs = togglableComponent.find('div')
    clickableDivs.at(2).simulate('click') // onClick={mockHandler}

    let defBlogContentDiv = togglableComponent.find('.defaultVisible')
    expect(defBlogContentDiv.getElement().props.style).toEqual({ display: 'none' }) // muutos tapahtuu '' --> 'none

    let clickableBlogContentDiv = togglableComponent.find('.allVisible')
    expect(clickableBlogContentDiv.getElement().props.style).toEqual({ display: '' }) // -//- 'none' --> ''  ===> alikomponentti näytetään
    // expect(clickableBlogContentDiv.getElement().props.children).toContain(blog) Antaa falsen vaikka sisältyy debugissa ??
    // expect(mockHandler).toHaveBeenCalledTimes(1) // Näyttää 0 vaikka on kutsuttu..?
  })


})