(function(window, util) {
    function $(selectors, subject) {
        return util.toArray((subject || document).querySelectorAll(selectors));
    }

    function elementIndex(element) {
        return util.indexOf.call(element.parentElement.children, element);
    }

    var dom = window.dom = {
        $: $,
        elementIndex: elementIndex
    };
})(window, window.util);
