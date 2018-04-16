/**
 * Created by puti on 2017/11/1.
 * 封装一个可通用的网络请求工具类
 */

import {LoadingUtils} from './LoadingUtils'

export function ImageBody(response) {
    this.uri = response.uri;
    this.name = response.fileName;
    this.type = 'multipart/form-data';
}


export class HttpUtil {
    static header = null;
    //超时设置
    static timeOut = 20 * 1000;
    static host = '';

    /**
     *  GET请求
     * @param url          请求地址
     * @param params       参数
     * @param loadingParams 加载框参数
     * @returns {Promise.<*>|Promise.<T>}
     */
    static get(url: string, params, loadingParams) {
        return this.request(url, params, loadingParams)
    }

    /**
     *  POST from 请求
     * @param url          请求地址
     * @param params       参数
     * @param loadingParams 加载框参数
     * @returns {Promise.<*>|Promise.<T>}
     */
    static post(url: string, params, loadingParams) {
        return this.request(url, params, loadingParams, 'POST', 'form')
    }

    /**
     *  POST JSON 请求
     * @param url          请求地址
     * @param params       参数
     * @param loadingParams 加载框参数
     * @returns {Promise.<*>|Promise.<T>}
     */
    static postJson(url: string, params, loadingParams) {
        return this.request(url, params, loadingParams, 'POST', 'json')
    }

    /**
     * 封装的网络请求方法
     * @param url  地址
     * @param method 方法 GET 或者 POST
     * @param type  GET不传，POST 传是传统form形式还是json形式
     * @param params  参数,Object类型
     * @param loadingParams
     * @returns {Promise.<*>|Promise.<T>}  返回一个Promise
     */
    static request(url: string,
                   params,
                   loadingParams = {
                       show: true,
                       hint: '加载中'
                   },
                   method: string = 'GET',
                   type = 'form') {
        let body = null;
        let header = {};
        if (method === 'GET') {
            if (params) {
                let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
                if (url.indexOf('?') === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
        } else if (method === 'POST') {
            if (params) {
                if (type === 'form') {
                    body = new FormData();
                    Object.keys(params).forEach(key => {
                        let param = params[key];
                        body.append(key, param);
                    });
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data;charset=utf-8',
                        ...HttpUtil.header
                    }
                } else if (type === 'json') {
                    body = JSON.stringify(params);
                    header = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...HttpUtil.header
                    }
                }
            }
        }
        if (!url.startsWith('http')) {
            url = this.host + url;
        }
        loadingParams.show && LoadingUtils.show(loadingParams.hint);
        return Promise.race([new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                header: header,
                body: body
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject({code: response.status, msg: `服务器返回信息错误:${response._bodyText}`})
                }
            }).then(responseJson => {
                resolve(responseJson);
            }).catch(e => {
                reject({code: -1, msg: `fetch进入catch:${JSON.stringify(e)}`})
            }).finally(() => {
                loadingParams.show && LoadingUtils.hide();
            })
        }), new Promise((resolve, reject) => {
            setTimeout(() => {
                loadingParams.show && LoadingUtils.hide();
                reject({code: -1, msg: `${url}请求超时`})
            }, this.timeOut)
        })])
    }
}