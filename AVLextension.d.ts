/// <reference path="JSAV.d.ts" />
// noinspection JSUnusedGlobalSymbols

/** Support for AVL Trees
 * Written by Kasper Hellström
 * https://github.com/OpenDSA/OpenDSA/blob/master/DataStructures/AVLextension.js
 */
declare module jsavAvlExtension {

    import Primitive = jsav.Primitive;

    export interface JsavBinaryTree extends jsav.JsavBinaryTree {
        /**
         * Inserts a value or array of values into the binary trees.
         * By default duplicates go to the left side.
         * This can be changed with option: `{toRight: true}`.
         * @param value
         * @param options
         * @returns the node if only a value was inserted, and the tree if an array was inserted
         */
        insert(value: Primitive | Primitive[], options?: { toRight?: boolean }): JsavBinaryTreeNode;

        /**
         * Finds an unbalanced node from the tree if there is one, otherwise it undefined will be returned
         * <last> should be the last inserted value or node.
         * @param lastAddedNode - the last added node
         */
        getUnbalancedNode(lastAddedNode: JsavBinaryTreeNode): JsavBinaryTreeNode;

        /**
         * Adds empty nodes to all the nodes in the tree.
         */
        addEmptyNodes(): void;
    }

    export interface JsavBinaryTreeNode extends jsav.JsavBinaryTreeNode {
        /**
         * Adds empty nodes to all the nodes in the tree.
         */
        addEmptyNodes(): void;

        /**
         * Selects and performs a rotation on the node in attempt to balance the tree.
         * This function should be called on the unbalanced node that you can get
         */
        balance(): boolean;

        /**
         * Preforms left rotation on the node.
         */
        rotateLeft(): false;

        /**
         * Preforms right rotation on the node.
         */
        rotateRight(): false;

        /**
         * Preforms left-right rotation on the node.
         */
        rotateLR(): false;

        /**
         * Preforms right-left rotation on the node.
         */
        rotateRL(): false;
    }
}