const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "Canonical string reduction2",
      author: "Edsger W. Dijkstra",
      likes: 10
    },
    {
      title: "Canonical string reduction3",
      author: "Edsger W. Dijkstra",
      likes: 18
    },
  ]

  test('when one blog has most likes, equals the blog', () => {
    const result = listHelper.findFav(blogs)
    expect(result).toEqual({
      title: "Canonical string reduction3",
      author: "Edsger W. Dijkstra",
      likes: 18
    })
  })

})
