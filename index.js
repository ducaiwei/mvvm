/**
 * 将observe和watcher关联起来
 * @param {*} data 
 * @param {*} el 
 * @param {*} exp 
 */
function MyMvvm(data, el, exp) {
    this.data = data;
    observe(data);
    el.innerHTML = this.data[exp];
    new Watcher(this, exp, function(value) {
        console.log('value', value);
        el.innerHTML = value;
    });
    return this;
}