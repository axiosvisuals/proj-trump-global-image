
let init = function() {

    // only want one resizer on the page
    if (document.documentElement.className.indexOf("g-resizer-v3-init") > -1) return;
    document.documentElement.className += " g-resizer-v3-init";
    // require IE9+
    if (!("querySelector" in document)) return;

    function resizer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll(".g-artboard-v3[data-min-width]")),
            widthById = {};
        elements.forEach(function(el) {
            var parent = el.parentNode,
                width = Math.round(widthById[parent.id]) || Math.round(parent.getBoundingClientRect().width),
                minwidth = el.getAttribute("data-min-width"),
                maxwidth = el.getAttribute("data-max-width");
            widthById[parent.id] = width;

            if (+minwidth <= width && (+maxwidth >= width || maxwidth === null)) {
                var img = el.querySelector('.g-aiImg');
                if (img.getAttribute('data-src') && img.getAttribute('src') != img.getAttribute('data-src')) {
                    img.setAttribute('src', img.getAttribute('data-src'));
                }
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        });
    }

    resizer();
    document.addEventListener('DOMContentLoaded', resizer);
    // feel free to replace throttle with _.throttle, if available
    window.addEventListener('resize', throttle(resizer, 200));

    function throttle(func, wait) {
        // from underscore.js
        var _now = Date.now || function() {
                return new Date().getTime();
            },
            context, args, result, timeout = null,
            previous = 0;
        var later = function() {
            previous = _now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = _now(),
                remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }
};


module.exports = {
    init
}