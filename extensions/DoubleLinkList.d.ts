/// <reference path="../JSAV.d.ts" />

/**
 * Doubly linked list support.
 * Written by Jun Yang
 * https://github.com/OpenDSA/OpenDSA/blob/master/DataStructures/DoubleLinkList.js
 **/
declare module jsavDoubleLinkList {
    
    export interface JsavDataStructure extends jsav.JsavDataStructure {
        /**
         * Creates a new double linked list with the given options.
         * @param options - options for the list
         * @returns the new list
         */
        dlist(options?: jsav.JsavListOptions): JsavDoubleLinkList;
    }

    export type JsavDoubleLinkList = jsav.JsavList;

    interface JsavListNode extends jsav.JsavListNode {
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
        prev(node: JsavListNode | null, options?: jsav.LinkListNextOptions): JsavListNode;

        /**
         * Returns the JSAV Edge object that points to the prev item in the list.
         */
        edgeToPrev(): jsav.JsavEdge;
    }
}