class Utils {
    queryString(o) {
        let params = '';
        for (let k in o) {
            params += `${k}=${o[k]}&`;
        }
        return params.slice(0,-1);
    }
}

export const utils = new Utils();