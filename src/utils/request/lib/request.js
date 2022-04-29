

import axios from 'axios'
import Cookie from 'js-cookie'
import {
    paramsSerializer,
} from './utils'
import requestMiddleware from '../middleware/request'
import responseMiddleware from '../middleware/response'

const CancelToken = axios.CancelToken
const CRRF_TOKEN_KEY = 'job_csrf_key'

const csrfHashCode = key => {
    let hashCode = 5381
    for (let i = 0; i < key.length; i++) {
        hashCode += (hashCode << 5) + key.charCodeAt(i)
    }
    return hashCode & 0x7fffffff
}
const defaultConfig = {
    timeout: 60000,
    headers: {},
    withCredentials: true,
    paramsSerializer,
}

const requestPayloadDefaul = {
    // 后端响应无权限时的提示逻辑，默认dialog
    // @value dialog 弹框形式显示
    // @value page 页面的形式显示
    permission: 'dialog',
}

export default class Request {
    static supportMethods = [
        'get', 'post', 'delete', 'put',
    ]
    static willCachedMethods = [
        'get',
    ]
    static bodyDataMethods = [
        'post', 'put',
    ]
    static cancel = () => {

    }
    constructor (cache) {
        this.cache = cache
        this.init()
        this.injectCSRFTokenToHeaders()
    }
    _url = ''
    config = {}
    get name () {
        return `${this.config.method}_${this.url}_${JSON.stringify(this.config.params)}`
    }
    get url () {
        return `${this.config.url}${this.config.query ? '?' + this.config.query : ''}`
    }
    get isCanBeCached () {
        if (!Request.willCachedMethods.includes(this.config.method)) return false
        if (!Object.prototype.hasOwnProperty.call(this.config, 'cache') || !this.config.cache) return false
        // if (this.config.params && Object.keys(this.config.params).length > 0) return false
        return true
    }
    get axiosConfig () {
        const config = {
            ...defaultConfig,
        }
        if (this.config.method) {
            config.method = this.config.method
        }
        if (this.config.headers) {
            config.headers = Object.assign({}, config.headers, this.config.headers)
        }
        if (this.config.host) {
            config.baseURL = this.config.host
        }
        if (this.config.params) {
            if (Request.bodyDataMethods.includes(this.config.method)) {
                config.data = this.config.params
            } else {
                config.params = this.config.params
            }
        }
        if (!this.config.payload) {
            return config
        }

        // axio 支持更过配置项通过config.payload获取
        const axioMoreConfig = [
            'onUploadProgress', 'timeout',
        ]
        axioMoreConfig.forEach(configExtend => {
            if (Object.prototype.hasOwnProperty.call(this.config.payload, configExtend)) {
                config[configExtend] = this.config.payload[configExtend]
            }
        })
        return config
    }
    // 接口请求额外的业务相关配置项
    get requestPayload () {
        const payload = this.config.payload || {}
        
        return {
            ...requestPayloadDefaul,
            ...payload,
        }
    }
    init () {
        requestMiddleware(axios.interceptors.request)
        responseMiddleware(axios.interceptors.response)
    }
    /**
    * @desc 向 http header 注入 CSRFToken，CSRFToken key 值与后端一起协商制定
    */
    injectCSRFTokenToHeaders () {
        const CSRFToken = Cookie.get(CRRF_TOKEN_KEY)
        if (CSRFToken !== undefined) {
            axios.defaults.headers.common['X-CSRF-Token'] = csrfHashCode(CSRFToken)
        } else {
            console.warn('Can not find csrftoken in document.cookie')
        }
    }
    checkCache () {
        return this.isCanBeCached && this.cache.has(this.name)
    }
    setCache (data) {
        this.isCanBeCached && this.cache.set(this.name, data, this.config.cache)
    }
    deleteCache () {
        this.cache.delete(this.name)
    }
    request (config) {
        this.config = {
            ...config,
        }
        
        if (this.checkCache()) {
            return this.cache.get(this.name)
        }

        const source = CancelToken.source()
        if (config.payload && config.payload.setCancelSource) {
            config.payload.setCancelSource(source)
        }
        
        const requestHandler = axios({
            url: this.url,
            cancelToken: source.token,
            ...this.axiosConfig,
            payload: { ...this.requestPayload, },
        }).then(data => {
            this.setCache(requestHandler)
            return data
        })
        this.setCache(requestHandler)
        return requestHandler
    }
}
