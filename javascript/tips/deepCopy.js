function deepCopy(obj) {
    var clone = {};
    for (var key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            clone[key] = deepCopy(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }
    return clone;
}