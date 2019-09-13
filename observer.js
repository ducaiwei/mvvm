/**
 * 观察者
 * @param {object} data 
 */
function Observer(data) {
    // debugger;
    this.data = data;
    this.walk(data);
}
Observer.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data, key, value) {
        var dep = new Dep();
        var childObj = observe(value);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return value;
            },
            set: function setter(newValue) {
                if (value === newValue) {
                    return;
                }
                value = newValue;
                dep.notify();
            }
        });
    }
}
/**
 * 深度遍历
 * @param {} value 
 * @param {*} vm 
 */
function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}
