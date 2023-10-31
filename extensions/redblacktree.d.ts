/// <reference path="../JSAV.d.ts" />

/**
 * Support for Red Black Tree Data Structure.
 * https://github.com/OpenDSA/OpenDSA/blob/master/DataStructures/redblacktree.js
 **/
declare module jsavRedBlackTree {
    
    export interface JsavDataStructure extends jsav.JsavDataStructure {
        /**
         * Creates a new red black tree with the given options.
         * @param element - the container to add the tree to
         * @param options - options for the tree
         * @returns the new tree
         **/
        rbtree (element: Element, options?: jsav.JsavTreeOptions): JsavRedBlackTree;
    }

    export interface JsavRedBlackTree extends jsavAvlExtension.JsavBinaryTree {
        /**
         * Returns a new node that can be added to the tree.
         * @param value - the value to add to the tree
         * @param parent - the parent of the node
         * @param options - the options to set
         */
        newNode(value: jsav.Primitive, parent?: JsavRedBlackTreeNode, options?: jsav.JsavNodeOptions): JsavRedBlackTreeNode;
    }

    export interface JsavRedBlackTreeNode extends jsav.JsavBinaryTreeNode {

        /**
         * Returns `true` if the node is red, `false` otherwise.
         * @returns `true` if the node is red, `false` otherwise.
         */
        isRed(): boolean;

        /**
         * Returns `true` if the node is black, `false` otherwise.
         * @returns `true` if the node is black, `false` otherwise.
         **/
        isBlack(): boolean;

        /**
         * Sets the node to be red.
         * @param options - the options to set
         **/
        colorRed(options?: any): void;

        /**
         * Sets the node to be black.
         * @param options - the options to set
         **/
        colorBlack(options?: any): void;

        /**
         * Toggles the color of the node.
         * @param options - the options to set
         **/
        toggleColor(options?: any): void;

        /**
         * Returns the grandpa of the node if it exists.
         * @returns the grandparent of the node.
         **/
        grandparent(): JsavRedBlackTreeNode | undefined;

        /**
         * Returns the uncle of the node if it exists.
         * @returns the uncle of the node.
         **/
        uncle(): JsavRedBlackTreeNode | undefined;

        /**
         * Changes the colors of the nodes in the tree and performs necessary rotations.
         * Should be called on the last inserted node.
         * Note: Different from balance() in AVL extension
         */
        repair(): void;

        /**
         * Performs the first case of the repair.
         **/ 
        insert_case1(): false | void;
        
        /**
         * Performs the second case of the repair.
         **/ 
        insert_case2(): false | void;

        /**
         * Performs the third case of the repair.
         **/
        insert_case3(): void;

        /**
         * Performs the fourth case of the repair.
         **/
        insert_case4(): void;

        /**
         * Performs the fifth case of the repair.
         **/
        insert_case5(): void;
    }
}