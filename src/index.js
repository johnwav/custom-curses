/**
 * jumping right into typescript for the first time by writing a library
 */
import { animate, init } from './pointers/circle-follower/index.js';
/**
 *
 * Returns a cursor object
 *
 * @param {Object} cursorOptions - options for the cursor
 * @param {Array[string]} cursorOptions.pointers - List of all pointers you want to use for the cursor
 * @param {Boolean} cursorOptions.hideCursor - Hides the user default mouse if set to `true`
 * @param {Number} cursorOptions.drag - Number from 0-1 indicating how damped you want the cursor when following the mouse position
 * @param {Number} cursorOptions.xOffset - Number showing the x offset of the cursor
 * @param {Number} cursorOptions.yOffset - Number showing the y offset of the cursor
 *
 * @returns A Cursor type
 */
function Cursor(cursorOptions) {
    const cursorOptionsDefaults = {
        pointers: ['default'],
        hideMouse: true,
        drag: 0,
        xOffset: 0,
        yOffset: 0
    };
    const newCursorOptions = Object.assign({}, cursorOptions);
    // assigns default values to keys not manually defined in the cursor Options
    Object.keys(cursorOptionsDefaults).forEach(property => {
        if (cursorOptions.hasOwnProperty(property))
            newCursorOptions[property] = cursorOptions[property];
        else
            newCursorOptions[property] = cursorOptionsDefaults[property];
    });
    this.hideMouse = newCursorOptions.hideMouse;
    this.getPointers = () => {
        return newCursorOptions.pointers;
    };
    this.getDrag = () => {
        return newCursorOptions.drag;
    };
    this.getXOffset = () => {
        return newCursorOptions.xOffset;
    };
    this.getYOffset = () => {
        return newCursorOptions.yOffset;
    };
    return this;
}
/**
 *
 * @param {Object} pointerOptions - options for the pointer
 * @param {Array[string]} pointerOptions.colors - List of all colors you want to use for the pointer
 * @param {Number} pointerOptions.drag - Number from 0-1 indicating how damped you want the pointer when following the cursor position
 * @param {Number} pointerOptions.xOffset - Number showing the x offset of the pointer
 * @param {Number} pointerOptions.yOffset - Number showing the y offset of the pointer
 */
function Pointer(pointerOptions) {
    const pointerOptionsDefaults = {
        colors: ['default'],
        drag: 0,
        xOffset: 0,
        yOffset: 0
    };
    const newPointerOptions = Object.assign({}, pointerOptions);
    // assigns default values to keys not manually defined in the pointer Options
    Object.keys(pointerOptionsDefaults).forEach(property => {
        if (pointerOptions.hasOwnProperty(property))
            newPointerOptions[property] = pointerOptions[property];
        else
            newPointerOptions[property] = pointerOptionsDefaults[property];
    });
}
function initializeCanvas(cursor) {
    let cursorCanvas = document.querySelector('.curses-cursor-canvas');
    if (!cursorCanvas) {
        cursorCanvas = document.createElement('canvas');
        cursorCanvas.setAttribute('class', 'curses-cursor-canvas');
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
        console.log(cursor.hideMouse);
        cursorCanvas.style.cssText = `
            position: absolute;
            pointer-events:none;
            top: 0;
            left: 0;
        `;
        document.querySelector('html').style.cursor = `${(cursor.hideMouse) ? "none" : "default"}`;
        document.body.appendChild(cursorCanvas);
    }
    const ctx = cursorCanvas.getContext('2d');
    let objects = [];
    init(cursorCanvas, ctx, objects, cursor);
    animate(cursorCanvas, ctx, objects, cursor);
    return cursorCanvas;
}
export { Cursor, Pointer, initializeCanvas };
