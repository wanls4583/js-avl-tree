//节点
class AVLNode{
	constructor(key, data){
		this.key = key;
		this.data = data;
		this.lChild = null; //左子树
		this.rChild = null; //右子树
		this.pNode = null; //父节点
		this.height = 0; //节点的高度
	}
}

//二叉平衡树
class AVLTree{
	constructor(){
		this.root = null;
	}
	//插入key
	insert(key, data){
		var node = new AVLNode(key, data);
		if(!this.root){
			this.root = node;
			return;
		}
		this._insert(this.root, node);
	}
	//删除节点
	delete(key){

	}
	//左旋转
	_lRotate(node){
		var rc = node.rChild;
		rc.pNode = node.pNode;
		node.rChild = rc.lChild;
		rc.lChild && (rc.lChild.pNode = node);
		rc.lChild = node;
		if(node == this.root){
			this.root = rc;
		}else if(node.pNode){
			if(node.pNode.lChild == node){
				node.pNode.lChild = rc;
			}else{
				node.pNode.rChild = rc;
			}
		}
		node.pNode = rc;
	}
	//右旋转
	_rRotate(node){
		var lc = node.lChild;
		lc.pNode = node.pNode;
		node.lChild = lc.rChild;
		lc.rChild && (lc.rChild.pNode = node);
		lc.rChild = node;
		if(node == this.root){
			this.root = lc;
		}else if(node.pNode){
			if(node.pNode.lChild == node){
				node.pNode.lChild = rc;
			}else{
				node.pNode.rChild = rc;
			}
		}
		node.pNode = lc;
	}
	//先左旋转，再右旋转
	_lrRotate(node){
		this._lRotate(node.lChild);
		return this._rRotate(node);
	}
	//先右旋转，再左旋转
	_rlRotate(node){
		this._rRotate(node.rChild);
		return this._lRotate(node);
	}
	//插入key
	_insert(root, node){
		if(root.key == node.key){
			return false;
		}else if(root.key > node.key){ //插入左子树
			if(root.lChild){
				if(!this._insert(root.lChild, node)){
					return false;
				}
				if(this._getHeight(root.lChild) - this._getHeight(root.rChild) == 2){ //不平衡，需要调整
					var lc = root.lChild;
					if(this._getHeight(root.lChild.lChild) > this._getHeight(root.lChild.rChild)){ //右旋转
						this._rRotate(root);
					}else{ //先左旋转，再右旋转
						this._lrRotate(root);
					}
					//root将变lc的子节点，需要先更新root节点的高度
					this._setHeight(root);
					this._setHeight(lc);
				}
			}else{
				root.lChild = node;
				node.pNode = root;
			}
		}else{ //插入右子树
			if(root.rChild){
				if(!this._insert(root.rChild, node)){
					return false;
				}
				if(this._getHeight(root.rChild) - this._getHeight(root.lChild) == 2){ //不平衡，需要调整
					var rc = root.rChild;
					if(this._getHeight(root.rChild.rChild) > this._getHeight(root.rChild.lChild)){ //左旋转
						this._lRotate(root);
					}else{ //先右旋转，再左旋转
						this._rlRotate(root);
					}
					//root将变rc的子节点，需要先更新root节点的高度
					this._setHeight(root);
					this._setHeight(rc);
				}
			}else{
				root.rChild = node;
				node.pNode = root;
			}
		}
		//更新节点的高度
		this._setHeight(root);
		return true;
	}
	_getHeight(node){
		if(!node){
			return 0;
		}
		return node.height;
	}
	_setHeight(node){
		var height = Math.max(this._getHeight(node.lChild),this._getHeight(node.rChild)) + 1;
		if(!node.lChild && !node.rChild){
			height = 0;
		}
		node.height = height;
	}
}