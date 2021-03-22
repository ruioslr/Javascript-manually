function deepClone(obj, map = new Map()) {
    if (obj !== null && typeof obj === 'object') {
        let cloneObj = Array.isArray(obj) ? [] : {};
        const mapValue = map.get(target);
        if (mapValue) {
            return mapValue;
        }
        map.set(obj, cloneObj);
        for (let key in obj) {
            cloneObj[key] = deepClone(obj[key], map);
        }
        return cloneObj;
    } else {
        return obj;
    }
}