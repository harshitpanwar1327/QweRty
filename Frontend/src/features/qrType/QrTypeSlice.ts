import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface QRType {
  type: string
}

const initialState: QRType = {
  type: 'website',
}

export const QrTypeSlice = createSlice({
  name: 'qrType',
  initialState,
  reducers: {
    activeTab: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
  },
})

export const { activeTab } = QrTypeSlice.actions

export default QrTypeSlice.reducer