/*
 * Version -- Library on a pure JavaScript that allowed to manipulate with semantic versions.
 * 
 * Support all web-browsers).
 *
 * Version 1.0.0.
 *
 * Copyright (c) 2017 Dmitry Zavodnikov.
 *
 * Licensed under the MIT License.
 */
function Version() {

    var DEFAULT_VERSION = '1.0.0';

    var blocks = [];

    var args = Array.from(arguments);
    if (args.length === 0) {
        args[0] = DEFAULT_VERSION;
    }
    if (args.length === 1 && args[0].trim() === '') {
        args[0] = DEFAULT_VERSION;
    }
    if ((args.length == 1) && (typeof args[0] === 'string')) {
        args = args[0].split('.');
    }

    var i;
    var val;
    for (i = 0; i < args.length; ++i) {
        val = args[i];
        if (typeof val !== 'string' && typeof val !== 'number') {
            throw 'Illegal argument ' + val;
        }

        blocks.push(val);
    }

    this.nextVersion = function() {
        var i;
        var intVal;
        for (i = blocks.length - 1; i >= 0; --i) {
            intVal = parseInt(blocks[i]);
            if (!isNaN(intVal)) {
                intVal = intVal + 1;
                blocks[i] = intVal.toString();
                break;
            }
        }
    }

    this.toString = function() {
        return blocks.join('.');
    }
}
