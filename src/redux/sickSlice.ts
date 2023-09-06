import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SickResponseData } from 'types/sick'

interface SickState {
  sicks: SickResponseData
  input: string
}

const initialState: SickState = {
  sicks: [],
  input: '',
}

// export const fetchSicks = createAsyncThunk<SickResponseData>(
//   'sick/fetchSicks',
//   async ({ getState }) => {},
// )

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
  },
})

export const { changeInput, setSick } = sickSlice.actions

export default sickSlice.reducer
