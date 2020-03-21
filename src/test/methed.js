//先提供一个原始数组：
const arr = [3,9,4,3,6,0,9];

//1. find获取数组中大于 4 的 第一个元素
const sum = arr.find(a => a>4 )
console.log(sum)

//2. findIndex() 返回符合大于输入框中数字的数组索引：
const index = arr.findIndex(item => item>4);
console.log(index);


//3. map
const numbers = [4, 9, 16, 25];

//返回一个数组，数组中元素为原始数组的平方根:
const newArray = numbers.map(Math.sqrt)
console.log('新数组 newArray：',newArray.toLocaleString())

//返回一个数组，数组中每个元素 +1:
const newArray2 = numbers.map((item=>(item+1)))
console.log('新数组 newArray2：',newArray2)
console.log('原数组 numbers：', newArray)


// 4. reduce()
// 计算数组元素相加后的总和：
const sum2 = numbers.reduce((pre, cur)=>pre+cur)
console.log(sum2)


// 5. filter()
// 返回数组 ages 中所有元素都大于指定数值的元素:
const ages = [32, 33, 12, 40];
const newArr = ages.filter(item=> item>32);
console.log('newArr:', newArr);
console.log('oldArr:', ages);


// 6. forEach()
numbers.forEach((item, index)=>{
    console.log(item, index)
});
console.log(numbers);
