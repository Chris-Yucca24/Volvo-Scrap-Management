import axios, {
    AxiosError,
    AxiosResponse,
    type Method,
} from "axios";

import { setErrorStatus } from "../auth/mainSlice";
import { store } from "../auth/store";


// ==============================
// Error Handler
// ==============================

function handleError(error: AxiosError<string>): AjaxError {
    return new AjaxError(error);
}

class AjaxError {
    message = "";
    payload = "";
    code: number | null = null;
    constructor(error: AxiosError<string>) {
        this.message = error.toString();
        this.payload =
            error?.response?.data ?? "";
        if (error.code === AxiosError.ERR_CANCELED) {
            this.code = AjaxError.CANCEL_ERROR_CODE;
        }
        else if (error.response?.status) {
            this.code = error.response.status;
        }
    }
    static readonly CANCEL_ERROR_CODE = 900;
}
// Request Types
// 

type RequestConfig = {
    payload?: unknown;
};
type CancelablePromise<T> = {
    promise: Promise<T>;
    cancel: VoidFunction;
};

// Error Messages
const errorMessages: Record<number, string> = {

    400:
        "The request could not be processed. Please check your input and try again.",
    401:
        "Your session has expired. Please sign in again.",
    403:
        "You don't have permission to access this resource.",
    404:
        "The requested resource could not be found.",
    408:
        "The request timed out. Please try again.",
    409:
        "A conflict occurred. The resource may already exist or has been modified.",
    422:
        "Some of the submitted information is invalid. Please review and try again.",
    429:
        "Too many requests. Please wait a moment and try again.",
    500:
        "Something went wrong on our end. Please try again later.",
    502:
        "The server is temporarily unavailable. Please try again later.",
    503:
        "The service is currently unavailable. Please try again later.",
    504:
        "The server took too long to respond. Please try again later.",
};



// Axios Response Interceptor
//
axios.interceptors.response.use(

    (response) => {
        return response;
    },
    (error: AxiosError) => {

        const statusList = [
            400,
            401,
            403,
            404,
            422,
            429,
            500,
            502,
            504

        ] as const;

        if (axios.isAxiosError(error)) {

            const status = error.response?.status;
            if (
                status &&
                statusList.includes(
                    status as typeof statusList[number]
                )
            ) {

                store.dispatch(

                    setErrorStatus({

                        status,
                        message:
                            errorMessages[status] ??
                            "An unexpected error occurred. Please try again."
                    })
                );
            }
        }

        return Promise.reject(error);
    }
);


// Ajax Service
// 
const Ajax = {
    request<T>(
        method: Method,
        url: string,
        config: RequestConfig = {},
        params?: Record<string, string | number>,
        timeout?: number

    ): CancelablePromise<AxiosResponse<T>> {
        const token =
            localStorage.getItem("token");
        const abortController =
            new AbortController();
        const request =
            axios.request<T>({
                method,
                url,
                timeout:
                    timeout ?? 60000,

                data:
                    config.payload,
                params,
                signal:
                    abortController.signal,
                headers: {


                    Authorization:
                        `Bearer ${token}`,


                },


            });
        return {
            promise:
                new Promise<AxiosResponse<T>>(
                    async (resolve, reject) => {
                        try {
                            const response =
                                await request;
                            console.log(
                                "API Response:",
                                response
                            );
                            resolve(response);
                        }
                        catch (error: any) {
                            const axiosError =
                                error as AxiosError<string>;
                            console.error(
                                "API Error:",
                                axiosError
                            );
                            reject(
                                handleError(axiosError)
                            );
                        }
                    }),
            cancel: () => {
                abortController.abort();
            }
        };
    }
};

export default Ajax;