import AVLTree from '../avl.js';

function testInsert() {
    console.log('%ctestInsert', 'color:red');
    var t = Date.now();
    var tree = new AVLTree();
    var size = 100000;
    for (var i = 1; i <= size; i++) {
        tree.insert(i, 'data_' + i);
    }
    console.log(tree);
    console.log('cost', Date.now() - t);
    console.log('----------------------------------------');
}

function testDelete() {
    console.log('%ctestDelete', 'color:red');
    var tree = new AVLTree();
    var size = 10000;
    for (var i = 1; i <= size; i++) {
        tree.insert(i, 'data_' + i);
    }
    var retains = [];
    //只保留4个随机数目
    for (var i = 0; i < 4; i++) {
        retains.push((Math.random() * size) >> 0);
    }
    console.log('retains', retains);
    for (var i = 1; i <= size; i++) {
        if (retains.indexOf(i) == -1) {
            tree.delete(i);
        }
    }
    console.log(tree);
    console.log('----------------------------------------');
}

function testSeach() {
    console.log('%ctestSeach', 'color:red');
    var tree = new AVLTree();
    var size = 10000;
    for (var i = 1; i <= size; i++) {
        tree.insert(i, 'data_' + i);
    }
    for (var i = 0; i < 4; i++) {
        var tmp = (Math.random() * size) >> 0;
        console.log('key', tmp, tree.search(tmp));
    }
    console.log('----------------------------------------');
}

function testPreNext() {
    console.log('%ctestPreNext', 'color:red');
    var tree = new AVLTree();
    var size = 10000;
    for (var i = 1; i <= size; i++) {
        tree.insert(i, 'data_' + i);
    }
    var tmp = (Math.random() * size) >> 0;
    var first = tree.search(tmp);
    var last = first;
    tmp = [];

    console.log('next');
    for (var i = 0; first && i < 5; i++) {
        tmp.push(first.key);
        first = first.next;
    }
    console.log(tmp);

    console.log('pre');
    tmp = [];
    for (var i = 0; last && i < 5; i++) {
        tmp.push(last.key);
        last = last.pre;
    }
    console.log(tmp);

    var tmp = (Math.random() * size) >> 0;
    console.log('after delete', tmp);
    tree.delete(tmp);
    var node = tree.search(tmp + 1);
    tmp = [];
    tmp.push(node.pre && node.pre.pre && node.pre.pre.key);
    tmp.push(node.pre && node.pre.key);
    tmp.push(node.key);
    tmp.push(node.next && node.next.key);
    tmp.push(node.next && node.next.next && node.next.next.key);
    console.log(tmp);
    console.log('----------------------------------------');
}

//draw tree
function draw() {
    console.log('%cdraw', 'color:red');
    var tree = new AVLTree();
    var size = 20;
    for (var i = 1; i <= size; i++) {
        tree.insert(i, 'data_' + i);
    }
    console.log(tree.root);
    var ctx = document.querySelector('#canvas').getContext('2d');
    var width = 150;
    var height = tree.root.height;
    ctx.lineWidth = 2;
    ctx.font = "12px bold";
    ctx.textAlign = 'center';
    _draw(tree.root);
    console.log('----------------------------------------');

    function _draw(node) {
        if (!node) {
            return;
        }
        if (!node.pNode) {
            node.x = 400;
            node.y = 40;
        } else if (node.pNode.lChild == node) {
            var w = width * (node.height + 0.6) / height;
            node.x = node.pNode.x - w;
            node.y = node.pNode.y + 100;
        } else {
            var w = width * (node.height + 0.6) / height;
            node.x = node.pNode.x + w;
            node.y = node.pNode.y + 100;
        }
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#fff";
        ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "#000";
        ctx.fillText(node.key, node.x, node.y + 4);

        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-over";
        if (node.pNode) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.pNode.x, node.pNode.y);
        }
        ctx.stroke();
        ctx.closePath();

        _draw(node.lChild);
        _draw(node.rChild);
    }
}

function testCompartor() {
    console.log('%ctestCompartor', 'color:red');
    var t = Date.now();
    var compartor = function(arg1,arg2) {
        return arg1.key - arg2.key
    }
    var tree = new AVLTree(compartor);
    var size = 10;
    for (var i = 1; i <= size; i++) {
        var key = {key: i};
        tree.insert(key, 'data_' + i);
    }
    console.log(tree);
    console.log('----------------------------------------');

    console.log('search {key: 5}');
    console.log(tree.search({key: 5}));

    console.log('delete {key: 5}');
    tree.delete({key: 5});
    console.log(tree);
}

testInsert();
testDelete();
testSeach();
testPreNext();
testCompartor();
draw();