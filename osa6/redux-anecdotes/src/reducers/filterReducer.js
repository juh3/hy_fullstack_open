import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filters',
  initialState: {content: ''},

  reducers: {
    doFilter(state ,action) {
      console.log(action)
      console.log(state)
      state.content = action.payload
    }
  }
})

export const { doFilter } = filterSlice.actions
export default filterSlice.reducer