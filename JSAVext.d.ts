// noinspection JSUnusedGlobalSymbols

declare module jsav {
    export interface JsavDataStructure {
        /**
         * Creates a new double linked list with the given options.
         * @param options
         */
        dlist(options?: JsavListOptions): JsavDoubleLinkList;
    }

    export interface JsavDoubleLinkList extends JsavList {
        //TODO
    }

    export interface JsavBinaryTree {
        /**
         * Inserts a value or array of values into the binary trees.
         * By default duplicates go to the left side.
         * This can be changed with option: {toRight: true}.
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

    export interface JsavBinaryTreeNode {
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

    interface JsavListNode {
        /**
         * Returns the prev node in the linked list. If no next, returns null.
         */
        prev(): JsavListNode;

        /**
         * Sets the prev node to be the passed node.
         * The optional second argument options should be an object...
         * @param node - the node to set as the prev node
         * @param options - the options to set
         */
        prev(node: JsavListNode | null, options?: LinkListNextOptions): JsavListNode;

        /**
         * Returns the JSAV Edge object that points to the prev item in the list.
         */
        edgeToPrev(): JsavEdge;
    }
}