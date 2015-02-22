var indexOf = Array.prototype.indexOf,
    slice = Array.prototype.slice;

function toArray(subject) {
    return slice.call(subject);
}

// returns true if collection is empty
function isEmpty(collection) {
    return collection.length === 0;
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

// negate a funcion result
function negate(fn) {
    return function() {
        return !fn.apply(this, arguments);
    }
}

// returns true when predicate is true for every item in collection
function every(collection, predicate) {
    return isEmpty(collection.filter(negate(predicate)));
}

// returns clone of source object
function clone(source) {
    if (source == null || typeof(source) != 'object') {
        return source;
    }

    var obj = source.constructor();

    for(var key in source) {
        if(source.hasOwnProperty(key)) {
            obj[key] = clone(source[key]);
        }
    }

    return obj;
}

var util = {
    indexOf: indexOf,
    slice: slice,
    isEmpty: isEmpty,
    negate: negate,
    every: every,
    clone: clone,
    toArray: toArray
};

module.exports = util;
