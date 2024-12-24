import blogService from "../services/blog.service.js"

class blogController {
    async insertBlog(req, res, next) {
        try {
            const newBlog = req.body
            await blogService.insertBlog(newBlog)
            res.status(201).end()
        } catch (error) {
            if (error.httpCode) res.status(error.httpCode).send(error.message)
            else res.status(500).send("Unknown error")
        }
    }

    async getBlogs(req, res, next) {
        try {
            const pageSize = req.query.pageSize
            const pageNum = req.query.pageNum
            const blogs = await blogService.getBlogs(pageSize, pageNum)
            res.status(200).json(blogs)
        } catch (error) {
            if (error.httpCode) res.status(error.httpCode).send(error.message)
            else res.status(500).send("Unknown error")
        }
    }

    async getBlogByID(req, res, next) {
        try {
            const id = req.params.id
            const blog = await blogService.getBlogByID(id)
            res.status(200).json(blog)
        } catch (error) {
            if (error.httpCode) res.status(error.httpCode).send(error.message)
            else res.status(500).send("Unknown error")
        }
    }

    async updateBlog(req, res, next) {
        try {
            const id = req.params.id
            const updatedBlog = req.body
            await blogService.updateBlog(id, updatedBlog)
            res.status(201).end()
        } catch (error) {
            if (error.httpCode) res.status(error.httpCode).send(error.message)
            else res.status(500).send("Unknown error")
        }
    }

    async deleteBlog(req, res, next) {
        try {
            const id = req.params.id
            await blogService.deleteBlog(id)
            res.status(201).end()
        } catch (error) {
            if (error.httpCode) res.status(error.httpCode).send(error.message)
            else res.status(500).send("Unknown error")
        }
    }
}

export default new blogController()