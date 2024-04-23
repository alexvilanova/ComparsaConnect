import { setToken, setError } from "./authslice";

export const doLogin = (dades) => {
    return async (dispatch) => {
        const { username, password } = dades;
        try {
            const data = await fetch(process.env.API_URL + "login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username: username, password: password }),
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                dispatch(setToken(resposta.token));
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    };
};