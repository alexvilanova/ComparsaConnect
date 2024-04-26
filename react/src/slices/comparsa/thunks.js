import { setform } from "./comparsalice";

export const createProfile = (formData) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "profile", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: formData
            });
            const resposta = await data.json();
            console.log(resposta)
        } catch (error) {
            // dispatch(setError("Error de conexión"));
            console.error(error)
        }
    };
};
export const profileForm = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "profile-form", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setform(resposta.data))
            }
        } catch (error) {
            // dispatch(setError("Error de conexión"));
            console.error(error)
        }
    };
};