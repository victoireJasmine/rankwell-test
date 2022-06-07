import config from "@/config";
export default {
    serverUri: config.serverUri,
    user: null,
    token: null,
    isAuthenticated: false, 
    cartProducts: [],
    requestApi (method, uri, data = null, token = this.token){
        if (!uri) {
            console.error('fonction de api requiere uri')
            return
        }
        var url = config.serverUri + '/api' + uri
        var setUrl
        var headers = {'Content-Type': 'application/json'}
        method = method.toLowerCase()

        if (token) headers['Authorization'] = token

        if(method == 'get' || method == 'delete') {
            setUrl = data == null? fetch(url, {method: method.toUpperCase(), headers: headers}): fetch(`${url}?${data}`, {method: method.toUpperCase(), headers: headers})
        } else if(method == 'post' || method == 'put') {
            if(data == null) {
                console.error('veillez envoyer les données pour cette methode')
                return
            }
            let options = {
                            method: method.toUpperCase(),
                            headers: headers,
                            body: JSON.stringify(data)
                        }
            setUrl = fetch(url,options)
        }else {
            console.error('cette methode n\'est pas prise en compte par l\'api')
            return
        }
        return setUrl
        .then(response => response.json())
    }
}