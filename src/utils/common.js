/**
 * 节流
 * @param action
 * @param delay
 * @returns {Function}
 */
export function throttle(action, delay) {
    let last = 0;
    return function () {
        let curr = +new Date();
        if (curr - last > delay) {
            action.apply(this, arguments);
            last = curr
        }
    }
}