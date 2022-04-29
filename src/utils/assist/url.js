

/* eslint-disable */
import _ from 'lodash'

export const parseURL = url => {
    const a = document.createElement('a')
    a.href = url
    
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        pathname: a.pathname.replace(/\/?$/, '/'),
        port: a.port,
        search: a.search.replace(/^\?/, ''),
        hash: a.hash.replace('#', '')
    }
}

export const buildURLParams = (params) => {
    function forEach (obj, fn) {
        // Don't bother if no value provided
        if (obj === null || typeof obj === 'undefined') {
            return
        }
      
        // Force an array if not already something iterable
        if (typeof obj !== 'object') {
            /* eslint no-param-reassign:0*/
            obj = [obj]
        }
      
        if (_.isArray(obj)) {
            // Iterate over array values
            for (let i = 0, l = obj.length; i < l; i++) {
                fn(obj[i], i, obj)
            }
        } else {
            // Iterate over object keys
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    fn(obj[key], key, obj)
                }
            }
        }
    }
    function encode (val) {
        return encodeURIComponent(val)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
    }
    /* eslint no-param-reassign:0*/
    if (!params) {
        return ''
    }
  
    const parts = []
  
    forEach(params, function serialize (val, key) {
        if (val === null || typeof val === 'undefined') {
            return
        }
  
        if (_.isArray(val)) {
            key = key + '[]'
        } else {
            val = [val]
        }
  
        forEach(val, function parseValue (v) {
            if (_.isDate(v)) {
                v = v.toISOString()
            } else if (_.isObject(v)) {
                v = JSON.stringify(v)
            }
            parts.push(encode(key) + '=' + encode(v))
        })
    })
    return parts.join('&')
}
