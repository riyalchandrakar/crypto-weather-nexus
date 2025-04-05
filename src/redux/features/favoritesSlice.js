import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites: [] // Ensure this is always initialized as an array
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload)
    },
    clearFavorites: (state) => {
      state.favorites = []
    }
  }
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer