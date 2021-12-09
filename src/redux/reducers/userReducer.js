const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    cart: []
}


// Func userReducer: utk mereturn data dari action.payload agar dapat disimpan oleh STATE REDUCER
export const userReducer = (state = INITIAL_STATE, action) => {
    // SWITCH...CASE : digunakan untuk menentukan data dari action.payload untuk disimpah ke bagian STATE yang dituju berdasarkan action.type
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("DATA DARI ACTION PAYLOAD", action.payload)
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                status: action.payload.status,
                cart: action.payload.cart
            }
        case "UPDATE_CART_USER":
            console.log("cart ambil", action.payload)
            return { ...state, cart: action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}



// 'switch case' utk menyesuaikan data disimpan ke bagian rak mana
// pake switch case karna melihat type dari action