import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNewsData } from '../../services/newsService'

export const getNewsData = createAsyncThunk(
  'news/getData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNewsData()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNewsData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default newsSlice.reducer