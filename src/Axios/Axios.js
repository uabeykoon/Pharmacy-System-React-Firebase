import axios from 'axios';


export const axiosDB = axios.create({
    baseURL:"https://online-pharmacy-7c862.firebaseio.com/"
});
export const axiosAPI = axios.create({
    baseURL:"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7otWQXOD6Wc_-p_OHyCuJ_24HkNIupHw"
})

