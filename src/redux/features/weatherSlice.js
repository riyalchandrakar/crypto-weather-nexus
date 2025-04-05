import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWeatherData, fetchWeatherHistory } from '../../services/weatherService'

export const getWeatherData = createAsyncThunk(
  'weather/getData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWeatherData()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getWeatherHistory = createAsyncThunk(
  'weather/getHistory',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await fetchWeatherHistory(cityId)
      return { cityId, data: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: [],
    history: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getWeatherHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getWeatherHistory.fulfilled, (state, action) => {
        state.loading = false
        state.history[action.payload.cityId] = action.payload.data
      })
      .addCase(getWeatherHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default weatherSlice.reducer