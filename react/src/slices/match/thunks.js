import { NotificationActions } from "../../components/Notifications/notificationSlice";
import { removeSuitor, setHeart, setMeta, setSuitors, startLoading, stopLoading, setAccepted } from "./matchSlice";

export const getSuitors = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;
        let url = process.env.API_URL + "find-match"
        if (page > 0) {
            url += "?page=" + page;
        }
        console.log(url)

        try {
            const data = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setSuitors(resposta.data))
                dispatch(setMeta(resposta.meta))
                console.log(resposta)
                // dispatch(setPages())
            }
        } catch (error) {
            // dispatch(setError(error));
            console.error(error)
            dispatch(stopLoading())
        }
    };
};

export const match = (id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "send-match/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            const resposta = await data.json();
            console.log(resposta)
            if (resposta.success) {
                dispatch(removeSuitor(id))
            } else {
                dispatch(NotificationActions.addNotification({
                    message: resposta.message,
                    type: "error"
                }));
            }
            if (resposta.match) {
                // dispatch(NotificationActions.addNotification({
                //     message: "Tu y el otro usuario habeis hecho match",
                //     type: "success"
                // }));
                dispatch(setHeart(true))
            }
        } catch (error) {
            dispatch(NotificationActions.addNotification({
                timeout: null,
                message: "Error de conexión",
                type: "error"
            }));
            console.error(error)
        }
    };
};

export const rejectMatch = (id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "reject-match/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            const resposta = await data.json();
            console.log(resposta)
            if (resposta.success) {
                dispatch(removeSuitor(id))
            } else {
                dispatch(NotificationActions.addNotification({
                    message: resposta.message,
                    type: "error"
                }));
            }
        } catch (error) {
            dispatch(NotificationActions.addNotification({
                timeout: null,
                message: "Error de conexión",
                type: "error"
            }));
            console.error(error)
        }
    };
};

export const getAcceptedMatch = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {
            const data = await fetch(process.env.API_URL + "accepted-match", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setAccepted(resposta.matches));
                if (resposta.matches.length === 0) {
                    dispatch(NotificationActions.addNotification({
                        message: "No hay ningún match aceptado",
                        type: "info"
                    }));
                }
            }
        } catch (error) {
            // dispatch(setError(error));
            console.log("vacio")
            dispatch(stopLoading())
        }
    };
};