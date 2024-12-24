import express from 'express'
import blogController from '../controllers/blog.controller.js'

const blogRouter = express.Router()

blogRouter.post("/create-blog", blogController.insertBlog)
blogRouter.get('/', blogController.getBlogs)
blogRouter.get('/:id', blogController.getBlogByID)
blogRouter.put('/:id', blogController.updateBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

export default blogRouter