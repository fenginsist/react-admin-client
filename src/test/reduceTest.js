/*
arr.reduce(function(prev,cur,index,arr){
...
}, init);

其中，
arr 表示原数组；
prev 表示上一次调用回调时的返回值，或者初始值 init;
cur 表示当前正在处理的数组元素；
index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
init 表示初始值。

看上去感觉很复杂，其实常用的参数只有两个：prev 和 cur。接下来我们跟着实例来看看具体用法吧~
* */
//先提供一个原始数组：
const arr = [3,9,4,3,6,0,9];


//1. 求数组项之和
const sum = arr.reduce(function (prev, cur) {
    return prev + cur;
},0);
console.log(sum)
/*
由于传入了初始值0，所以开始时prev的值为0，cur的值为数组第一项3，相加之后返回值为3作为下一轮回调的 prev 值，
然后再继续与下一个数组项相加，以此类推，直至完成所有数组项的和并返回。
* */


//2. 求数组项最大值
const max = arr.reduce(function (prev, cur) {
    return Math.max(prev,cur);
});
console.log(max)
// 由于未传入初始值，所以开始时prev的值为数组第一项3，cur的值为数组第二项9，取两值最大值后继续进入下一轮回调。




// 3. 数组去重
const newArr = arr.reduce(function (prev, cur) {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]);
console.log(newArr)
/*
实现的基本原理如下：
① 初始化一个空数组
② 将需要去重处理的数组中的第1项在初始化数组中查找，如果找不到（空数组中肯定找不到），就将该项添加到初始化数组中
③ 将需要去重处理的数组中的第2项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中
④ ……
⑤ 将需要去重处理的数组中的第n项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中
⑥ 将这个初始化数组返回
*/
