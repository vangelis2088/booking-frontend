const axios = require("axios");

//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers = {
            Authorization: "Bearer " + token,
        };
    } else {
        delete axios.defaults.headers.Authorization;
    }
}

export default setAuthHeader;
//export { axios };