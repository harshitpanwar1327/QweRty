import { configureStore } from '@reduxjs/toolkit'
import qrTypeReducer from '../features/qrType/QrTypeSlice.js'

export const store = configureStore({
  reducer: {
    qrType: qrTypeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch