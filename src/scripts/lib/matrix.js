(function(window) {
    // transposes a matrix (swaps rows and columns)
    function transpose(collection) {
        return collection.map(function(row, index, collection) {
            return collection.map(function(row) {
                return row[index];
            });
        });
    }

    // returns collection with all values mapped against the predicate
    function mapItems(collection, predicate) {
        return collection.map(function(row) {
            return row.map(predicate);
        });
    }

    var matrix = window.matrix = {
        transpose: transpose,
        mapItems: mapItems
    };
})(window);
