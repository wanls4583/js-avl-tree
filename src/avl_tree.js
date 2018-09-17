//节点
class AVLNode {
    constructor(key, data) {
        this.key = key;
        this.data = data;
        this.lChild = null; //左子树
        this.rChild = null; //右子树
        this.pre = null; //中序前一个节点
        this.next = null; //中序后一个节点
        this.pNode = null; //父节点
        this.height = 0; //节点的高度
    }
}

//二叉平衡树
class AVLTree {
    constructor() {
        this.root = null;
    }
    /**
     * 插入节点
     * @param  {[type]} key  节点的key
     * @param  {[type]} data 节点的数据
     * @return {Boolean}     插入是否成功
     */
    insert(key, data) {
        var node = new AVLNode(key, data);
        if (!this.root) {
            this.root = node;
            return;
        }
        return this._insert(this.root, node);
    }
    /**
     * 删除节点
     * @param  {Type}	 key 需要删除的节点的key
     * @return {AVLNode}     被删除后的点
     */
    delete(key) {
        var result = this._delete(this.root, key);
        if(result.pre){
            result.pre.next = result.next;
        }
        if(result.next){
            result.next.pre = result.pre;
        }
        return result;
    }
    /**
     * 查找节点
     * @param  {Type}    key 需要查找的节点的key
     * @return {AVLNode}     查找结果
     */
    search(key) {
        return this._search(this.root, key);
    }
    /**
     * 删除节点
     * @param  {AVLNode} root 树的根节点
     * @param  {AVLNode} node 待插入的节点
     * @return {Boolean}      插入是否成功
     */
    _insert(root, node) {
        if (root.key == node.key) {
            return false;
        } else if (root.key > node.key) { //插入左子树
            if (root.lChild) { //在左子树上递归插入
                if (!this._insert(root.lChild, node)) {
                    return false;
                }
                this._checkBalance(root);
            } else { //插入叶子节点
                root.lChild = node;
                node.pNode = root;
            }
        } else { //插入右子树
            if (root.rChild) { //在右子树上递归插入
                if (!this._insert(root.rChild, node)) {
                    return false;
                }
                this._checkBalance(root);
            } else { //插入叶子节点
                root.rChild = node;
                node.pNode = root;
            }
        }
        //生成中序遍历前后件关系
        if(!node.next && root.key > node.key){
            node.next = root;
            root.pre = node;
        }else if(!node.pre && root.key < node.key){
            node.pre = root;
            root.next = node;
        }
        //更新节点的高度
        this._setHeight(root);

        return true;
    }
    /**
     * 删除节点
     * @param  {AVLNode} root 	树的根节点 
     * @param  {[type]}	 key  	待删除的节点的key
     * @return {Boolean}      	是否删除成功
     */
    _delete(root, key) {
        if (!root) {
            return false;
        }
        if (root.key == key) {
            if (!root.lChild && !root.rChild) { //叶子节点，直接删除
                if (this.root == root) {
                    this.root = null;
                } else {
                    if (root.pNode.lChild == root) {
                        root.pNode.lChild = null;
                    } else {
                        root.pNode.rChild = null;
                    }
                    this._setHeight(root.pNode);
                }
                return root;
            } else if (!root.lChild || !root.rChild) { //没有右子树或者没有左子树
                var child = root.lChild || root.rChild;
            	if(this.root == root){
            		this.root = child;
            		this.root.pNode = null;
            	}else{
            		if(root.pNode.lChild == root){
            			root.pNode.lChild = child;
            		}else{
            			root.pNode.rChild = child;
            		}
        			child.pNode = root.pNode;
	            	this._setHeight(root.pNode);
            	}
            	return root;
            } else if (this._getHeight(root.lChild) > this._getHeight(root.rChild)) { //用左子树上最大的节点代替root
                var rChild = root.lChild.rChild;
                var lChild = root.lChild;
                while (rChild && rChild.rChild) {
                    rChild = rChild.rChild;
                }
                if (!rChild) {
                    rChild = lChild;
                }
                //交换root和lChild
                this._change(root, rChild);
                //保证删除的节点没有左子树，或者没有右子树，用来递归更新所有需要更新高度的节点
                var result = this._delete(root.lChild, key);
                this._setHeight(rChild);
                return result;
            } else { //用右子树上最小的节点代替root
                var lChild = root.rChild.lChild;
                var rChild = root.rChild;
                while (lChild && lChild.lChild) {
                    lChild = lChild.lChild;
                }
                if (!lChild) {
                    lChild = rChild;
                }
                //交换root和lChild
                this._change(root, lChild);
                //保证删除的节点没有左子树，或者没有右子树，用来递归更新所有需要更新高度的节点
                var result = this._delete(rChild, key);
                this._setHeight(root);
                return result;
            }
        } else if (root.key > key) { //在左子树上递归删除
            var result = this._delete(root.lChild, key);
            if (!result) {
                return false;
            }
            this._checkBalance(root);
            return result;
        } else { //在右子树上删除
            var result = this._delete(root.rChild, key);
            if (!result) {
                return false;
            }
            this._checkBalance(root);
            return result;
        }
    }
    /**
     * 删除节点
     * @param  {AVLNode} root   树的根节点 
     * @param  {[type]}  key    待查找的节点的key
     * @return {AVLNode}        查找结果
     */
    _search(root, key) {
        if(!root){
            return false;
        }
        if(root.key == key){
            return root;
        }else if(root.key > key){
            return this._search(root.lChild, key);
        }else {
            return this._search(root.rChild, key);
        }
    }
        //左旋转
    _lRotate(node) {
        var rc = node.rChild;
        rc.pNode = node.pNode;
        node.rChild = rc.lChild;
        rc.lChild && (rc.lChild.pNode = node);
        rc.lChild = node;
        if (node == this.root) {
            this.root = rc;
        } else if (node.pNode) {
            if (node.pNode.lChild == node) {
                node.pNode.lChild = rc;
            } else {
                node.pNode.rChild = rc;
            }
        }
        node.pNode = rc;
    }
    //右旋转
    _rRotate(node) {
        var lc = node.lChild;
        lc.pNode = node.pNode;
        node.lChild = lc.rChild;
        lc.rChild && (lc.rChild.pNode = node);
        lc.rChild = node;
        if (node == this.root) {
            this.root = lc;
        } else if (node.pNode) {
            if (node.pNode.lChild == node) {
                node.pNode.lChild = lc;
            } else {
                node.pNode.rChild = lc;
            }
        }
        node.pNode = lc;
    }
    //先左旋转，再右旋转
    _lrRotate(node) {
        this._lRotate(node.lChild);
        return this._rRotate(node);
    }
    //先右旋转，再左旋转
    _rlRotate(node) {
        this._rRotate(node.rChild);
        return this._lRotate(node);
    }
    /**
     * 交换两个节点
     * @param  {AVLNode} node1 
     * @param  {AVLNode} node2
     */
    _change(node1, node2) {
        var key = node1.key;
        var data = node1.data;

        node1.key = node2.key;
        node1.data = node2.data;

        node2.key = key;
        node2.data = data;
    }
    //检查并调整树
    _checkBalance(node) {
        if (node.rChild && (this._getHeight(node.rChild) - this._getHeight(node.lChild) == 2)) { //不平衡，需要调整
            var rc = node.rChild;
            if (this._getHeight(node.rChild.rChild) > this._getHeight(node.rChild.lChild)) { //左旋转
                this._lRotate(node);
            } else { //先右旋转，再左旋转
                this._rlRotate(node);
            }
            //root将变rc的子节点，需要先更新root节点的高度
            this._setHeight(node);
            this._setHeight(rc);
        } else if (node.lChild && (this._getHeight(node.lChild) - this._getHeight(node.rChild) == 2)) { //不平衡，需要调整
            var lc = node.lChild;
            if (this._getHeight(node.lChild.lChild) > this._getHeight(node.lChild.rChild)) { //右旋转
                this._rRotate(node);
            } else { //先左旋转，再右旋转
                this._lrRotate(node);
            }
            //root将变lc的子节点，需要先更新root节点的高度
            this._setHeight(node);
            this._setHeight(lc);
        }
    }
    //获取树的高度
    _getHeight(node) {
        if (!node) {
            return 0;
        }
        return node.height;
    }
    //设置树的高度
    _setHeight(node) {
        var height = Math.max(this._getHeight(node.lChild), this._getHeight(node.rChild)) + 1;
        //如果是叶子节点，不用加1
        if (!node.lChild && !node.rChild) {
            height = 0;
        }
        node.height = height;
    }
}