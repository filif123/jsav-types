/// <reference path="../JSAV.d.ts" />

/**
 * Support for Stack Data Structure.
 * https://github.com/OpenDSA/OpenDSA/blob/master/DataStructures/stack.js
 **/
declare module jsavStack {
    
    export interface JsavDataStructure extends jsav.JsavDataStructure {
        /**
         * Creates a new stack with the given options.
         * @param values - the initial values to add to the stack
         * @param options - options for the stack
         * @returns the new stack
         **/
        stack(values?: jsav.Primitive[], options?: jsav.JsavListOptions): JsavStack;
    }

    export interface JsavStack extends jsav.JsavList {
        /**
         * Returns a new node that can be added to the stack.
         * @param value - the value to add to the stack
         * @param options - the options to set
         */
        newNode(value: jsav.Primitive, options?: jsav.JsavNodeOptions): JsavStackNode;
    }

    export interface JsavStackNode extends jsav.JsavListNode {
        /**
         * Sets z-index of the stack node.
         * @param index - the index to set
         * @returns old z-index
         **/
        zIndex(index: number): [number];
    }
}