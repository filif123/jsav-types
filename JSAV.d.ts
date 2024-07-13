declare var JSAV: jsav.Jsav;

declare module jsav {
  /**
   * JSAV is a JavaScript library for creating interactive data structures and algorithms.
   */
  export interface Jsav {
    /**
     * Utility functions for JSAV.
     */
    utils: JsavUtils;
    
    /**
     * The JSAV types for extending JSAV to exposing types.
     */
    _types: JsavTypes;
    
    /**
     * The JSAV utility functions for extending JSAV.
     */
    ext: JsavExt;

    /**
     * This function can be used to "decorate" effects to be applied when moving forward in the animation.
     * @param effect - the effect to apply
     * @param undo - the undo effect
     * @returns returns a function that can be used to provide function calls that are applied later when viewing the visualization
     */
    anim(effect: Function, undo: Function): Function;

    /**
     * Creates a new JSAV instance.
     *
     * In addition to the options passed to the function, any options specified in a global variable JSAV_OPTIONS will
     * be used. Those passed on initialization always override the global options.
     * @param element - The element to use as the container for the JSAV instance.
     * @param options - Options for the JSAV instance.
     */
    new (element: string | HTMLElement | JQuery, options?: JsavInstanceOptions): JsavInstance;
  }
  
  export interface JsavExt {
    SPEED: number;
    begin(): void;
    end(): void;
    forward(): void;
    backward(): void;
    totalSteps(): number;
    currentStep(): number;
    animInfo(): { steps: number; effects: number };
    step(): void;
    clearAnimation(options?: { undo?: boolean; redo?: boolean }): void;
    displayInit(): void;
    jumpToStep(step: number): void;
    stepOption(name: string, value: any): void;
    recorded(): void;
    isAnimating(): boolean;
    _shouldAnimate(): boolean;
    disableControls(): void;
    enableControls(): void;
    logEvent(eventData: any): void;
    umsg(msg: string, options?: MessageOptions): void;
    clerumsg(): void;
    textToSpeech(speechText: string, options: JsavTextToSpeechOptions): void;
    effects: JsavEffects;
    g: JsavGraphicsFunctions;
    label(msg: string, options?: JsavLabelOptions): JsavLabel;
    ds: JsavDataStructure;
    variable(value: JsavVarType, options: VariableOptions): JsavVariable;
    pointer(name: string, target?: JsavStructure, options?: JsavPointerOptions): JsavPointer;
    code(codelines: string | string[], options?: PseudoCodeOptions): JsavPseudoCode;
    question(qtype: "TF" | "MC" | "MS", questionText: string, options?: QuestionOptions): JsavQuestion;
    resetQuestionAnswers(): void;
    exercise(modelSolution: Function, reset: Function, options: ExerciseOptions): JsavExercise;
  }
  
  export interface JsavTextToSpeechOptions {
    overrideReplacements: any[];
    replacements: any[];
    appendReplacements: any[];
    // Default: "en"
    lang: string;
  }

  export type JsavTypes = {
    ds: JsavDataStructures;
    g: JsavGraphicsTypes;
    JSAVObject: JsavObject;
    Label: JsavLabel;
    Variable: JsavVariable;
    Pointer: JsavPointer;
    Code: JsavPseudoCode;
    Exercise: JsavExercise;
  };

  export type JsavDataStructures = {
    Node: JsavNode;
    Edge: JsavEdge;
    AVArray: JsavArray;
    JSAVDataStructure: JsavDataStructure;
    ArrayIndex: JsavArrayIndex;
    Matrix: JsavMatrix;
    List: JsavList;
    ListNode: JsavListNode;
    Tree: JsavTree;
    TreeNode: JsavTreeNode;
    BinaryTree: JsavBinaryTree;
    BinaryTreeNode: JsavBinaryTreeNode;
    Graph: JsavGraph;
    GraphNode: JsavGraphNode;
  };

  /**
   * Primitive types.
   */
  export type Primitive = string | number | boolean;

  /**
   * JSAV instance options.
   */
  export interface JsavInstanceOptions {
    /**
     * Title of the AV. This will be shown as the first slide of the slideshow.
     */
    title?: string;

    /**
     * Use “none” to turn off animation (slideshow) mode.
     */
    animationMode?: string;

    /**
     * The output buffer element to use with the Messaging API.
     * The value of the option should be a DOM element, CSS selector string, or a jQuery object.
     */
    output?: string | Element | JQuery;

    /**
     * For slideshows, an object that configures text-to-speech narration,
     * which uses the [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
     * functionality of the user’s browser. If enabled, every call to umsg() will be narrated.
     */
    narration?: NarrationOptions;

    /**
     * Control whether the JSAV canvas element automatically adjusts its size based on the content.
     *
     * Defaults to true.
     */
    autoresize?: boolean;

    /**
     * Sometimes listening to the events on the body element might not be preferred.
     * To customize the way the events are handler, a function to handle all JSAV events
     * can be passed as an option to JSAV when initializing it. Name of the option is logEvent.
     * The event handler function will be passed the eventData as the first argument. For example:
     * ```js
     * var jsav = new JSAV("avcontainerid", { logEvent: function(eventData) {
     *   // here you would do something sensible with the eventData
     *   console.log(eventData);
     * }});
     * ```
     * @param eventData
     */
    logEvent?: (eventData: any) => void;

    /**
     * There is a configurable settings dialog class in JSAV.utils.Settings.
     * The settings objects can be instantiated with new JSAV.utils.Settings(elem)
     * where the optional elem parameter specifies an element on which a click will open the dialog.
     */
    settings?: JsavSettings;
  }

  export interface JsavSettings {
    /**
     * Shows the settings dialog.
     */
    show(): void;

    /**
     * Hides the settings dialog.
     */
    hide(): void;

    /**
     * Adds a component to the settings dialog.
     * Parameter varname is the unique name of the variable for this setting
     * which can be used later to get the value of the setting.
     * @param varname - The unique name of the variable for this setting.
     * @param options - Options for the setting.
     */
    add(varname: string, options: JsavSettingsOptions): void;

    /**
     * Adds a more customizable component to the settings dialog.
     * The parameter should be a function that returns a DOM element or a jQuery object.
     * @param func - A function that returns a DOM element or a jQuery object.
     */
    add(func: () => Element | JQuery): void;
  }

  export interface JsavSettingsOptions {
    /**
     * Type of the HTML element used for this setting.
     * Choices are select and valid values for the text attribute of an HTML input element (such as text, email, range).
     */
    type?: "checkbox" | "select" | "range" | "text";

    /**
     * The label displayed next to the form element of this setting.
     */
    label?: string;

    /**
     * The initial value of the setting.
     */
    value?: any;

    /**
     * Select options for the type select. This should be an object representing key-value pairs.
     * For example, "options": {"bar": "Bar layout", "array", "Array layout"} would add two choices:
     * Bar layout and Array layout.
     */
    [key: string]: any;
  }

  /**
   * Narration options.
   */
  export interface NarrationOptions {
    /**
     * A boolean specifying whether a button should be displayed that will allow the user to
     * turn on/off narration for the slideshow.
     *
     * Default is `false`.
     */
    enabled?: boolean;

    /**
     * An array of objects that specify certain patterns that should be replaced in the text
     * before it is given to the SpeechSynthesis API. Each object should have the format:
     * ```json
     * searchValue: <regexp or substring>,
     * replaceValue: <replacement substring, or function>
     * ```
     * The values specified by searchValue and replaceValue will be passed as arguments to
     * [String.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).
     * These replacements will be appended to the global list of replacements defined by JSAV_OPTIONS.narration.replacements.
     */
    appendReplacements: any[];

    /**
     * Same as appendReplacements, except these replacements will override
     * the global list of replacements defined by JSAV_OPTIONS.narration.replacements.
     */
    overrideReplacements: any[];
  }

  /**
   * JSAV instance.
   */
  export interface JsavInstance {
    /**
     * This field is an object that contains all the JSAV data structures.
     */
    ds: JsavDataStructure;

    /**
     * This field is an object that contains all the JSAV graphics primitives.
     */
    g: JsavGraphics;

    /**
     * This field is an object that contains all the JSAV animations.
     */
    effects: JsavEffects;

    /**
     * Translate function.
     * @param key - the key to translate
     */
    _translate: (key: string) => void;

    /**
     * Gets current speed of the AV.
     */
    SPEED: number;

    /**
     * Gets container element of the AV.
     */
    container: JQuery;

    /**
     * This is a method of the AV object. It creates a pointer that points to some JSAV object.
     * Parameter name is the (initial) name for the pointer.
     *
     * Note: If you do not see the pointer arrow,
     * it might be that the pointer is positioned outside the JSAV canvas and thus is not visible.
     * Moving the target structure down should fix the issue.
     * @param name - the name of the pointer
     * @param target - the target structure for the pointer
     * @param options - options for the pointer
     */
    pointer(name: string, target?: JsavStructure, options?: JsavPointerOptions): JsavPointer;

    /**
     * This is a method of the JSAV object.
     * It creates a label that is associated with some UI element of the AV specified by the options.
     * @param msg - (initial) value for the label.
     * @param options - options for the label.
     */
    label(msg: string, options?: JsavLabelOptions): JsavLabel;

    /**
     * This is a method of the AV object.
     * It creates a variable that can be associated with some UI element.
     * @param value - (initial) value for the variable.
     * @param options - options for the variable.
     */
    variable(value: JsavVarType, options: VariableOptions): JsavVariable;

    /**
     * Creates a new JSAV psedocode instance.
     * It takes either an array or a string to be used as the lines of code.
     * If a string is passed, it will be split on newline characters (\n) to get the codelines.
     * @param codelines - the lines of code
     * @param options - options for the code
     */
    code(codelines: string | string[], options?: PseudoCodeOptions): JsavPseudoCode;

    /**
     * Creates a new JSAV psedocode instance.
     * @param options - options for the code
     */
    code(options?: PseudoCodeOptions): JsavPseudoCode;

    /**
     * An exercise is initialized with a call to av.exercise(..). The parameters for the function are:
     * @param modelSolution - The function to generate the model solution.
     * The function has to return the data structures and/or variables used
     * in grading of the exercise. The return value can be a single data structure or an array of structures.
     * @param reset - The initialization function that resets the exercise.
     * The function has to return the data structures and/or variables used
     * in grading of the exercise. The return value can be a single data structure or an array of structures.
     * @param options
     */
    exercise(modelSolution: Function, reset: Function, options: ExerciseOptions): JsavExercise;

    /**
     * This is a method of the AV object. It initializes an interactive question of the given type (qtype).
     * @param qtype - The type of the question.
     * * TF for a true-false type question,
     * * MC for a multiple-choice question,
     * * MS for a multiple-selection question.
     * @param questionText - actual question shown to a student
     * @param options - ONLY for the question type TF.
     */
    question(qtype: "TF" | "MC" | "MS", questionText: string, options?: QuestionOptions): JsavQuestion;

    /**
     * AVs can log events on student actions using this function.
     * The eventData can be any data describing the event.
     * If it is an object, properties tstamp and av will be automatically added to it to
     * mark the current time and the ID of the AV.
     *
     * For example:
     * ```js
     * jsav.logEvent({type: "jsav-heap-decrement", newSize: bh.heapsize()});
     * ```
     * @param eventData - the event data
     */
    logEvent(eventData: any): void;

    /**
     * Marks that a new step in the animation will start.
     * Basically, everything within one step will be animated simultaneously when moving backward and forward.
     * @returns  A JSAV object. Thus, this method may be chained with, for example, the umsg method.
     */
    step(): JsavInstance;

    /**
     * Function to the modelanswer jsav instance.
     */
    gradeableStep(): void;

    /**
     * Forwards the slideshow to the next step.
     */
    forward(fun?: () => boolean): void;

    /**
     * Backwards the slideshow to the previous step.
     */
    backward(fun?: () => boolean): void;

    /**
     * This method is used to go to the start of the slideshow.
     */
    begin(): void;

    /**
     * This method is used to go to the end of the slideshow.
     */
    end(): void;

    /**
     * Gets total number of steps in the slideshow.
     */
    totalSteps(): number;

    /**
     * Gets current step in the slideshow.
     */
    currentStep(): number;

    /**
     * A call to this method is placed at the end of the series of .step() method calls to start the slideshow.
     */
    recorded(): void;

    /**
     * Marks the current state of the visualization as the state where the animation will start.
     * That is, what will be displayed initially.
     * @returns A JSAV object. Thus, this method may be chained.
     */
    displayInit(): JsavInstance;

    /**
     * This will return an object that has two properties: number of slides and and number of effects.
     * It might be better used when called from somewhere like the FireBug command line than in an actual
     * AV implementation. It can help a developer to optimize the complexity of the slideshow.
     */
    animInfo(): { steps: number; effects: number };

    /**
     * Add the given message msg to the message output.
     * The optional options parameter can be an object whose properties specify the behavior.
     * @param msg - the message to display
     * @param options - options for the message
     */
    umsg(msg: string, options?: MessageOptions): JsavInstance;

    /**
     * Clear the contents of the output message buffer.
     */
    clerumsg(): JsavInstance;

    /**
     * Clears the undo and redo stacks.
     */
    clearAnimation(options?: { undo?: boolean; redo?: boolean }): void;
  }

  export interface QuestionOptions {
    /**
     * The label shown for true option. Only for type TF.
     *
     * Default value True.
     */
    trueLabel?: string;

    /**
     * The label shown for false option. Only for type TF.
     *
     * Default value False.
     */
    falseLabel?: string;

    /**
     * The correct answer, true or false.
     */
    correct?: boolean;
  }

  export interface ExerciseOptions {
    /**
     * Specifies which properties to compare for the structures.
     * In the example below, we set the comparison to be CSS property background-color
     * so grading would check if the structures have same background color (that is, if they are highlighted).
     */
    compare: any | Array<any>;

    /**
     * Will change the feedback mode, possible values continuous and atend (default).
     * See Continuous feedback.
     */
    feedback?: "continuous" | "atend";

    /**
     * Change the behavior in continuous mode.
     * Possible values are undo and fix.
     * The default is undo.
     */
    fixmode?: "undo" | "fix" | "none";

    /**
     * The grader function is used to compare the model solution to the student’s solution.
     */
    grader?: "default" | "finder" | "finalStep" | Function

    /**
     * The settings dialog will not, by default, allow student to change the feedback mode.
     * Setting this option to true enables this choice.
     */
    feedbackSelectable?: boolean;

    /**
     * The settings dialog will not, by default, allow student to change the behavior in continuous feedback mode.
     * Setting this option to true enables this choice.
     */
    fixmodeSelectable?: boolean;

    /**
     *  A function that will fix the student’s solution to match the current step in model solution.
     *  Before this function is called, the previous incorrect step in student’s solution is undone.
     *  The function gets the model structures as a parameter.
     *  For an example, see the examples/ShellsortProficiency.html.
     */
    fix?: Function;

    /**
     * A function that can be used to customize the way the grade is shown.
     * The function will be added to the exercise and can be called with exercise.showGrade.
     * The function can access the grade information from attribute this.score.
     * Example content of that attribute:
     * ```js
     * {total: 15, correct: 3, undo: 0, fix: 0, student: 5}
     * ```
     * Total is the total number of steps in the model solution,
     * student the number of steps in student solution, and correct the number of correct steps.
     * Values undo and fix show how many steps were undone/fixed in the continuous feedback mode.
     *
     * Note, that to make sure the grading is up to date, this function should call the
     * grade function of the exercise before showing the grade.
     */
    showGrade?: Function;

    /**
     * An object that can specify options for the model answer dialog.
     * For the possible options, see the documentation for the JSAV.utils.dialog.
     */
    modelDialog?: any;

    /**
     * An HTML element inside which the control buttons (reset, undo etc.) are added.
     */
    controls?: HTMLElement | JQuery;

    /**
     * If true, print out some debug information for exercise developers.
     * Mainly, the continuous feedback mode will log possible errors in the fix function.
     */
    debug?: boolean;

    /**
     * Change the text on the reset button.
     *
     * Defaults to “Reset”.
     */
    resetButtonTitle?: string;

    /**
     * Change the text on the undo button.
     *
     * Defaults to “Undo”.
     */
    undoButtonTitle?: string;

    /**
     * Change the text on the model answer button.
     *
     * Defaults to “Model Answer”.
     */
    modelButtonTitle?: string;

    /**
     * Change the text on the grade button. Defaults to “Grade”.
     */
    gradeButtonTitle?: string;
  }

  export interface MessageOptions {
    /**
     * Sets the color of the message
     */
    color?: string;

    /**
     * When “line-style” message buffer is used, option "preserve": true
     * can be used to append the new message after the previous one instead of clearing the buffer.
     */
    preserve?: boolean;

    /**
     * The option fill: <object> can be used to easily insert variable values to the message.
     * This feature is especially useful when the AV is being translated to different languages.
     * The message should contain a tag surrounded by curly brackets where the value should be inserted.
     * The object handed to the fill option should map the different tags used in the message to their values.
     * The tags are replaced with regular expression, which means that the tags should not contain characters
     * such as $ ^ . + -, or consist only of digits.
     */
    fill?: any;
  }

  /**
   * Options for the pseudo code.
   */
  export interface PseudoCodeOptions extends JsavOptions {
    /**
     * A URL where the code should be fetched. The fetched text will be split on newline characters (\n).
     *
     * Note, that if the codelines parameter is given, this option is ignored.
     * Also, same-origin policies in browsers might prevent this from working across domains.
     */
    url?: string;

    /**
     * Enables referring to lines with strings. The JavaScript object should map strings to either
     * line numbers or arrays of line numbers.
     *
     * For instance if the tags are defined with the object `{hello: 5}`,
     * it means that .highlight("hello") will be equivalent to .highlight(5).
     */
    tags?: JsavTag;

    /**
     * Determine whether linenumbers should be shown.
     *
     * Defaults to true.
     */
    lineNumbers?: boolean;

    /**
     * Add the pseudocode before element UI element.
     */
    before?: JQuery | HTMLElement;

    /**
     * Add the pseudocode inside element UI element.
     */
    insertInside?: JQuery | HTMLElement;

    /**
     * Add the pseudocode after element UI element.
     */
    after?: JQuery | HTMLElement;

    /**
     * Only the content after the last occurrence of the specified text will be included.
     * Only applied if the url parameter is also provided.
     */
    startAfter?: string;

    /**
     * Only the content before the first occurrence of the specified text will be included.
     * Only applied if the url parameter is also provided.
     */
    endBefore?: string;

    /**
     * Whether the code should be escaped when it is inserted into the DOM.
     */
    htmlEscape?: boolean;
  }

  export interface VariableOptions extends JsavOptions {
    /**
     * Add the variable before element UI element.
     */
    before?: JQuery | HTMLElement;

    /**
     * Add the variable after element UI element.
     */
    after?: JQuery | HTMLElement;

    /**
     * Name of the variable. Can be used to fetch the variable value later.
     */
    name?: string;

    /**
     * Label for the variable. Will be shown before the variable value.
     * For example, label “Count =” would end up the variable looking like “Count = 3” in the HTML.
     */
    label?: string;

    /**
     * Type of the variable. Can be boolean, number, or string.
     * By default, the type is decided based on the type of the initial value.
     */
    type?: "boolean" | "number" | "string";
  }
  
  export interface JsavGraphicsFunctions {
    circle(cx: number, cy: number, r: number, properties?: { [index: string]: string | number | boolean }): JsavGCircle;
    rect(x: number, y: number, width: number, height: number, properties?: { [index: string]: string | number | boolean }): JsavGRect;
    line(x1: number, y1: number, x2: number, y2: number, properties?: { [index: string]: string | number | boolean }): JsavGLine;
    ellipse(cx: number, cy: number, rx: number, ry: number, properties?: { [index: string]: string | number | boolean }): JsavGEllipse;
    polyline(points: number[], properties?: { [index: string]: string | number | boolean }): JsavGPolyline;
    polygon(points: number[], properties?: { [index: string]: string | number | boolean }): JsavGPolygon;
    path(pathString: string, properties?: { [index: string]: string | number | boolean }): JsavGPath;
    set(properties?: { [index: string]: string | number | boolean }): JsavGSet;
  }
  
  export interface JsavGraphicsTypes {
    JSAVGraphical: JsavGShape;
    Circle: JsavGCircle;
    Rect: JsavGRect;
    Ellipse: JsavGEllipse;
    Line: JsavGLine;
    Polygon: JsavGPolygon;
    Polyline: JsavGPolyline;
    Path: JsavGPath;
    Set: JsavGSet;
  }

  /**
   * JSAV graphics.
   */
  export interface JsavGraphics {
    circle: JsavGCircle;
    ellipse: JsavGEllipse;
    line: JsavGLine;
    polygon: JsavGPolygon;
    polyline: JsavGPolyline;
    path: JsavGPath;
    rect: JsavGRect;

    /**
     * Creates a new set, which can be used to combine and then manipulate multiple
     * graphical primitives at the same time.
     *
     * Note, that many things like changing the style for the group won’t work.
     * Instead, they just silently fail.
     */
    set(): any;

    /**
     * Adds the given obj graphical primitive to the set.
     * @param obj - the graphical primitive to add
     */
    push(obj: JsavGShape): void;
  }

  export interface JsavGShape {
    /**
     * Make the shape visible. Essentially the same as calling `.css({opacity: 1})`.
     */
    show(): void;

    /**
     * Make the shape invisible. Essentially the same as calling `.css({opacity: 0})`.
     */
    hide(): void;

    /**
     * Return true if the shape is visible, false if hidden.
     */
    isVisible(): boolean;

    /**
     * Rotates the object by the given amount of degrees around the center of the shape.
     * @param deg - the amount of degrees to rotate
     */
    rotate(deg: number): void;

    /**
     * Scales the object by given amount. The shortcuts for X/Y scaling only are the same as calling .scale(sx, 0) and .scale(0, sy)
     * @param sx - the amount to scale in X direction
     * @param sy - the amount to scale in Y direction
     */
    scale(sx: number, sy: number): void;

    /**
     * Scales the object by given amount in X direction.
     * @param sx - the amount to scale in X direction
     */
    scaleX(sx: number): void;

    /**
     * Scales the object by given amount in Y direction.
     * @param sy - the amount to scale in Y direction
     */
    scaleY(sy: number): void;

    /**
     * Translates the shape by the given amount.
     * X/Y versions are shortcuts to the main translation function.
     * @param dx - the amount to translate in X direction
     * @param dy - the amount to translate in Y direction
     */
    translate(dx: number, dy: number): void;

    /**
     * Translates the shape by the given amount in X direction.
     * @param dx - the amount to translate in X direction
     */
    translateX(dx: number): void;

    /**
     * Translates the shape by the given amount in Y direction.
     * @param dy - the amount to translate in Y direction
     */
    translateY(dy: number): void;

    /**
     * Returns the value of the attribute with the name propname
     * @param propname - the name of the attribute
     */
    css(propname: string): string;

    /**
     * Like the .css functions of the other JSAV objects, these can be used to animate attributes of the shape.
     * Technically, what is changed is not CSS properties but attributes of the SVG
     * element visualizing the shape. For a list of valid values
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param propname - the name of the attribute
     * @param value - the value of the attribute
     */
    css(propname: string, value: string): void;

    /**
     * Like the .css functions of the other JSAV objects, these can be used to animate attributes of the shape.
     * Technically, what is changed is not CSS properties but attributes of the SVG
     * element visualizing the shape. For a list of valid values
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param propsObj - the object containing the attributes to change
     */
    css(propsObj: { [index: string]: Primitive }): void;

    /// EVENTS

    /**
     * Adds a handler to be called when the shape is clicked.
     * @param handler - the handler to be called when the shape is clicked
     * @param options - options for the click
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    click(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Adds a handler to be called when the shape is double-clicked.
     * @param handler - the handler to be called when the shape is double-clicked
     * @param options - options for the double-click
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    dblclick(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Adds a handler to be called when mouse is pressed down on the shape.
     * @param handler - the handler to be called when the shape is right-clicked
     * @param options - options for the right-click
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    mousedown(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Adds a handler to be called when mouse is released on the list.
     * @param handler - the handler to be called when the mouse is released on the shape
     * @param options - options for the mouseup
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    mouseup(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Adds a handler to be called when mouse is moved over the shape.
     * @param handler - the handler to be called when the mouse is moved over the shape
     * @param options - options for the mousemove
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    mousemove(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Adds a handler to be called when mouse enters the list.
     * @param handler - the handler to be called when the mouse enters the shape
     * @param options - options for the mouseenter event
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    mouseenter(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Adds a handler to be called when mouse leaves the shape.
     * @param handler - the handler to be called when the mouse leaves the shape
     * @param options - options for the mouseleave event
     * @returns a JSAV shape object. Thus, this method can be chained.
     */
    mouseleave(handler: (event: any) => void, options?: any): JsavGShape;

    /**
     * Bind an event handler to the structure.
     * It takes as the first parameter the name of the event.
     * Multiple events can be bound by separating their names with spaces.
     * Other parameters are the same as for the shortcuts.
     * @param event - The name of the event.
     * @param data - Additional data to pass to the handler.
     * @param handler - The handler function.
     */
    on(event: string, data: any[], handler: (event: Event) => void): void;
  }

  export interface JsavGCircle extends JsavGShape {
    /**
     * Initializes a new circle with the given center and radius.
     * Optional parameter properties,if given, should be an object with key-value pairs.
     * See raphael.attr for valid keys and values.
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param cx - the x coordinate of the center of the circle
     * @param cy - the y coordinate of the center of the circle
     * @param r - the radius of the circle
     * @param properties - the properties of the circle
     */
    circle(cx: number, cy: number, r: number, properties?: { [index: string]: string | number | boolean }): JsavGCircle;

    /**
     * Gets or sets the center of the circle.
     * The center is returned as an object with properties cx and cy.
     * @param cx - the x coordinate of the center of the circle
     * @param cy - the y coordinate of the center of the circle
     * @returns the center of the circle
     */
    center(cx?: number, cy?: number): { cx: number; cy: number };

    /**
     * Gets or sets the radius of the circle.
     * @param r - the radius of the circle
     * @returns the radius of the circle
     */
    radius(r?: number): number;
  }

  export interface JsavGEllipse extends JsavGShape {
    /**
     * Initializes a new ellipse with the given center and x and y radius.
     * Optional parameter properties,if given, should be an object with key-value pairs.
     * See raphael.attr for valid keys and values.
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param cx - the x coordinate of the center of the ellipse
     * @param cy - the y coordinate of the center of the ellipse
     * @param rx - the x radius of the ellipse
     * @param ry - the y radius of the ellipse
     * @param properties - the properties of the circle
     */
    ellipse(
        cx: number,
        cy: number,
        rx: number,
        ry: number,
        properties?: { [index: string]: string | number | boolean }
    ): JsavGEllipse;

    /**
     * Gets or sets the center of the ellipse.
     * The center is returned as an object with properties cx and cy.
     * @param cx - the x coordinate of the center of the ellipse
     * @param cy - the y coordinate of the center of the ellipse
     * @returns the center of the ellipse
     */
    center(cx?: number, cy?: number): { cx: number; cy: number };

    /**
     * Gets or sets the radius of the ellipse.
     * The radius is returned as an object with properties rx and ry.
     * @param rx - the radius of the ellipse
     * @param ry - the radius of the ellipse
     * @returns the radius of the ellipse
     */
    radius(rx?: number, ry?: number): { rx: number; ry: number };
  }

  export interface JsavGLine extends JsavGShape {
    /**
     * Initializes a line from point x1, y1 to x2, y2.
     * Optional parameter properties,if given, should be an object with key-value pairs.
     * See raphael.attr for valid keys and values.
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param x1 - the x coordinate of the first point
     * @param y1 - the y coordinate of the first point
     * @param x2 - the x coordinate of the second point
     * @param y2 - the y coordinate of the second point
     * @param properties - the properties of the line
     */
    line(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        properties?: { [index: string]: string | number | boolean }
    ): JsavGLine;

    /**
     * Translates the given point in the (poly)line by the given amount of pixels.
     * The point is a zero-indexed list of points used to initialize the polyline.
     * For line, start point is index 0 and endpoint index 1.
     * @param point - the point to translate
     * @param dx - the amount of pixels to translate the point in the x direction
     * @param dy - the amount of pixels to translate the point in the y direction
     */
    translatePoint(point: JsavGPoint, dx: number, dy: number): JsavGPoint;

    /**
     * Moves the given points to the given pixel positions.
     * Parameter points should be an array of arrays with each item specifying point, px, and py.
     * @param points
     */
    movePoints(points: JsavGPoint[]): void;

    /**
     * Moves the given points to the given pixel positions.
     * @param newx1 - the new x coordinate of the first point
     * @param newy1 - the new y coordinate of the first point
     * @param newx2 - the new x coordinate of the second point
     * @param newy2 - the new y coordinate of the second point
     */
    movePoints(newx1: number, newy1: number, newx2: number, newy2: number): void;

    /**
     * Returns the points of the line as an array of arrays.
     */
    points(): JsavGPoint[];
  }

  export interface JsavGPolyline extends JsavGShape {
    /**
     * Initializes a new polyline with the given points.
     * Optional parameter properties, if given, should be an object with key-value pairs.
     * See raphael.attr for valid keys and values.
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param points - the points of the polyline
     * @param properties - the properties of the polyline
     */
    polyline(points: JsavGPoint[], properties?: { [index: string]: string | number | boolean }): JsavGPolyline;

    /**
     * Translates the given point in the (poly)line by the given amount of pixels.
     * The point is a zero-indexed list of points used to initialize the polyline.
     * For line, start point is index 0 and endpoint index 1.
     * @param point - the point to translate
     * @param dx - the amount of pixels to translate the point in the x direction
     * @param dy - the amount of pixels to translate the point in the y direction
     */
    translatePoint(point: JsavGPoint, dx: number, dy: number): JsavGPolyline;

    /**
     * Moves the given points to the given pixel positions.
     * Parameter points should be an array of arrays with each item specifying point, px, and py.
     * @param points
     */
    movePoints(points: JsavGPoint[]): void;

    /**
     * Returns the points of the line as an array of arrays.
     */
    points(): JsavGPoint[];
  }

  export interface JsavGPolygon extends JsavGShape {
    /**
     * Initializes a new polygon with the given points.
     * Optional parameter properties, if given, should be an object with key-value pairs.
     * See raphael.attr for valid keys and values.
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param points - the points of the polygon
     * @param properties - the properties of the polygon
     */
    polygon(points: JsavGPoint[], properties?: { [index: string]: string | number | boolean }): JsavGPolygon;

    /**
     * Translates the given point in the (poly)line by the given amount of pixels.
     * The point is a zero-indexed list of points used to initialize the polyline.
     * For line, start point is index 0 and endpoint index 1.
     * @param point - the point to translate
     * @param dx - the amount of pixels to translate the point in the x direction
     * @param dy - the amount of pixels to translate the point in the y direction
     */
    translatePoint(point: JsavGPoint, dx: number, dy: number): JsavGPolygon;

    /**
     * Moves the given points to the given pixel positions.
     * Parameter points should be an array of arrays with each item specifying point, px, and py.
     * @param points
     */
    movePoints(points: JsavGPoint[]): void;

    /**
     * Returns the points of the line as an array of arrays.
     */
    points(): JsavGPoint[];
  }

  export type JsavGPoint = [number, number];
  export interface JsavGSet extends JsavGShape {
    /**
     * Adds a new entry to the set, which can be used to combine and then manipulate multiple
     * graphical primitives at the same time.
     * @param obj - the graphical primitive to add to the set
     */
    push(obj: JsavGShape): void;
  }

  export interface JsavGPath extends JsavGShape {
    /**
     * Initializes a new path element with the given path.
     * The path should be defined according to the SVG path string format.
     * @see http://www.w3.org/TR/SVG/paths.html#PathData
     * @param path - the path of the path element
     * @param properties - the properties of the path
     */
    path(path: string, properties?: { [index: string]: string | number | boolean }): JsavGPath;

    /**
     * Returns the current path of the object.
     */
    path(): string;

    /**
     * Animates the objects path to the newPath.
     * @param newPath - the new path of the object
     */
    path(newPath: string): JsavGPath;
  }

  export interface JsavGRect extends JsavGShape {
    /**
     * Initializes a new rectangle with upper left corner at x, y and given width and height.
     * Optional parameter r can be used to specify the roundness of corners.
     * Optional parameter properties, if given, should be an object with key-value pairs.
     * See raphael.attr for valid keys and values.
     * @see http://raphaeljs.com/reference.html#Element.attr
     * @param x - the x coordinate of the upper left corner of the rectangle
     * @param y - the y coordinate of the upper left corner of the rectangle
     * @param w - the width of the rectangle
     * @param h - the height of the rectangle
     * @param r - the roundness of the corners of the rectangle
     * @param properties - the properties of the rectangle
     */
    rect(
        x: number,
        y: number,
        w: number,
        h: number,
        r?: number,
        properties?: { [index: string]: string | number | boolean }
    ): JsavGRect;

    /**
     * Gets or sets the width of the rectangle.
     * @param w - the width of the rectangle
     */
    width(w?: number): number;

    /**
     * Gets or sets the height of the rectangle.
     * @param h - the height of the rectangle
     */
    height(h?: number): number;
  }

  /**
   * Unit length for JSAV.
   */
  export type UnitLength = number | string;

  export interface JsavEffects {
    /**
     * Moves value at fromIndex in fromArray to toIndex in toArray.
     * The value in fromIndex will be an empty string after this operation.
     * @param fromArray - the array to move the value from
     * @param fromIndex - the index of the value to move
     * @param toArray - the array to move the value to
     * @param toIndex - the index to move the value to
     */
    moveValue(fromArray: JsavArray, fromIndex: number, toArray: JsavArray, toIndex: number): void;

    /**
     * Moves value at fromIndex in fromArray to toNode. The value in fromIndex will be an empty string after this operation.
     * @param fromArray - the array to move the value from
     * @param fromIndex - the index of the value to move
     * @param toNode - the node to move the value to
     */
    moveValue(fromArray: JsavArray, fromIndex: number, toNode: JsavNode | JsavVariable): void;

    /**
     * Moves value in fromNode to toIndex in toArray. The value in fromNode will be an empty string after this operation.
     * @param fromNode - the node to move the value from
     * @param toArray - the array to move the value to
     * @param toIndex - the index to move the value to
     */
    moveValue(fromNode: JsavNode | JsavVariable, toArray: JsavArray, toIndex: number): void;

    /**
     * Moves value in fromNode to toNode. The value in fromNode will be an empty string after this operation.
     * @param fromNode - the node to move the value from
     * @param toNode - the node to move the value to
     */
    moveValue(fromNode: JsavNode | JsavVariable, toNode: JsavNode | JsavVariable): void;

    /**
     * Copies value at fromIndex in fromArray to toIndex in toArray.
     * @param fromArray - the array to copy the value from
     * @param fromIndex - the index of the value to copy
     * @param toArray - the array to copy the value to
     * @param toIndex - the index to copy the value to
     */
    copyValue(fromArray: JsavArray, fromIndex: number, toArray: JsavArray, toIndex: number): void;

    /**
     * Copies value at fromIndex in fromArray to toNode.
     * @param fromArray - the array to copy the value from
     * @param fromIndex - the index of the value to copy
     * @param toNode - the node to copy the value to
     */
    copyValue(fromArray: JsavArray, fromIndex: number, toNode: JsavNode | JsavVariable): void;

    /**
     * Copies value in fromNode to toIndex in toArray.
     * @param fromNode - the node to copy the value from
     * @param toArray - the array to copy the value to
     * @param toIndex - the index to copy the value to
     */
    copyValue(fromNode: JsavNode | JsavVariable, toArray: JsavArray, toIndex: number): void;

    /**
     * Copies value in fromNode to toNode.
     * @param fromNode - the node to copy the value from
     * @param toNode - the node to copy the value to
     */
    copyValue(fromNode: JsavNode | JsavVariable, toNode: JsavNode | JsavVariable): void;

    /**
     * Swaps value at fromIndex in fromArray to toIndex in toArray.
     * @param fromArray - the array to swap the value from
     * @param fromIndex - the index of the value to swap
     * @param toArray - the array to swap the value to
     * @param toIndex - the index to swap the value to
     */
    swapValue(fromArray: JsavArray, fromIndex: number, toArray: JsavArray, toIndex: number): void;

    /**
     * Swaps value at fromIndex in fromArray to toNode.
     * @param fromArray - the array to swap the value from
     * @param fromIndex - the index of the value to swap
     * @param toNode - the node to swap the value to
     */
    swapValue(fromArray: JsavArray, fromIndex: number, toNode: JsavNode | JsavVariable): void;

    /**
     * Swaps value in fromNode to toIndex in toArray.
     * @param fromNode - the node to swap the value from
     * @param toArray - the array to swap the value to
     * @param toIndex - the index to swap the value to
     */
    swapValue(fromNode: JsavNode | JsavVariable, toArray: JsavArray, toIndex: number): void;

    /**
     * Swaps value in fromNode to toNode.
     * @param fromNode - the node to swap the value from
     * @param toNode - the node to swap the value to
     */
    swapValue(fromNode: JsavNode | JsavVariable, toNode: JsavNode | JsavVariable): void;
  }

  /**
   * JSAV data structures.
   */
  export interface JsavDataStructure {
    /**
     * Creates a new array.
     * @param element - the DOM element to create the array in
     * @param options - the options for the array
     */
    array(element: Element, options?: JsavArrayOptions): JsavArray;

    /**
     * Creates a new array.
     * @param values - the initial values for the array
     * @param options - the options for the array
     */
    array(values?: any[], options?: JsavArrayOptions): JsavArray;

    /**
     * Creates a new graph.
     * @param options - the options for the graph
     */
    graph(options?: JsavGraphOptions): JsavGraph;

    /**
     * Creates a new list.
     * @param options - the options for the list
     */
    list(options?: JsavListOptions): JsavList;

    /**
     * Creates a new matrix.
     * @param rows - the number of rows in the matrix
     * @param cols - the number of columns in the matrix
     * @param options - the options for the matrix
     */
    matrix(rows: number, cols: number, options?: JsavMatrixOptions): JsavMatrix;

    /**
     * Creates a new matrix.
     * @param data - the initial data for the matrix
     * @param options - the options for the matrix
     */
    matrix(data: any[][], options?: JsavMatrixOptions): JsavMatrix;

    /**
     * Creates a new tree.
     * @param options - the options for the tree
     */
    tree(options?: JsavTreeOptions): JsavTree;

    /**
     * Creates a new binary tree.
     * @param options - the options for the binary tree
     */
    binarytree(options?: JsavTreeOptions): JsavBinaryTree;

    /**
     * Creates a new edge.
     * @param options
     */
    edge(options?: JsavEdgeOptions): JsavEdge;
  }
  
  export interface JsavObject {
    id(newId?: string): string;
    bounds(recalculate?: boolean, options?: any): any;
    position(): { left: number; top: number };
    isVisible(): boolean;
    clear(): void;
    _animateTranslate(dx: number, dy: number, options?: any): void;
    translate(dx: number, dy: number, options?: any): void;
    translateX(dx: number, options?: any): void;
    translateY(dy: number, options?: any): void;
    moveTo(newLeft: number, newTop: number, options?: any): void;
    _registerMoveListener(listener: (dx: number, dy: number) => void): void;
    _unregisterMoveListener(listener: (dx: number, dy: number) => void): void;
  }

  /**
   * Base class for all JSAV structures.
   */
  export interface JsavStructure extends Function {
    /**
     * Removes the DOM element of this structure from the document.
     * This is useful, for example, in re-initializing exercises when
     * the existing structure needs to be removed.
     */
    clear(): void;

    /**
     * Create and return a clone of an structure.
     * The clone will remain invisible until the show method is called on it.
     */
    clone(): JsavStructure;

    /**
     * Show the object if it isn’t visible already.
     */
    show(): void;

    /**
     * Hide the object if it isn’t hidden already.
     */
    hide(): void;

    /**
     * Returns true if this edge is visible, false if hidden.
     */
    isVisible(): boolean;

    /**
     * Compare this structure to another structure.
     * @param other - The structure to compare to.
     */
    equals(other: JsavStructure): boolean;

    /**
     * Adds the CSS class className to the node and animates the changes.
     * @param className
     * @param options
     */
    addClass(className: string, options?: any): void;

    /**
     * Removes the CSS class className from the node and animates the changes.
     * @param className
     * @param options
     */
    removeClass(className: string, options?: any): void;

    /**
     * Toggles the CSS class className on the node and animates the changes.
     * @param className
     * @param options
     */
    toggleClass(className: string, options?: any): void;

    /**
     * Returns true if the node has the CSS class className, false otherwise.
     * @param className
     */
    hasClass(className: string): boolean;

    /**
     * Returns the ID of the structure. If optional parameter
     * newId is given, sets the ID of the structure.
     * The given ID should be unique.
     * @param newId - The new identifier.
     */
    id(newId?: string): string;

    /**
     * Recalculate the layout of the structure.
     * @param options - The options to set.
     */
    layout?(options?: any): void;

    /**
     * Returns or recalculates the bounding box of the structure.
     * @param recalculate - Whether to recalculate the bounds.
     * @param options - The options to set.
     */
    bounds(recalculate?: boolean, options?: any): any;

    /**
     * Returns the value of the CSS property cssPropertyName for this node.
     * @param cssPropertyName
     * @param value
     * @param options
     */
    css(cssPropertyName: string, value?: string, options?: { [index: string]: Primitive }): string;

    /**
     * Sets the CSS properties in the props object for this node.
     * @param props - The properties to set.
     * @param options - The options to set.
     */
    css(props: { [index: string]: Primitive }, options?: { [index: string]: Primitive }): void;

    /// EVENTS

    /**
     * Bind an event handler to the structure.
     * It takes as the first parameter the name of the event.
     * Multiple events can be bound by separating their names with spaces.
     * Other parameters are the same as for the shortcuts.
     * @param event - The name of the event.
     * @param data - Additional data to pass to the handler.
     * @param handler - The handler function.
     */
    on(event: string, data: any[], handler: (event: Event) => void): void;

    element: Element;
  }

  /**
   * Options for JSAV structures.
   */
  export interface JsavOptions {
    /**
     * Determine whether the object is visible on creation. Defaults to true.
     */
    visible?: boolean;

    /**
     * The DOM element inside which the JSAV object’s elements should be added.
     * This should be either a DOM Element or a jQuery object for a single element.
     */
    element?: Element;

    /**
     * Boolean to determine if the object should be automatically centered within its container. Defaults to true.
     */
    center?: boolean;

    /**
     * Values to determine the absolute position of the object within its container.
     */
    left?: UnitLength;

    /**
     * Values to determine the absolute position of the object within its container.
     */
    top?: UnitLength;

    /**
     * Values to determine the absolute position of the object within its container.
     */
    right?: UnitLength;

    /**
     * Values to determine the absolute position of the object within its container.
     */
    bottom?: UnitLength;

    /**
     * A JSAV data structure object or DOM element that this object should be positioned relative to.
     * If this option is specified, left and top options will change structure’s position relative
     * to the relativeTo element. Note, that the element pointed by relativeTo needs to be visible.
     */
    relativeTo?: JsavStructure | Element;

    /**
     * Defines which position on the element being positioned to align with the target element.
     * Should be in format horizontal vertical. Possible horizontal values are “left”, “center”, “right”
     * and vertical values “top”, “center”, “bottom”. Defaults to center center. Only has an effect if
     * relativeTo is specified.
     */
    anchor?: JsavAnchor;

    /**
     *  Similar to anchor, but the position on this element. Defaults to center center.
     *  Only has an effect if relativeTo is specified.
     */
    myAnchor?: JsavAnchor;

    /**
     * A boolean indicating whether or not this structure should move when the relative element moves.
     * Only has an effect if relativeTo is specified.
     */
    follow?: boolean;

    /**
     * If relativeTo points to a JSAV array, this option can be used to position this structure relative
     * to an index in that array. Only has an effect if relativeTo is specified.
     */
    relativeIndex?: number;
  }

  /**
   * Index selector for JSAV structures.
   */
  export type JsavIndiciesSelector = number | number[] | Function | boolean;

  /**
   * JSAV array.
   */
  export interface JsavArray extends JsavStructure {
    _values: any[];
    _indices: JsavArrayIndex[];

    /**
     * Apply the given CSS properties to the specified indices.
     * Parameter indices can be a number, array, true, or function like for the highlight method.
     * When indices is true, then css is applied to all elements of the array. The argument
     * css should be an object with property name-and-value pairs. For example, to make positions 0 and 4 have green color and lightgray background:
     * ```ts
     * arr.css([0, 4], {"color": "green", "background-color": "#eee"});
     * ```
     * @param index - The indices to apply the CSS properties to.
     * @param css - The CSS properties to apply.
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    css(index: JsavIndiciesSelector, css: { [index: string]: Primitive }): JsavArray;

    /**
     * Returns the value of CSS property cssPropertyName for the first index matching the indices parameter.
     * Parameter indices can be a number, array, true, or function like for the highlight method.
     * @param index - The indices to get the CSS property from.
     * @param cssPropertyName - The CSS property to get.
     */
    css(index: JsavIndiciesSelector, cssPropertyName: string): string;

    /**
     * Returns the value of CSS property cssPropertyName for the array.
     * @param cssPropertyName - The name of the CSS property.
     */
    css(cssPropertyName: string): string;

    /**
     * Apply the given CSS properties to the array element.
     * The argument css should be an object with property name-and-value pairs.
     * For example, to move the array 20 pixels to the right:
     * ```ts
     * arr.css({"left": "+=20px"});
     * ```
     * @param css - The CSS properties to apply.
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    css(css: { [index: string]: Primitive }): JsavArray;

    /**
     * Highlights the specified indices.
     * Parameter indices can be a number, array, true, or function.
     * When indices is true, then all elements of the array are highlighted.
     * When indices is a function, then the function is called for each index in the array.
     * @param index - The indices to highlight.
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    highlight(index: JsavIndiciesSelector): JsavArray;

    /**
     * Unhighlights the specified indices.
     * Parameter indices can be a number, array, true, or function.
     * When indices is true, then all elements of the array are unhighlighted.
     * When indices is a function, then the function is called for each index in the array.
     * @param index - The indices to unhighlight.
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    unhighlight(index: JsavIndiciesSelector): JsavArray;

    /**
     * Returns `true` or `false` depending on whether the element at index number is highlighted or not.
     * @param index - The index to check.
     */
    isHighlight(index: number): boolean;

    /**
     * Recalculates the size and position of the array.
     */
    layout(): void;

    /**
     * Returns the size of the array. For the array defined in the array creation example above,
     * the following would return 4:
     * ```ts
     * arr.size();
     * ```
     * @returns the size of the array.
     */
    size(): number;

    /**
     * Swaps the values of the two array positions.
     * @param index1 - the index of the first element to swap
     * @param index2 - the index of the second element to swap
     * @param options - options for the swap
     */
    swap(index1: number, index2: number, options?: SwapOptions): void;

    /**
     * Gets or sets the value of the array element at the given index.
     * @param index - the index of the array element to get or set
     * @param value - the value to set the array element to
     */
    value(index: number, value?: Primitive): any;

    /**
     * Toggles a marker line above a given array index for bar layout.
     * For other layouts, does nothing. Options that can be passed:
     * @param index - the index of the array element to toggle the line for
     * @param options - options for the toggle
     */
    toggleLine(index: number, options?: ToggleClassOptions): void;

    /**
     * Returns true if the array is empty.
     */
    isEmpty(): boolean;

    addClass(className: string, options?: any): void;

    removeClass(className: string, options?: any): void;

    toggleClass(className: string, options?: any): void;

    hasClass(className: string): boolean;

    /**
     * Adds the CSS class className to given indices and animates the changes.
     * Like for the rest of array methods, index can be a number, array of numbers, or a function.
     * @param index
     * @param className
     * @param options
     */
    addClass(index: JsavIndiciesSelector, className: string, options?: any): void;

    /**
     * Removes the CSS class className to given indices and animates the changes.
     * Like for the rest of array methods, index can be a number, array of numbers, or a function.
     * @param index
     * @param className
     * @param options
     */
    removeClass(index: JsavIndiciesSelector, className: string, options?: any): void;

    /**
     * Toggles the CSS class className to given indices and animates the changes.
     * Like for the rest of array methods, index can be a number, array of numbers, or a function.
     * @param index - the index of the array element to toggle the class for
     * @param className - the CSS class to toggle
     * @param options - options for the toggle
     */
    toggleClass(index: JsavIndiciesSelector, className: string, options?: any): void;

    /**
     * Returns true if the array has the CSS class className.
     * @param index - the index of the array element to check
     * @param className - the CSS class to check for
     * @returns true if the array has the CSS class className.
     */
    hasClass(index: number, className: string): boolean;

    /**
     * Returns an ArrayIndex object correcponding to the array index at the given position.
     * The ArrayIndex object has all the functions JSAV node objects have,
     * like .css, .toggle/add/remove/hasClass, and .highlight.
     * @param index
     */
    index(index: number): JsavArrayIndex;

    ///EVENTS

    /**
     * Adds a handler to be called when the array is clicked.
     * @param handler - the handler to be called when the array is clicked
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    click(handler: (index: number, event: any) => void): JsavArray;

    /**
     * Adds a handler to be called when the array is double-clicked.
     * @param handler - the handler to be called when the array is double-clicked
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    dblclick(handler: (index: number, event: any) => void): JsavArray;

    /**
     * Adds a handler to be called when mouse is pressed down on the array.
     * @param handler - the handler to be called when the array is right-clicked
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    mousedown(handler: (index: number, event: any) => void): JsavArray;

    /**
     * Adds a handler to be called when mouse is released on the array.
     * @param handler - the handler to be called when the mouse is released on the array
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    mouseup(handler: (index: number, event: any) => void): JsavArray;

    /**
     * Adds a handler to be called when mouse is moved over the array.
     * @param handler - the handler to be called when the mouse is moved over the array
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    mousemove(handler: (index: number, event: any) => void): JsavArray;

    /**
     * Adds a handler to be called when mouse enters the array.
     * @param handler - the handler to be called when the mouse enters the array
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    mouseenter(handler: (index: number, event: any) => void): JsavArray;

    /**
     * Adds a handler to be called when mouse leaves the array.
     * @param handler - the handler to be called when the mouse leaves the array
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    mouseleave(handler: (index: number, event: any) => void): JsavArray;
  }

  /**
   * Options for the JSAV array constructor.
   */
  export interface JsavArrayOptions extends JsavOptions {
    /**
     * The layout of the array. Can be "vertical", "horizontal", or "bar".
     */
    layout?: "horizontal" | "vertical" | "bar";

    /**
     * Indicates whether the array is indexed or not. Default is `false`.
     **/
    indexed?: boolean;
  }

  /**
   * A JSAV array index object.
   */
  export interface JsavArrayIndex extends JsavNode {
    /**
     * Does nothing in the array index context.
     * @deprecated This method does nothing in the array index context.
     * @param options
     */
    show(options?: any): void;

    /**
     * Does nothing in the array index context.
     * @deprecated This method does nothing in the array index context.
     * @param options
     */
    hide(options?: any): void;
  }

  /**
   * Options for the JSAV array swap() method.
   */
  export interface SwapOptions {
    /**
     * A boolean specifying whether to show an arrow below the array to
     * indicate the swapped indices. Defaults to true.
     * If Raphaël.js is not loaded, no arrow will be shown.
     */
    arrow?: boolean;

    /**
     *  A boolean specifying whether to swap the classes of the array indices as well. Default is `false`.
     */
    swapClasses?: boolean;

    /**
     * A boolean indicating whether the swapped elements should be highlighted.
     * The highlight is adding the class jsavswap which, by default,
     * sets the background color to red. Defaults to true.
     */
    highlight?: boolean;
  }

  /**
   * JSAV Node structure.
   */
  export interface JsavNode extends JsavStructure {
    /**
     * Returns the value stored in this node.
     * If the optional newValue parameter is given, the value is set to the given value.
     * @param newValue - the new value to set the node to
     */
    value(newValue?: Primitive): Primitive;

    /**
     * Returns the label attached to this node.
     * If the optional newLabel parameter is given, the label is set to the given value.
     * @param newLabel - the new label to set
     * @param options - options for the label
     */
    label(newLabel?: string, options?: JsavLabelOptions): string;

    /**
     * Highlights this node.
     * @returns a JSAV node object. Thus, this method can be chained.
     */
    highlight(): JsavNode;

    /**
     * Unhighlights this node.
     * @returns a JSAV node object. Thus, this method can be chained.
     */
    unhighlight(): JsavNode;

    /**
     * Returns true if this node is highlighted.
     */
    isHighlight(): boolean;
  }

  /**
   * JSAV Edge structure.
   */
  export interface JsavEdge extends JsavStructure {

    /**
     * Creates a new edge from start to end.
     * @param jsav - the JSAV instance
     * @param start - the start node of the edge
     * @param end - the end node of the edge
     * @param options - options for the edge
     */
    new (jsav: JsavInstance, start?: JsavNode, end?: JsavNode, options?: JsavEdgeOptions): JsavEdge;

    /**
     * Returns the start node of this edge. If the optional node parameter is given, sets the start node of this edge.
     * @param node - the new start node for this edge
     * @returns the start node of this edge
     */
    start(node?: JsavNode): JsavNode;

    /**
     * Returns the end node of this edge. If the optional node parameter is given, sets the end node of this edge.
     * @param node - the new end node for this edge
     * @returns the end node of this edge
     */
    end(node?: JsavNode): JsavNode;

    /**
     * Returns the label attached to this edge.
     */
    label(): string;

    /**
     * Sets the value of the label attached to this edge.
     * @param newLabel
     */
    label(newLabel: string): string;

    /**
     * Returns the weight of this edge.
     */
    weight(): number;

    /**
     * Sets the weight of this edge.
     * @param newWeight
     */
    weight(newWeight: number): number;

    /**
     * Recalculates the layout of this edge.
     * @param options - options to set
     */
    layout(options?: any): string;
  }

  /**
   * JSAV Graph structure.
   */
  export interface JsavGraph extends JsavStructure {
    /**
     * Adds a new node with value to the graph. Returns the new node.
     * @param value - the value to store in the node
     * @param options - options for the node
     */
    addNode(value: any, options?: JsavNodeOptions): JsavGraphNode;

    /**
     * Adds a new node with value to the graph. Returns the new node.
     * @param value - the value to store in the node
     * @param options - options for the node
     */
    newNode(value: any, options?: JsavNodeOptions): JsavGraphNode;

    /**
     * Removes the given node from the graph.
     * @param node - the node to remove
     */
    removeNode(node: JsavGraphNode): void;

    /**
     * Adds edge from fromNode to toNode. Returns the new edge.
     * @param fromNode - the node to start the edge from
     * @param toNode - the node to end the edge at
     * @param options - options for the edge
     */
    addEdge(fromNode: JsavGraphNode, toNode: JsavGraphNode, options?: JsavEdgeOptions): JsavEdge;

    /**
     * Removes the given edge from the graph.
     * @param edge - the edge to remove
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    removeEdge(edge: JsavEdge): JsavGraph;

    /**
     * Removes the edge from fromNode to toNode.
     * @param fromNode - the node to start the edge from
     * @param toNode - the node to end the edge at
     */
    removeEdge(fromNode: JsavGraphNode, toNode: JsavGraphNode): JsavGraph;

    /**
     * Returns true if the graph has an edge from fromNode to toNode.
     * @param fromNode - the node to start the edge from
     * @param toNode - the node to end the edge at
     */
    hasEdge(fromNode: JsavGraphNode, toNode: JsavGraphNode): boolean;

    /**
     * Returns the edge from fromNode to toNode.
     * @param fromNode - the node to start the edge from
     * @param toNode - the node to end the edge at
     */
    getEdge(fromNode: JsavGraphNode, toNode: JsavGraphNode): JsavEdge;

    /**
     * Returns an iterable array of nodes in the graph.
     * The returned structure can be used as a normal JavaScript array.
     * In addition, it has methods .next(), .hasNext(), and .reset() for iterating over the values.
     */
    nodes(): JsavGraphNode[];

    /**
     * Returns the number of nodes in the graph.
     */
    nodeCount(): number;

    /**
     * Returns an iterable array of edges in the graph.
     * The returned structure is similar to the one returned by .nodes().
     */
    edges(): JsavEdge[];

    /**
     * Returns the number of edges in the graph.
     */
    edgeCount(): number;

    /**
     * This function (re)calculates the layout for the graph.
     * Note, that the library does not do this automatically.
     * That means that after changing the graph, you should call this manually at the end of each animation step.
     */
    layout(): void;

    /**
     * Creates and returns a deep copy of the current JsavGraph structure.
     * @return {JsavGraph} A new JsavGraph structure that is an identical copy of the current one.
     */
    clone(): JsavGraph;

    /**
     * Creates a deep copy of the given JsavGraph structure with the specified options.
     * @param {JsavGraphOptions} options - The options to apply to the cloned JsavGraph structure.
     * @return {JsavGraph} - A deep copy of the JsavGraph structure with the specified options.
     */
    clone(options: JsavGraphOptions): JsavGraph;

    /// EVENTS

    /**
     * Adds a handler to be called when the graph is clicked.
     * @param handler - the handler to be called when the graph is clicked
     * @param options - options for the click
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    click(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;

    /**
     * Adds a handler to be called when the graph is double-clicked.
     * @param handler - the handler to be called when the graph is double-clicked
     * @param options - options for the double-click
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    dblclick(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;

    /**
     * Adds a handler to be called when mouse is pressed down on the graph.
     * @param handler - the handler to be called when the graph is right-clicked
     * @param options - options for the right-click
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    mousedown(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;

    /**
     * Adds a handler to be called when mouse is released on the graph.
     * @param handler - the handler to be called when the mouse is released on the graph
     * @param options - options for the mouseup
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    mouseup(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;

    /**
     * Adds a handler to be called when mouse is moved over the graph.
     * @param handler - the handler to be called when the mouse is moved over the graph
     * @param options - options for the mousemove
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    mousemove(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;

    /**
     * Adds a handler to be called when mouse enters the graph.
     * @param handler - the handler to be called when the mouse enters the graph
     * @param options - options for the mouseenter event
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    mouseenter(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;

    /**
     * Adds a handler to be called when mouse leaves the graph.
     * @param handler - the handler to be called when the mouse leaves the graph
     * @param options - options for the mouseleave event
     * @returns a JSAV graph object. Thus, this method can be chained.
     */
    mouseleave(handler: (event: any) => void, options?: { edge: boolean }): JsavGraph;
  }

  /**
   * JSAV Graph Node structure.
   */
  export interface JsavGraphNode extends JsavNode {
    /**
     * Returns an iterable array of the nodes that this node is connected to.
     */
    neighbors(): JsavGraphNode[];

    /**
     * Returns the Edge object connecting this node to the given node. Returns undefined if no such edge exists.
     * @param node - the node to get the edge to
     */
    edgeTo(node: JsavGraphNode): JsavGraphNode;

    /**
     * Returns the Edge object connecting the given node to this node. Returns undefined if no such edge exists.
     */
    edgeFrom(node: JsavGraphNode): JsavGraphNode;
  }

  /**
   * JSAV List structure.
   */
  export interface JsavList extends JsavStructure {
    /**
     * Returns the first node in the list. If there are no nodes in the list, returns undefined.
     */
    first(newFirst?: JsavListNode): JsavListNode | undefined;

    /**
     * Returns the last node in the list. If there are no nodes in the list, returns undefined.
     */
    last(newLast?: JsavListNode): JsavListNode | undefined;

    /**
     * Adds the given value or node as the first item in the list. Returns the list, so calls can be chained.
     * @param value - the value to add to the list
     */
    addFirst(value: any | JsavListNode): JsavList;

    /**
     * Adds the given value or node as the last item in the list. Returns the list, so calls can be chained.
     * @param value - the value to add to the list
     */
    addLast(value: any | JsavListNode): JsavList;

    /**
     * Adds the given value or node to be the indexth item in the list.
     * The first item in the list has index 0. Returns the list, so calls can be chained.
     * @param index - the index to add the value to
     * @param value - the value to add to the list
     */
    add(index: number, value: any | JsavListNode): JsavList;

    /**
     * Returns the node at index. First item has index 0. If no such index exists, returns undefined.
     */
    get(index: number): JsavListNode | undefined;

    /**
     * Removes the first node in the list. Returns the removed node.
     */
    removeFirst(): JsavListNode | undefined;

    /**
     * Removes the last node in the list. Returns the removed node.
     */
    removeLast(): JsavListNode | undefined;

    /**
     * Removes the node at index in the list. First item has index 0. Returns the removed node.
     * @param index
     */
    remove(index: number): JsavListNode | undefined;

    /**
     * Returns the size of the list.
     */
    size(): number;

    /**
     * This function (re)calculates the layout for the list. Note, that the library does not do this automatically.
     * That means that after changing the list, you should call this manually at the end of each animation step.
     * If the call to layout is, for example (below), only the edges in the list are redrawn:
     * ```ts
     * list.layout({updateLeft: false, updateTop: false});
     * ```
     * @param options
     */
    layout(options?: JsavListLayoutOptions): void;

    /**
     * Returns a new node that can be added to the list.
     * @param value - the value to add to the list
     * @param options - the options to set
     */
    newNode(value: any, options?: JsavNodeOptions): JsavListNode;

    /// EVENTS

    /**
     * Adds a handler to be called when the list is clicked.
     * @param handler - the handler to be called when the list is clicked
     * @param options - options for the click
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    click(handler: (event: any) => void, options?: { edge: boolean }): JsavList;

    /**
     * Adds a handler to be called when the list is double-clicked.
     * @param handler - the handler to be called when the list is double-clicked
     * @param options - options for the double-click
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    dblclick(handler: (event: any) => void, options?: { edge: boolean }): JsavList;

    /**
     * Adds a handler to be called when mouse is pressed down on the list.
     * @param handler - the handler to be called when the list is right-clicked
     * @param options - options for the right-click
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    mousedown(handler: (event: any) => void, options?: { edge: boolean }): JsavList;

    /**
     * Adds a handler to be called when mouse is released on the list.
     * @param handler - the handler to be called when the mouse is released on the list
     * @param options - options for the mouseup
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    mouseup(handler: (event: any) => void, options?: { edge: boolean }): JsavList;

    /**
     * Adds a handler to be called when mouse is moved over the list.
     * @param handler - the handler to be called when the mouse is moved over the graph
     * @param options - options for the mousemove
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    mousemove(handler: (event: any) => void, options?: { edge: boolean }): JsavList;

    /**
     * Adds a handler to be called when mouse enters the list.
     * @param handler - the handler to be called when the mouse enters the list
     * @param options - options for the mouseenter event
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    mouseenter(handler: (event: any) => void, options?: { edge: boolean }): JsavList;

    /**
     * Adds a handler to be called when mouse leaves the list.
     * @param handler - the handler to be called when the mouse leaves the list
     * @param options - options for the mouseleave event
     * @returns a JSAV list object. Thus, this method can be chained.
     */
    mouseleave(handler: (event: any) => void, options?: { edge: boolean }): JsavList;
  }

  /**
   * JSAV List Node structure.
   */
  export interface JsavListNode extends JsavNode {
    /**
     * Returns the next node in the linked list. If no next, returns null.
     */
    next(): JsavListNode;

    /**
     * Sets the next node to be the passed node. The optional second argument options should be an object.
     * @param node - the node to set as the next node
     * @param options - the options to set
     */
    next(node: JsavListNode | null, options?: LinkListNextOptions): JsavListNode;

    /**
     * Returns the JSAV Edge object that points to the next item in the list.
     */
    edgeToNext(): JsavEdge;
  }

  /**
   * Options for list next() method.
   */
  export interface LinkListNextOptions {
    /**
     * Specify a label shown on the edge connecting the node to the next.
     */
    edgeLabel?: string;
  }

  /**
   * Options for list layout() method.
   */
  export interface JsavListLayoutOptions {
    /**
     * If true, the horizontal position (that is, left) of the nodes are calculated. Defaults to true.
     */
    updateLeft?: boolean;

    /**
     * If true, the vertical position (that is, top) of the nodes are calculated. Defaults to true.
     */
    updateTop?: boolean;
  }

  /**
   * Options for list creation.
   */
  export interface JsavListOptions extends JsavOptions {
    /**
     * Defines choices of layout (currently only the default layout is supported).
     */
    layout?: "default";

    /**
     * Number to specify how big the gap between nodes in the list should be. Defaults to 40.
     */
    nodegap?: number;
  }

  /**
   * Options for graph creation.
   */
  export interface JsavGraphOptions extends JsavOptions {
    /**
     *  Defines the layout used, either manual, automatic, or layered.
     *  Defaults to manual layout. Note, that if you use the layered layout,
     *  you will need to load Dagre (you can also find it in JSAV/lib/dagre.min.js).
     */
    layout?: "manual" | "automatic" | "layered";

    /**
     * Width of the graph, in pixels. Defaults to 400.
     */
    width?: number;

    /**
     * Height of the graph, in pixels. Defaults to 200.
     */
    height?: number;

    /**
     * Whether or not this graph is directed.
     */
    directed?: boolean;
  }

  /**
   * Options for node creation.
   */
  export interface JsavNodeOptions extends JsavOptions {}

  /**
   * Options for edge creation.
   */
  export interface JsavEdgeOptions extends JsavOptions {
    /**
     * The weight of the edge. Defaults to 1.
     */
    weight?: number;
    "arrow-start"?: string;
    "arrow-end"?: string;
  }

  /**
   * Matrix structure.
   */
  export interface JsavMatrix extends JsavStructure {
    /**
     * Swaps two values of the matrix, namely (row1, col1) with (ro2, col2).
     * @param row1 - the row of the first value
     * @param col1 - the column of the first value
     * @param row2 - the row of the second value
     * @param col2 - the column of the second value
     * @param options - the options to set
     */
    swap(row1: number, col1: number, row2: number, col2: number, options?: JsavMatrixSwapOptions): void;

    /**
     * Recalculates the layout of the matrix.
     * @param options - the options to set
     */
    layout(options?: JsavMatrixLayoutOptions): void;

    css(cssPropertyName: string, value?: string, options?: { [index: string]: Primitive }): string;

    css(props: { [index: string]: Primitive }, options?: { [index: string]: Primitive }): void;

    /**
     * Returns the value of CSS property cssPropertyName for the element at the given indices.
     * @param row - the row of the element to get the css from
     * @param col - the column of the element to get the css from
     * @param cssPropertyName
     */
    css(row: number, col: number, cssPropertyName: string): string;

    /**
     * Apply the given CSS properties to the specified indices.
     * The argument css should be an object with property name-and-value pairs. For example,
     * to make positions 0 and 4 have green color and lightgray background:
     * ```ts
     * arr.css([0, 4], {"color": "green", "background-color": "#eee"});
     * ```
     * @param row - the row of the element to set the css to
     * @param col - the column of the element to set the css to
     * @param css
     * @returns a JSAV array object. Thus, this method can be chained.
     */
    css(row: number, col: number, css: { [index: string]: Primitive }): JsavMatrix;

    addClass(className: string, options?: any): void;

    removeClass(className: string, options?: any): void;

    toggleClass(className: string, options?: any): void;

    hasClass(className: string): boolean;

    /**
     * Adds the CSS class className to given indices and animates the changes.
     * Like for the rest of array methods, index can be a number, array of numbers, or a function.
     * @param row - the row of the element to add the class to
     * @param col - the column of the element to add the class to
     * @param className - the CSS class to add
     * @param options - options for the add
     */
    addClass(row: number, col: number, className: string, options?: any): void;

    /**
     * Removes the CSS class className to given indices and animates the changes.
     * Like for the rest of array methods, index can be a number, array of numbers, or a function.
     * @param row - the row of the element to remove the class from
     * @param col - the column of the element to remove the class from
     * @param className - the CSS class to remove
     * @param options - options for the remove
     */
    removeClass(row: number, col: number, className: string, options?: any): void;

    /**
     * Toggles the CSS class className to given indices and animates the changes.
     * Like for the rest of array methods, index can be a number, array of numbers, or a function.
     * @param row - the row of the element to toggle the class on
     * @param col - the column of the element to toggle the class on
     * @param className - the CSS class to toggle
     * @param options - options for the toggle
     */
    toggleClass(row: number, col: number, className: string, options?: any): void;

    /**
     * Returns true if the array has the CSS class className.
     * @param row - the row of the element to check
     * @param col - the column of the element to check
     * @param className - the CSS class to check for
     * @returns true if the array has the CSS class className.
     */
    hasClass(row: number, col: number, className: string): boolean;

    /**
     * Highlights the specified indices.
     * @param row - the row of the element to highlight
     * @param col - the column of the element to highlight
     * @returns a JSAV matrix object. Thus, this method can be chained.
     */
    highlight(row: number, col: number): JsavMatrix;

    /**
     * Removes the highlight from the given coordinates.
     * @param row - the row of the element to unhighlight
     * @param col - the column of the element to unhighlight
     * @returns a JSAV matrix object. Thus, this method can be chained.
     */
    unhighlight(row: number, col: number): JsavMatrix;

    /**
     * Returns `true` or `false` depending on whether the element at index number is highlighted or not.
     * @param row - the row of the element to check
     * @param col - the column of the element to check
     */
    isHighlight(row: number, col: number): boolean;

    /**
     * Gets or sets the value of the array element at the given indices.
     * @param row - the row of the element to get or set
     * @param col - the column of the element to get or set
     * @param value - the value to set the array element to
     * @returns the value of the array element at the given indices.
     */
    value(row: number, col: number, value?: Primitive): Primitive;
  }

  /**
   * Options for the array constructor.
   */
  export type JsavMatrixSwapOptions = any;

  /**
   * Options for the matrix layout function.
   */
  export type JsavMatrixLayoutOptions = any;

  /**
   * Options for the matrix constructor.
   */
  export interface JsavMatrixOptions extends JsavOptions {
    /**
     * The style of the array. Valid values are plain, matrix, and table. Defaults to table.
     */
    style?: "table" | "matrix" | "plain";
  }

  /**
   * Base class for both Tree and Binary Tree structures.
   */
  export interface JsavTreeBase extends JsavStructure {
    /**
     * Returns the root of this tree. If the optional node parameter is given, the root of the tree is set.
     * This function exists for all trees. If node is a node the old root is replaced.
     * The replaced root will also be hidden, unless option hide is set to `false`.
     * If node is a value the old value will be replaced in the root.
     * @param newNode - the new root node
     * @param options - options for the root
     */
    root(newNode?: any | JsavTreeNode, options?: { hide: boolean }): JsavTreeNode;

    /**
     * Creates a new node that can be added to this tree. “Subclasses” override this to create nodes suited
     * for the tree, so this method should be used when creating new nodes. This function exists for all trees.
     * @param value - the value of the new node
     */
    newNode(value: any): JsavTreeNode;

    /**
     * Returns the height of the tree. This function exists for all trees.
     */
    height(): number;

    /**
     * This function (re)calculates the layout for the tree.
     * Note, that the library does not do this automatically.
     * That means that after changing the tree, you should call this manually at the end of each animation step.
     * This function exists for all trees.
     */
    layout(options?: any): void;

    /**
     * Make the tree invisible. This function exists for all trees.
     * It recursively hides all the nodes and edges in the tree as well unless option recursive is set to `false`.
     * @param options
     */
    hide(options?: { recursive: boolean }): void;

    /**
     * Make the tree visible. This function exists for all trees.
     * It recursively shows all the nodes and edges in the tree as well unless option recursive is set to `false`.
     */
    show(options?: { recursive: boolean }): void;

    /// EVENTS

    /**
     * Adds a handler to be called when the tree is clicked.
     * @param handler - the handler to be called when the tree is clicked
     * @param options - options for the click
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    click(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    /**
     * Adds a handler to be called when the tree is double-clicked.
     * @param handler - the handler to be called when the tree is double-clicked
     * @param options - options for the double-click
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    dblclick(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    /**
     * Adds a handler to be called when mouse is pressed down on the tree.
     * @param handler - the handler to be called when the tree is right-clicked
     * @param options - options for the right-click
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    mousedown(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    /**
     * Adds a handler to be called when mouse is released on the tree.
     * @param handler - the handler to be called when the mouse is released on the tree
     * @param options - options for the mouseup
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    mouseup(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    /**
     * Adds a handler to be called when mouse is moved over the tree.
     * @param handler - the handler to be called when the mouse is moved over the tree
     * @param options - options for the mousemove
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    mousemove(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    /**
     * Adds a handler to be called when mouse enters the tree.
     * @param handler - the handler to be called when the mouse enters the tree
     * @param options - options for the mouseenter event
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    mouseenter(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    /**
     * Adds a handler to be called when mouse leaves the tree.
     * @param handler - the handler to be called when the mouse leaves the tree
     * @param options - options for the mouseleave event
     * @returns a JSAV tree object. Thus, this method can be chained.
     */
    mouseleave(handler: (event: any) => void, options?: { edge: boolean }): JsavTreeBase;

    // TODO missing:
    // Similarly to arrays, you can also pass custom data to the handler.
    // For example, bt.click({"color": "blue"}, JSAV.utils._helpers.css);
    // would call the css function with the given parameter.
  }

  /**
   * Tree.
   */
  export interface JsavTree extends JsavTreeBase {}

  /**
   * Binary tree.
   */
    // @ts-ignore - Because of binary tree node does not have child(),... methods
  export interface JsavBinaryTree extends JsavTreeBase {
    root(newNode?: any | JsavBinaryTreeNode, options?: { hide: boolean }): JsavBinaryTreeNode;

    newNode(value: Primitive): JsavBinaryTreeNode;
  }

  /**
   * Tree node.
   */
  export interface JsavTreeNode extends JsavNode {
    /**
     * Returns the parent node of this node. If the optional newParent parameter is given,
     * the parent node is set.
     * @param newParent - the new parent node
     * @returns the parent node of this node
     */
    parent(newParent?: JsavTreeNode): JsavTreeNode;

    /**
     * Returns the edge that connects this node to its parent.
     * If the optional newEdge parameter is given, the edge to parent is set.
     * @param newEdge - the new edge to parent
     * @returns the edge that connects this node to its parent
     */
    edgeToParent(newEdge?: JsavEdge): JsavEdge;

    /**
     * Returns the edge that connects this node to its child at pos.
     * Returns undefined is no such child exists.
     * @param pos - the position of the child
     * @returns the edge that connects this node to its child at pos
     */
    edgeToChild(pos: number): JsavEdge;

    /**
     * Returns the pos:th child of this node.
     * @param pos - the position of the child
     */
    child(pos: number): JsavTreeNode;

    /**
     * Gets the children of this node.
     */
    children(): JsavTreeNode[];

    /**
     * Sets the pos:th child to the given value.
     * The node can be a value or a node of correct type to the node.
     * If value null is given as node, the child at that position is removed.
     * Note, that this also hides the removed node and the edge.
     * @param pos - the position of the child
     * @param node - the new child node
     * @param options - options for the new edge
     * @returns the node the child was added to.
     */
    child(pos: number, node: JsavTreeNode, options?: { edgeLabel: string }): JsavTreeNode;

    /**
     * Adds a child node to this node. The node can be a value or a node of correct type to the node.
     * @param node - the new child node
     * @param options - options for the new edge
     * @returns the node the child was added to.
     */
    addChild(node: JsavTreeNode, options?: { edgeLabel: string }): JsavTreeNode;

    /**
     * Removes the node from its parent.
     * The node and its child nodes are hidden recursively, unless option hide is set to `false`.
     * @param options
     */
    remove(options?: { hide: boolean }): void;

    /**
     * Hides the node and the edge connecting it to the parent node.
     * Also recursively hides all child nodes unless option recursive is set to `false`.
     * @param options - options for the hide
     */
    hide(options?: { recursive: boolean }): void;

    /**
     * Shows the node and the edge connecting it to the parent node.
     * Also recursively shows all child nodes unless option recursive `false` is set to `false`.
     *
     * Note, that if the tree is not visible, showing nodes will not have any effect until
     * the tree is set visible by calling show.
     * @param options - options for the show
     */
    show(options?: { recursive: boolean }): void;
  }

  /**
   * Binary tree node.
   */
  export interface JsavBinaryTreeNode extends JsavNode {
    /**
     * Returns the parent node of this node. If the optional newParent parameter is given,
     * the parent node is set.
     * @param newParent - the new parent node
     * @returns the parent node of this node
     */
    parent(newParent?: JsavTreeNode): JsavBinaryTreeNode;

    /**
     * Returns the left child or undefined if node has no left child.
     * If optional parameter node is given, sets the left child.
     * The parameter can be a value or a binary tree node.
     * If value null is given as node, the left child is removed.
     *
     * Note, that this also hides the removed node and the edge.
     * The additional options parameter works like for .child(...).
     * @param newNode - the new left child node
     * @param options - options for the new edge
     */
    left(newNode?: any | JsavBinaryTreeNode, options?: { edgeLabel: string }): JsavBinaryTreeNode;

    /**
     * Returns the right child or undefined if node has no right child.
     * If optional parameter node is given, sets the right child.
     * The parameter can be a value or a binary tree node.
     * If value null is given as node, the right child is removed.
     *
     * Note, that this also hides the removed node and the edge.
     * The additional options parameter works like for .child(...).
     * @param newNode - the new right child node
     * @param options - options for the new edge
     */
    right(newNode?: any | JsavBinaryTreeNode, options?: { edgeLabel: string }): JsavBinaryTreeNode;

    /**
     * Returns the edge that connects this node to its parent.
     * If the optional newEdge parameter is given, the edge to parent is set.
     * @param newEdge - the new edge to parent
     * @returns the edge that connects this node to its parent
     */
    edgeToParent(newEdge?: JsavEdge): JsavEdge;

    /**
     * Returns the edge that connects this node to its left child.
     * Returns undefined if node has no left child.
     * @param newEdge - the new edge to left child
     * @returns the edge that connects this node to its left child
     */
    edgeToLeft(newEdge?: JsavEdge): JsavEdge;

    /**
     * Returns the edge that connects this node to its right child.
     * Returns undefined if node has no right child.
     * @param newEdge - the new edge to right child
     * @returns the edge that connects this node to its right child
     */
    edgeToRight(newEdge?: JsavEdge): JsavEdge;

    /**
     * Returns the height of the subtree rooted at this node.
     */
    height(): number;
  }

  /**
   * Tree options.
   */
  export interface JsavTreeOptions extends JsavOptions {
    /**
     * Defines choices of layout (currently only the default layout is supported).
     */
    layout?: "default";

    /**
     * Number to specify how big the gap between nodes in the tree should be. Defaults to 40.
     */
    nodegap?: number;
  }

  /**
   * Toggle class options.
   */
  export interface ToggleClassOptions {
    /**
     * Style of the “ball” as an object of CSS property/value pairs.
     * Default style is first applied, then the given style. Passing null will disable the ball altogether.
     */
    markStyle?: { [index: string]: Primitive };

    /**
     * Style of the line as an object of CSS property/value pairs. Works similarly to markStyle.
     */
    lineStyle?: { [index: string]: Primitive };

    /**
     * Index in the array where the line will start. Default 0.
     */
    startIndex?: number;

    /**
     * Index in the array where the line will end, inclusive. Defaults to last index of the array.
     */
    endIndex?: number;
  }

  /**
   * Pointer.
   */
  export interface JsavPointer extends JsavStructure {
    /**
     * If newTarget is not specified, returns the JSAV object this pointer points to.
     * If newTarget is a JSAV object, the pointer will be updated to point to that structure.
     * Valid options are the same as for the pointer constructor. If setting a new target,
     * the change is recorded in the animation and the function returns the pointer object.
     *
     * Note: the position of the pointer is only updated once the jsav.step(),
     * jsav.displayInit(), or jsav.recorded() function is called.
     * @param newTarget - the new target for the pointer
     * @param options - options for the pointer
     */
    target(newTarget?: JsavStructure, options?: JsavPointerOptions): JsavStructure;
  }

  /**
   * Pointer options.
   */
  export interface JsavPointerOptions extends JsavOptions {
    /**
     *  If target is a JSAV array, this option can be used to target an index in that array.
     *  Note, that it is better to simply pass the index as the target parameter to the constructor.
     *  You can get the index with the array.index(ind) function.
     */
    targetIndex?: number;

    /**
     *  A boolean indicating whether the pointer should move when it’s target changes.
     *  Note, that if the pointer has a target when initialized,
     *  the pointer will still be positioned relative to that target.
     */
    fixed?: boolean;

    /**
     * Similar to anchor, but the target position of the arrow.
     * Defaults to top center. In addition to values of anchor,
     * can also be specified as percentages of width/height from top-left corner.
     * For example, 0 50% would match the default value top center.
     */
    arrowAnchor?: JsavArrowAnchor;
  }
  
  export interface JsavIterable<T> {
    /**
     * Returns the next value in the iterable.
     */
    next(): T;

    /**
     * Returns true if there are more values in the iterable.
     */
    hasNext(): boolean;

    /**
     * Resets the iterable so that the next call to next() will return the first value.
     */
    reset(): void;
  }

  /**
   * Utility functions.
   */
  export interface JsavUtils {
    rand: JsavRandom;
    _helpers: JsavHelpers;

    /**
     * Returns a random unique identifier.
     */
    createUUID(): string;

    /**
     * Returns an iterable version of the passed array that has functions .next() and
     * .hasNext(). Note, that the array is a clone of the original array!
     * @param value - the value to make iterable
     */
    iterable<T>(value: T[]): JsavIterable<T>;

    /**
     * Returns true if the passed object is a graphical primitive, false otherwise.
     * @param obj - the object to check
     */
    isGraphicalPrimitive(obj: any): boolean;

    /**
     * Returns an object containing all query parameters given for the HTML page.
     * If no parameters exist, returns an empty object.
     */
    getQueryParameter(): { [index: string]: Primitive };

    /**
     * Returns the value of the query parameter name. If no such parameter exists, return undefined
     * @param name
     */
    getQueryParameter(name: string): string;

    /**
     * Shows a pop-up dialog with the given HTML as content.
     * Returns an object with function close() that can be used to close the dialog.
     */
    dialog(html: HTMLElement, options?: DialogOptions): JsavDialog;

    /**
     * Returns converted value of the given type.
     * @param value - the value to convert
     * @param valType - the type to convert to
     */
    value2type(value: any, valType: string): any;

    /**
     * Returns an interpreter function which translates tags into strings or other values specified
     * in the selected language. languageJSON be either a JavaScript object or a URL to a JSON file,
     * and can contain one or more translations. In case there are several translations language should
     * specify the selected language.
     * @param languageJSON - a JavaScript object or a URL to a JSON file
     * @param language - the selected language
     */
    getInterpreter(languageJSON: object | string, language: string): Function;

    /**
     * Returns a string where the labels (surrounded by curly brackets) in the string have been replaced
     * by values in the replacementObject. The function works the same way as fill works for .umsg().
     * @param str - the string to replace labels in
     * @param replacementObject - the object containing the replacement values
     */
    replaceLabels(str: string, replacementObject: any): string;

    /**
     * Returns an undoable/animatable function which will work with JSAV’s undo and recorded animation.
     * The returned function can for instance be used to show or hide non-JSAV DOM element.
     * @param jsav - The jsav instance with the exercise or animation.
     * @param func - The function which performs the action. If the same function can be used to undo the performed action,
     * it should return the undo arguments in an array.
     * @param undoFunc - The function which will undo the action performed by func. (OPTIONAL IF func RETURNS THE UNDO ARGUMENTS)
     */
    getUndoableFunction(jsav: JsavInstance, func: Function, undoFunc?: Function): (...args: any[]) => any;

    /**
     * Makes constructor inherit superConstructor 
     * from Golimojo: http://www.golimojo.com/etc/js-subclass.html
     * @param constructor - the constructor
     * @param superConstructor - the super constructor to extend
     */
    extend(constructor: Function, superConstructor: Function): void;
  }
  
  export interface JsavHelpers {
    /**
     * Sets the CSS classes of the given element to the given classes.
     * @param element - the element to set the classes to
     * @param classes - the classes to set
     */
    setElementClasses(element: HTMLElement, classes: string[]): void;

    /**
     * Returns the CSS classes of the given element.
     * @param element - the element to get the classes from
     */
    elementClasses(element: HTMLElement): string[];
  }

  export interface JsavDialog {
    close(): void;
  }

  export interface DialogOptions {
    /**
     *  Whether the dialog is modal (default true).
     */
    modal?: boolean;

    /**
     * Control the width of the dialog.
     */
    width?: number;

    /**
     * Control the width of the dialog.
     */
    minWidth?: number;

    /**
     * Control the width of the dialog.
     */
    maxWidth?: number;

    /**
     * Control the height of the dialog.
     */
    height?: number;

    /**
     * Control the height of the dialog.
     */
    minHeight?: number;

    /**
     * control the height of the dialog.
     */
    maxHeight?: number;

    /**
     * If specified, a button with this text to close the dialog will be added.
     */
    closeText?: string;

    /**
     * Custom CSS classes to be added to the created component.
     * Class jsavdialog is always added.
     */
    dialogClass?: string;

    /**
     * Title of the dialog.
     */
    title?: string;

    /**
     * the base element inside which the dialog will be created.
     * Defaults to a newly created element
     * ```
     * <div class="jsavdialog"></div>
     * ```
     */
    dialogBase?: string;

    /**
     * The element into which the dialog element will be appended.
     * By default, it will be appended at the end of the body element.
     */
    dialogRootElement?: Element;
  }

  export interface JsavRandom {
    /**
     * Returns a random integer number between min (inclusive) and max (exclusive).
     * @param min - the minimum value
     * @param max - the maximum value
     */
    numKey(min: number, max: number): number;

    /**
     * Returns an array of num random integer numbers between min (inclusive) and max (exclusive).
     * @param min - the minimum value
     * @param max - the maximum value
     * @param count - the number of random numbers to generate
     * @param options - options for the random numbers
     */
    numKeys(min: number, max: number, count: number, options?: RandomKeysOptions): number[];

    /**
     * Returns an array of num elements randomly picked from the given array arrayCollection.
     * The optional parameter opts can specify options test and tries like for the numKeys() function.
     * @param array - the array to pick random elements from
     * @param count - the number of random elements to pick
     * @param options - options for the random elements
     */
    sample(array: any[], count: number, options?: RandomSampleOptions): number[];
  }

  export interface RandomKeysOptions {
    /**
     * If set to true, the array will be sorted. Default is `false`.
     */
    sorted?: boolean;

    /**
     * If sorted is set to true, this option can be used to specify a function for sorting.
     * @param a - the first number
     * @param b - the second number
     */
    sortFunc?: (a: number, b: number) => number;

    /**
     * A function that takes the random array as a parameter and returns `true`/`false` indicating whether it
     * fullfills some requirements.
     * If it returns `false`, a new random array is generated. This is typically used with exercises to
     * randomize and test the initial data.
     * @param array - the random array
     */
    test?: (array: number[]) => boolean;

    /**
     * If test function is provided, this option specifies how many data sets are tested.
     * If none of the first tries data sets pass the tests, the last one is returned.
     */
    tries?: number;
  }

  export interface RandomSampleOptions {
    /**
     * A function that takes the random array as a parameter and returns `true`/`false` indicating whether it
     * fullfills some requirements.
     * If it returns `false`, a new random array is generated. This is typically used with exercises to
     * randomize and test the initial data.
     * @param array - the random array
     */
    test?: (array: number[]) => boolean;

    /**
     * If test function is provided, this option specifies how many data sets are tested.
     * If none of the first tries data sets pass the tests, the last one is returned.
     */
    tries?: number;
  }

  export interface JsavLabelOptions extends JsavOptions {
    /**
     * Set the label before element UI element.
     */
    before?: JQuery | HTMLElement;

    /**
     * Set the label after element UI element.
     */
    after?: JQuery | HTMLElement;
  }

  /**
   * The label API can be used to add text elements into the visualization.
   */
  export interface JsavLabel extends JsavStructure {
    /**
     * Set the text for the label.
     * If the msg parameter is left out, this method will return the current text of the label.
     * @param msg - the text to set for the label
     */
    text(msg?: string): string;
  }

  /**
   * Variables that can be used to present undo/redo capable variables.
   */
  export interface JsavVariable extends JsavStructure {
    /**
     * Set the value of the variable. If the val parameter is left out, this method will
     * return the current value of the variable. The value is converted to
     * the type specified when initializing the variable.
     * @param val - the value to set for the variable
     */
    value(val?: JsavVarType): JsavVarType;
  }

  /**
   * The type of the variable.
   */
  export type JsavVarType = string | number | boolean;

  /**
   * JSAV tag for pseudo code.
   */
  export type JsavTag = { [index: string]: number | number[] };

  /**
   * The indices for the pseudo code lines.
   */
  export type JsavPseudoCodeIndicies = number | number[] | Function | JsavTag | boolean;

  /**
   * The pseudocode API in JSAV is intended for showing a
   * static set of codelines that can be show/hidden and highlighted.
   */
  export interface JsavPseudoCode extends JsavStructure {
    /**
     * Highlight the codelines at given indices.
     * Lines are numbered from 0, so first line could be highlighted with:
     * ```ts
     * pseudo.highlight(0)
     * ```
     * @param indicies - the indices to highlight
     */
    highlight(indicies: JsavPseudoCodeIndicies): void;

    /**
     * Unhighlight the codelines at given indices.
     * Lines are numbered from 0.
     * @param indicies - the indices to unhighlight
     */
    unhighlight(indicies: JsavPseudoCodeIndicies): void;

    /**
     * Show the codelines.
     */
    show(): void;
    
    /**
     * Hide the codelines.
     */
    hide(): void;

    /**
     * Show the codelines at given indices.
     * Indices can be a number, an array of numbers, a function or a tag.
     * @param indicies - the indices to show
     */
    show(indicies: JsavPseudoCodeIndicies): void;

    /**
     * Hide the codelines at given indices.
     * Indices can be a number, an array of numbers, a function or a tag.
     * @param indicies - the indices to hide
     */
    hide(indicies: JsavPseudoCodeIndicies): void;

    /**
     * Apply the given CSS properties to the codelines at specified indices.
     * Parameter indices can be a number, array, function or a tag like for the highlight method.
     * The argument css should be an object with property name-and-value pairs.
     * For example, to make lines 0 and 4 have green color and lightgray background:
     * ```
     * pseudo.css([0, 4], {"color": "green", "background-color": "#eee"});
     * ```
     * @param indicies - the indices to apply the css to
     * @param css - the css to apply
     */
    css(indicies: JsavPseudoCodeIndicies, css: { [index: string]: Primitive }): void;

    css(cssPropertyName: string, value?: string, options?: { [index: string]: Primitive }): string;

    css(props: { [index: string]: Primitive }, options?: { [index: string]: Primitive }): void;

    /**
     * Sets the line at given index as the current line.
     * Also, if another line was previously set as current,
     * it will be marked as previous. If a line was also earlier marked as previous,
     * that mark will be removed. This will help in creating a visual debugger-like code stepping
     * functionality in visualizations. You can clear the current line selection with index value 0.
     * @param index - the index to set as current line
     * @param options - the options to use
     */
    setCurrentLine(index: number, options?: any): void;

    /**
     * Adds the CSS class className to lines at given indices and animates the changes.
     * Like for the rest of pseudocode methods, indices can be a number, array of numbers, a function or a tag.
     * @param indicies - the indices to add the class to
     * @param className - the class to add
     * @param options - the options to use
     */
    addClass(indicies: JsavPseudoCodeIndicies, className: string, options?: any): void;

    /**
     * Removes the CSS class className from lines at given indices and animates the changes.
     * Like for the rest of pseudocode methods, indices can be a number, array of numbers, a function or a tag.
     * @param indicies - the indices to remove the class from
     * @param className - the class to remove
     * @param options - the options to use
     */
    removeClass(indicies: JsavPseudoCodeIndicies, className: string, options?: any): void;

    /**
     * Toggles the CSS class className on lines at given indices and animates the changes.
     * Like for the rest of pseudocode methods, indices can be a number, array of numbers, a function or a tag.
     * @param indicies - the indices to toggle the class on
     * @param className - the class to toggle
     * @param options - the options to use
     */
    toggleClass(indicies: JsavPseudoCodeIndicies, className: string, options?: any): void;

    /**
     * Return `true`/`false` based on if the line at given index has the CSS class className.
     * Parameter index should be a number or a tag to a number.
     * @param index - the index to check
     * @param className - the class to check for
     */
    hasClass(index: number | JsavTag, className: string): boolean;

    addClass(className: string, options?: any): void;

    removeClass(className: string, options?: any): void;

    toggleClass(className: string, options?: any): void;

    hasClass(className: string): boolean;
  }

  /**
   * The exercise API is used to create interactive, automatically assessed exercises.
   */
  export interface JsavExercise {
    /**
     * The exercise options.
     */
    options: ExerciseOptions;

    /**
     * The JSAV instance for the exercise.
     */
    jsav: JsavInstance;

    /**
     * The model answer for the exercise.
     */
    modelav: JsavInstance;

    /**
     * Structures for interaction with user.
     */
    initialStructures: JsavStructure | JsavStructure[];

    /**
     * Structures for modelling the correct solution.
     */
    modelStructures: JsavStructure | JsavStructure[];

    /**
     * The model answer for the exercise.
     */
    score: JsavScore;
    
    /**
     * Updates the score of the exercise in the UI.
     */
    _updateScore(): void;

    /**
     * Initializes the model answer and structures for the exercise.
     * @param returnToStep - the step to return to
     */
    modelanswer(returnToStep?: number): void;
    
    /**
     * Shows the grade of the student’s current solution on alert.
     * The behaviour can be customized using the showGrade option when initializing the exercise.
     */
    showGrade(): void;

    /**
     * Grades the student’s solution.
     * Behavior in a nutshell:
     * 1. get the student's solution
     * 2. get the model answer
     * 3. rewind both
     * 4. compare the states in the visualizations
     * 5. scale the points (not implemented yet)
     * 6. return result
     * 7. show comparison of own and model side by side (not implemented yet)
     * @param continuousMode - if true, the grading is done in continuous mode.
     */
    grade(continuousMode?: boolean): JsavScore;

    /**
     * Resets the exercise.
     */
    reset(): void;

    /**
     * Shows the model answer of the exercise.
     */
    showModelanswer(): void;

    /**
     * Marks the current step in the student’s solution as a step used in grading.
     */
    gradeableStep(): void;

    /**
     * Undo the last step in the student’s solution (if excercise is in continuous undo mode).
     */
    undo(): void;

    /**
     * Fix the last step in the student’s solution (if excercise is in continuous fix mode).
     */
    fix(): void;

    /**
     * Generates a JSON string representation of the states of the exercise.
     */
    _jsondump(): any;
  }

  /**
   * Interactive questions can be initialized with the question function of a JSAV instance.
   */
  export interface JsavQuestion {
    /**
     * This adds an answer choice to question q.
     * Parameter label is the label shown for this answer choice.
     * The only option at the moment is correct which indicates the correctness of this choice.
     * Default value for it is `false`.
     *
     * Note, that this method does nothing for the true-false type question.
     * @param label
     * @param options
     */
    addChoice(label: string, options?: { correct: boolean }): void;

    /**
     * This function will show the question in the current step in the algorithm.
     * This way, the initialization, addition of answers, and displaying the question
     * can happen in different steps in the animation. It helps when the goal is to show
     * students questions that require prediction of the algorithm’s behavior.
     * A complete example of a multiple-select question:
     * ```js
     * var q = av.question("MS", "Life is good?");
     * q.addChoice("Of course", {correct: true});
     * q.addChoice("Certainly", {correct: true});
     * q.addChoice("No way!");
     * q.show();
     * ```
     */
    show(): void;
  }

  /**
   * JSAV score object.
   */
  export interface JsavScore {
    /**
     * Total number of steps in the model solution.
     */
    total: number;

    /**
     * How many steps were undone in the continuous feedback mode.
     */
    undo: number;

    /**
     * How many steps were fixed in the continuous feedback mode.
     */
    fix: number;

    /**
     * The number of correct steps.
     */
    correct: number;

    /**
     * Number of steps in student solution.
     */
    student: number;
  }

  /**
   * JSAV anchor types.
   */
  // prettier-ignore
  export type JsavAnchor =
      | "left top"    | "center top"    | "right top"
      | "left center" | "center center" | "right center"
      | "left bottom" | "center bottom" | "right bottom"
      | "center";

  /**
   * JSAV arrow anchor types.
   */
  export type JsavArrowAnchor = JsavAnchor | string;
}
