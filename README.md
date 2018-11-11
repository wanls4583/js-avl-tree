# js-avl-tree

> 使用 JavaScript 编写的平衡二叉树，可以快速的插入，删除和查找数据。

## 内容

- [**`安装`**](#安装)
- [**`案例`**](#案例)
- [**`AVLTree`**](#AVLTree)
- [**`AVLNode`**](#AVLNode)
- [**`insert`**](#insert)
- [**`delete`**](#delete)
- [**`search`**](#rsearch)
- [**`贡献`**](#贡献)


## 安装

```bash
npm install js-avl-tree
```

## 案例

请查看[**`example`**](https://github.com/wanls4583/js-avl-tree/tree/master/src/example)

[**`online demo`**](https://blog.lisong.hn.cn/code/example/js-avl-tree/src/example/index.html)

## AVLTree

```javascript
/**
 * 二叉平衡树
 * @param {Function} compartor 关键字的比较器
 * @param {Boolean}  ifMerge   是否将插入的数据合并到节点
 */
function AVLTree(compartor, ifMerge)
```

## AVLNode

```javascript
/**
 * 插入节点
 * @param  {[type]} key  节点的key
 * @param  {[type]} data 节点的数据
 * @return {Boolean}     是否将插入的数据合并到节点
 */
function AVLNode(key, data, ifMerge)
```

## insert

```javascript
/**
 * 插入节点
 * @param  {[type]} key  节点的key
 * @param  {[type]} data 节点的数据
 * @return {Boolean}     插入是否成功
 */
_proto.insert = function(key, data)
```

## delete

```javascript
/**
 * 删除节点
 * @param  {[type]}   key     需要删除的节点的key
 * @param  {Boolean}  ifAll   是否删除所有符合的结点（默认只删除第一个查找到的结果）
 * @return {Array|AVLNode}    被删除后的点
 */
_proto.delete = function(key, ifAll) 
```

## search

```javascript
/**
 * 查找节点
 * @param  {[type]}   key     需要查找的节点的key
 * @param  {Boolean}  ifAll   是否返回所有结果（默认只返回第一个查找到的结果）
 * @return {Array|AVLNode}    查找结果
 */
_proto.search = function(key, ifAll)
```

## 贡献

欢迎给出一些意见和优化，期待你的 `Pull Request`