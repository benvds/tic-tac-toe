(function(window) {
    // transposes a matrix (swaps rows and columns)
    function transpose(collection) {
        return collection.map(function(row, index, collection) {
            return collection.map(function(row) {
                return row[index];
            });
        });
    }

    // return a one dimensional array containing all the items
    function flatten(collection) {
        return collection.reduce(function(accumulator, row) {
            return accumulator.concat(row);
        }, []);
    }

    // returns collection with all values mapped against the predicate
    function mapItems(collection, predicate) {
        return collection.map(function(row) {
            return row.map(predicate);
        });
    }

    var matrix = window.matrix = {
        transpose: transpose,
        flatten: flatten,
        mapItems: mapItems
    };
})(window);
