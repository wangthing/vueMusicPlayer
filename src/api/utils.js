export default {
    throttle (func, delay) {
        var pre = Date.now()
        // console.log(pre);
        return function () {
            var context = this;
            var args = arguments;
            var now = Date.now()
            // console.log(now);
            if(now - pre >= delay) {
                func.call(context, args)
                pre = now
            } 
        }
    }
}