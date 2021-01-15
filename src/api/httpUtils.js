import axios from 'axios'

// TODO: replace this string when in test/production environment

// replace /api_v1 with /react_v1, for security reasons: hide sensitive username and password
// const BASE_URL = "http://127.0.0.1:8090/react_v1";

export const baseUrl = () => {
    // console.log("href: " + location.href);
    return location.origin.replace("3030", "8090") + "/react_v1";
}

export const httpGet = (apiPath, params) => {

    params = params || {};

    // console.log('http get: ', apiPath, ", params: ", params)

    return axios.get(baseUrl() + apiPath,
        {
            params: params,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        }
    )
}

export const httpPostFormData = (apiPath, formData) => {
    formData = formData || new FormData()
    return axios.post(baseUrl() + apiPath, formData,
        {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        }
    )
}

export const httpDeleate = (apiPath) => {
    return axios.delete(baseUrl() + apiPath,
        {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        }
    )
}

export const httpPost = (apiPath, params) => {
    params = params || {}
    return axios.post(baseUrl() + apiPath, params,
        {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        }
    )
}

