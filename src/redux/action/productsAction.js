import { API_URL } from "../../helper"
import axios from "axios"


export const getProductsAction = (search, min, max) => {

    return async (dispatch) => {
        try {
            let response;
            // cara 1
            // console.log("cek", search)
            // if (search) {
            //     if (search.nama) {
            //         if (search.hargaMax > 0 && search.hargaMin > 0) {
            //             response = await axios.get(`${API_URL}/products?harga_gte=${search.hargaMin}$harga_lte=${search.hargaMax}&nama=${search.nama}`)
            //         } else {
            //             response = await axios.get(`${API_URL}/products?&nama=${search.nama}`)
            //         }
            //     } else {
            //         console.log("cek")
            //         response = await axios.get(`${API_URL}/products?harga_gte=${search.hargaMin}$harga_lte=${search.hargaMax}`)
            //     }
            // }else {
            //     response = await axios.get(`${API_URL}/products`)
            // }

            if (search) {
                response = await axios.get(`${API_URL}/products?nama=${search}`)
            } else if (min, max) {
                response = await axios.get(`${API_URL}/products?harga_gte=${min}&harga_lte=${max}`)
            } else {
                response = await axios.get(`${API_URL}/products`)
            }
            if (search) {
                if (search.hargaAsc == "harga-asc") {
                    console.log("cek", search.hargaAsc)
                    response = await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)
                }
                if (search.hargaDesc) {
                    console.log("cek", search.hargaDesc)
                    response = await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)
                }
                if (search.namaAsc) {
                    console.log("cek", search.hargaAsc)
                    response = await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
                }
                if (search.namaDesc) {
                    console.log("cek", search.hargaDesc)
                    response = await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)
                }
            }


            // cara2
            // response = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ``}`)   

            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}