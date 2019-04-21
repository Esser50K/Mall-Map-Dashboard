"use strict"

/**
 * This file is for general common utility functions and classes
 */

/**
 * Represents a RGB colour value
 */
class Colour {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Converts the RGB into an array
     */
    asArray() {
        return [
            this.r, this.g, this.b
        ]
    }

    /**
     * Normalises the colours so they are between 0.0 and 1.0
     * This is for use with WebGL2
     */
    asNormalised() {
        return new Colour(
            this.r / 255, this.g / 255, this.b / 255
        );
    }

    /**
     * Converts the RGB value into CSS String with the format 'rgb(r, g, b)
     */
    asCSSString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

/**
 * Gets the width of the browser's inner window 
 */
function getBrowserWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

/**
 * Gets the height of the browser's inner window 
 */
function getBrowserHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

async function populateTable(listUrl, callback) {
    //Get list of something from server
    const response = await fetch(listUrl);
    const list = await response.json();

    //Add the shops
    for (const item of list) {
        addTableRow(item, callback);
    }
}

async function addTableRow(item, callback) {
    const table = document.getElementById("table");
    const rowTemplate  = document.getElementById("row");
    const rowClone = document.importNode(rowTemplate.content, true);
    const cells = rowClone.querySelectorAll("td");

    await callback(item, cells, rowClone);

    table.appendChild(rowClone);
}