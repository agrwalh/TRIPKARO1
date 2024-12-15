import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import {persistReducer} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
// import profileReducer from './profileSlice';




const rootReducer = combineReducers({
    user:userReducer

});

const PersistConfig = {
    key: "root",
    storage, 
    version:1,
}

const persistedReducer = persistReducer(PersistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    }),
  
})

export const persistor = persistStore(store);