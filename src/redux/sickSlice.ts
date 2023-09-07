import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SickResponseData } from 'types/sick'

interface SickState {
  sicks: SickResponseData
  input: string
  selectedSick: string
}

const initialState: SickState = {
  sicks: [],
  input: '',
  selectedSick: '',
}

const sickSlice = createSlice({
  name: 'sick',
  initialState,
  reducers: {
    changeInput(state, action: PayloadAction<string>) {
      state.input = action.payload
    },
    setSick(state, action: PayloadAction<SickResponseData>) {
      state.sicks = action.payload
    },
    selectSick(state, action: PayloadAction<string>) {
      state.selectedSick = action.payload
    },
  },
})

export const { changeInput, setSick, selectSick } = sickSlice.actions

export default sickSlice.reducer
