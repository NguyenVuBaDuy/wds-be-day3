import fs from 'fs/promises'
import { BASE_STORAGE_NAME } from "../configs/env.config.js"
import { badRequestError } from '../error/bad.request.error.js'
import { notFoundError } from '../error/not.found.error.js'
import paginationUtil from '../common/pagination.util.js'

class blogService {
    constructor() {
        this.STORAGE_PATH = BASE_STORAGE_NAME + "/blogs.json"
    }

    async insertBlog(newBlog) {
        const data = await fs.readFile(this.STORAGE_PATH)
        const blogs = JSON.parse(data)

        const existedBlog = blogs.filter(blog => blog.id === newBlog.id)
        if (existedBlog.length > 0) throw new badRequestError(`Blog with id ${newBlog.id} already exist`)

        blogs.push(newBlog)
        await fs.writeFile(this.STORAGE_PATH, JSON.stringify(blogs))
    }

    async getBlogs(pageSize, pageNum) {
        if (pageSize < 0) throw new badRequestError("PageSize must be > 0")
        if (pageNum < 0) throw new badRequestError("PageNum must be > 0")

        const data = await fs.readFile(this.STORAGE_PATH)
        const blogs = JSON.parse(data)

        if (!pageSize && !pageNum) {
            return blogs
        } else {
            const indexRange = paginationUtil.getIndexRange(pageSize, pageNum)
            console.log(indexRange)
            if (indexRange[0] < blogs.length) return blogs.filter((blog, index) => index >= indexRange[0] && index <= indexRange[1])
            else return []
        }
    }

    async getBlogByID(id) {
        const data = await fs.readFile(this.STORAGE_PATH)
        const blogs = JSON.parse(data)

        const searchedBlog = blogs.filter(blog => blog.id === id)

        if (searchedBlog.length > 0) return searchedBlog[0]
        else throw new notFoundError("Blog not found")
    }

    async updateBlog(id, updatedBlog) {
        const data = await fs.readFile(this.STORAGE_PATH)
        const blogs = JSON.parse(data)

        if (id != updatedBlog.id) throw new badRequestError("ID in param doesn't match id of data update blog")

        const index = blogs.findIndex(blog => blog.id === id)

        if (index > -1) blogs[index] = updatedBlog
        else throw new notFoundError("Blog not found")

        await fs.writeFile(this.STORAGE_PATH, JSON.stringify(blogs))
    }

    async deleteBlog(id) {
        const data = await fs.readFile(this.STORAGE_PATH)
        const blogs = JSON.parse(data)
        const newBlogs = blogs.filter(blog => blog.id !== id)
        await fs.writeFile(this.STORAGE_PATH, JSON.stringify(newBlogs))
    }
}

export default new blogService()