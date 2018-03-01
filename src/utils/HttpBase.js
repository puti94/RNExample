/**
 * Created by puti on 2017/11/1.
 * 封装一个可通用的网络请求工具类
 */


export function ImageBody(response) {
    this.uri = response.uri;
    this.name = response.fileName;
    this.type = 'multipart/form-data';
}


export default class HttpBase {
    static header = null;

    /**
     * 封装的网络请求方法
     * @param url  地址
     * @param method 方法 GET 或者 POST
     * @param type  GET不传，POST 传是传统form形式还是json形式
     * @param params  参数,Object类型
     * @returns {Promise}  返回一个Promise
     */
    static request(url, method, type, params) {
        let body = null;
        let header = {};
        if (method === 'GET') {
            if (params) {
                let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
        } else if (method === 'POST') {
            if (params) {
                if (type === 'form') {
                    body = '';
                    for (let key in params) {
                        body += key + "=" + params[key] + '&'
                    }
                    body = body.substring(0, body.length - 1);
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        ...HttpBase.header
                    }
                } else if (type === 'json') {
                    body = JSON.stringify(params);
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...HttpBase.header
                    }
                } else if (type === 'file') {
                    body = new FormData();

                    Object.keys(params).forEach(key => {
                        let param = params[key];
                        body.append(key, param);
                    });
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;charset=utf-8',
                        ...HttpBase.header
                    }
                }
            }
        }
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                header: header,
                body: body
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject({code: response.status, msg: response._bodyText})
                }
            }).then(responseJson => {
                resolve(responseJson);
            }).catch(e => {
                console.warn('URL:' + url, '加载失败', e);
                reject({code: -1, msg: JSON.stringify(e)})
            })
        })
    }
}