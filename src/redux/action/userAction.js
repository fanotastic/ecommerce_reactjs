import axios from "axios"
import { API_URL } from "../../helper"


//export function supaya dpt dipakai di navbar
export const loginAction = (email, password) => {

    //cara 1

    // return (dispatch) => {
    //     axios.get(`${API_URL}/users?email=${email}&password=${password}`)
    //         .then((response) => {
    //             if (response.data.length > 0) {
    //                 localStorage.setItem("data", JSON.stringify(response.data[0]))
    //                 dispatch({
    //                     type: "LOGIN_SUCCESS",
    //                     payload: response.data[0]
    //                 })
    //             }
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }

    // cara 2 // agar axios yg tdnya async menjadi sync

    return async (dispatch) => {
        try {

            let response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`)
            if (response.data.length > 0) {
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                // dispatch: meneruskan data ke reducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data[0]
                })
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const logOutAction = () => {
    return {
        type: "LOGOUT"
    }
}

//type ibarat no resi dari kurir
/**
 * payload berfungsi utk menampung data dari frontend
 * yg ditampung pada parameter data utk diteruskan ke reducer */
