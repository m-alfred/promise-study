/*
 * @Author: alfred 
 * @Date: 2020-08-19 13:21:55 
  @desc:  Promise.all(iterable)
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。（可以参考jQuery.when方法---译者注）

  兼容性：https://caniuse.com/#search=Promise.all
 */ 
function generatePromise(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  })
}

const p1 = generatePromise(1000);
const p2 = generatePromise(2000);
const p3 = generatePromise(3000);

Promise.all([p1, p2, p3]).then((res)=>{
  console.log('res:', res); // 3000ms后输出结果 res: [1000, 2000, 3000]
})