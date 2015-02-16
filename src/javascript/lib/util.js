var _ = require('lodash');

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

// returns shallow clone of source object
function clone(source) {
    // TODO replace lodash with 6to5/babeljs Object.assign
    return _.assign({}, source);
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
