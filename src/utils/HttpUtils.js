/**
 * Created by puti on 2017/11/1.
 * 管理项目所有的网络请求
 */

import HttpBase, {ImageBody}from './HttpBase'
import LoadingIndicator from './LoadingUtils'

const makeCancelable = (promise, overtime = 30000) => {
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        let timeout = setTimeout(() => {
            reject({code: -1, msg: '网络连接超时'})
        }, overtime);
        promise.then((val) => {
            clearTimeout(timeout);
            hasCanceled_ ? reject({code: -1, msg: '取消'}) : resolve(val)
        }).catch(e => {
            clearTimeout(timeout);
            reject(e)
        })
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

export default class HttpUtils {
    static HOST = null;
    //超时时间
    static OVER_TIME = 30000;


    static  get(url, params, config) {
        return HttpUtils.request(url, params, {
            method: 'GET',
            type: '',
            ...config
        })
    }

    static  post(url, params, config) {
        return HttpUtils.request(url, params, {
            method: 'POST',
            type: 'file',
            ...config
        })
    }


    /**
     * 适用于本app的网络请求
     * @param url
     * @param params
     * @param config
     * @returns {{promise: Promise, cancel: (())}}
     */
    static request(url, params, config) {
        let promise = new Promise((resolve, reject) => {
            if (!config.hide) {
                LoadingIndicator.show(!config.hint ? '加载中' : config.hint);
            }
            HttpBase.request(HttpUtils.buildUrl(url), config.method, config.type, params)
                .then(data => {
                    if (!config.hide) LoadingIndicator.hide();
                    if (data.code === 0 || data.code === '0') {
                        resolve(data.data ? data.data : data.msg)
                    } else {
                        reject({code: data.code, msg: data.msg})
                    }
                }).catch(e => {
                if (!config.hide) LoadingIndicator.hide();
                reject(e)
            });
        });
        return makeCancelable(promise, this.OVER_TIME)
    }


    static buildUrl(url) {
        if (!url.startsWith('http') && HttpUtils.HOST) {
            return HttpUtils.HOST + url;
        }
    }

    /**
     * 传入图片选择器放回的response
     * @param response
     * @returns {ImageBody}  放回一个ImageBody
     */
    static buildImageBody(response) {
        return new ImageBody(response)
    }

}