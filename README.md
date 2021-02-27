# json-find

> 此项目仅为学习参考，并非生产可用，切勿安装使用

Feature
* where: 支持传输 “正则表达式” & ”字符串“ & ”自定义函数“
* orderBy：支持排序，”desc“ & ”asc“ & ”自定义比较函数“
* 完善的测试用例

## Install

```
npm i --save json-find
```

## Usage

``` javascript
import find from 'json-find';

const data = [{
  userId: 8,
  title: 'title1',
},
{
  userId: 11,
  title: 'other',
},
{
  userId: 15,
  title: null,
},
{
  userId: 19,
  title: 'title2',
}];;

const result = find(data).where({
    "title": /\d$/
}).orderBy('userId', 'desc');

// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
```
## API

> todo

## License

MIT
