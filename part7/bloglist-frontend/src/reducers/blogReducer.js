import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initializeBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addComment(state, action) {
      const { blogId, comment } = action.payload
      return state.map((blog) => {
        blog.id === blogId
          ? { ...blog, comments:[...blog.comments, comment] }
          : blog
      })
    },
  },
})

export const { initializeBlogs, createBlog, updateBlog, deleteBlog, addComment } = blogSlice.actions
export default blogSlice.reducer