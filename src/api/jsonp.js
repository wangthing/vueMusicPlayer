import Jsonp from 'jsonp'

let jsonp = (url, data, option) => {
    return new Promise((resolve, reject) => {
        Jsonp(buildUrl(url, data), option, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function buildUrl (url, data) {
    let params = [];
    for(var key in data) {
        params.push(`${key}=${data[key]}`);
    }
    params = params.join('&')

    if(url.indexOf("?") === -1) {
        url += '?' + params
    } else {
        url += '&' + params
    }
    return url;
}


export default jsonp