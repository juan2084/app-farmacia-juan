import { configureStore, createReducer } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice"
import shopReducer from "../features/Shop/shopSlice";
import cartReducer from "../features/Cart/cartSlice";
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";
import authReducer from "../features/User/userSlice"

const store = configureStore({
    reducer: {
        counter : counterReducer,
        shop: shopReducer,
        cart: cartReducer, 
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store