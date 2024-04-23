import _ from "lodash";
import TreeNode from "./TreeNode";
import { v4 as uuidv4 } from "uuid";

export default class Tree {
  root = null;
  #Node = TreeNode;

  constructor(data, Node) {
    if (Node) {
      this.#Node = Node;
    }
    this.root = new this.#Node(data);
    this.buildTree();
  }

  objectify(node = _.cloneDeep(this.root)) {
    if (
      Object.prototype.hasOwnProperty.call(node, "properties") &&
      node.properties.length
    ) {
      node.properties = node.properties.reduce((acc, node, index) => {
        const key = node.objectKey
          ? node.objectKey
          : this.#Node.buildObjectKey(node.key, index);
        acc[key] = new this.#Node({ ...node, parent: null });
        return acc;
      }, {});
      for (let property in node.properties) {
        this.objectify(node.properties[property]);
      }
    }
    return node;
  }

  buildTree(node = this.root, depth = 0) {
    if (
      Object.prototype.hasOwnProperty.call(node, "properties") &&
      node.properties.length
    ) {
      depth += 1;
      node.properties = node.properties.map(
        (item) => new this.#Node({ ...item, parent: node.key, depth })
      );
      for (let property of node.properties) {
        this.buildTree(property, depth);
      }
    }
  }

  buildDepth(node, depth) {
    if (
      Object.prototype.hasOwnProperty.call(node, "properties") &&
      node.properties.length
    ) {
      depth += 1;
      node.properties.forEach((item) => {
        item.depth = depth;
      });
      for (let property of node.properties) {
        this.buildDepth(property, depth);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (
      Object.prototype.hasOwnProperty.call(node, "properties") &&
      node.properties.length
    ) {
      for (let property of node.properties) {
        yield* this.postOrderTraversal(property);
      }
    }
    yield node;
  }

  find(key) {
    for (let node of this.postOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  insert(parentNodeKey, key, value, index) {
    for (let node of this.postOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const newNode = new this.#Node({
          key: uuidv4(),
          parent: node.key,
          value,
          depth: node.depth + 1,
          title: key,
        });

        if (isNaN(index)) {
          node.properties.push(newNode);
          return true;
        }

        node.properties.splice(index, 0, newNode);
        return true;
      }
    }
    return false;
  }
}
