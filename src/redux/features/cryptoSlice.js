import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCryptoData, fetchCryptoHistory } from '../../services/cryptoService.js'

export const getCryptoData = createAsyncThunk(
  'crypto/getData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCryptoData()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getCryptoHistory = createAsyncThunk(
  'crypto/getHistory',
  async ({ id, days }, { rejectWithValue }) => {
    try {
      const response = await fetchCryptoHistory(id, days)
      return { id, data: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    history: {},
    loading: false,
    error: null
  },
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price } = action.payload
      const crypto = state.data.find(item => item.id === id)
      if (crypto) {
        crypto.priceUsd = price
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCryptoData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getCryptoHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCryptoHistory.fulfilled, (state, action) => {
        state.loading = false
        state.history[action.payload.id] = action.payload.data
      })
      .addCase(getCryptoHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer