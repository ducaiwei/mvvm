/**
 * 订阅者
 * @param {} vm 
 * @param {*} exp 
 * @param {*} cb 
 */
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get(); // 将当前watcher添加到订阅器中
}
Watcher.prototype = {
    update: function() {
        this.run();
    },
    get: function() {
        Dep.target = this;
        var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
        Dep.target = null; // 释放自己
        return value;
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        this.value = value;
        this.cb.call(this.vm, value, oldValue);
    }
}