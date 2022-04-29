

import _ from 'lodash'
const cacheMap = new Map()
const cacheExpireMap = new Map()

class Cache {
    set (name, value, expire) {
        if (_.isNumber(expire)) {
            cacheExpireMap.set(name, Date.now() + expire)
        }
        if (!cacheMap.has(name)) {
            return cacheMap.set(name, value)
        }
        return true
    }
    get (name) {
        if (cacheMap.has(name)) {
            return cacheMap.get(name)
        }
        return false
    }
    has (name) {
        if (!cacheMap.has(name)) {
            return false
        }
        const expire = cacheExpireMap.get(name)
        if (!expire) {
            return true
        }
        if (Date.now() > expire) {
            cacheMap.delete(name)
            cacheExpireMap.delete(name)
            return false
        }
        return true
    }
    delete (name) {
        if (cacheMap.has(name)) {
            return cacheMap.delete(name)
        }
        return true
    }
    clear () {
        cacheMap.clear()
        return cacheMap.size < 1
    }
}

export default new Cache()
