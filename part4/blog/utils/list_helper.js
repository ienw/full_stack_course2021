const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}


const findFav = (blogs) => {
  let favoriteBlog = { likes: 0 }

  for (let blog of blogs) {
    if(blog.likes > favoriteBlog.likes){
      favoriteBlog = blog
    }
  }

  return favoriteBlog
}



module.exports = {
  dummy,
  totalLikes,
  findFav
}