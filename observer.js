/**
 * 处理数组
 */
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
// 订阅器
var dep = new Dep();
// 重写数组原型链方法  在触发原型链方法之前通知订阅器响应
[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(item){
	Object.defineProperty(arrayMethods,item,{
	    value:function mutator(){
	    	//缓存原生方法，之后调用
	    	const original = arrayProto[item]	
	    	let args = Array.from(arguments)
		    original.apply(this,args)
		    dep.notify()
	    },
	})
});
/**
 * 观察者
 * @param {object} data
 */
function Observer(data) {
  this.data = data;
  this.walk(data);
  
}
Observer.prototype = {
  walk: function(data) {
    var self = this;
    Object.keys(data).forEach(function(key) {
      if (Array.isArray(data[key])) {
        data[key].__proto__ = arrayMethods;
      }
      self.defineReactive(data, key, data[key]);
    });
  },
  defineReactive: function(data, key, value) {
    observe(value);
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
};
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
