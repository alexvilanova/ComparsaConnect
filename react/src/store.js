import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { comparsaReducer } from './slices/comparsa/comparsaSlice'
import { profileReducer } from './slices/profile/profileSlice'
import { friendshipReducer } from './slices/friendship/friendshipSlice'
import { NotificationReducer } from './components/Notifications/notificationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        comparsa: comparsaReducer,
        profile: profileReducer,
        friendship: friendshipReducer,
        notification: NotificationReducer
    },
})