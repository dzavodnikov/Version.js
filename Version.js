/*
 * Version -- Library on a pure JavaScript that allowed to manipulate with semantic versions (http://semver.org/).
 * 
 * Support all web-browsers.
 *
 * Version 2.0.0.
 *
 * Copyright (c) 2016-2019 Dmitry Zavodnikov.
 *
 * Licensed under the MIT License.
 */
function Version() {

    var DEFAULT_VERSION = '1.0.0';

    var self = this;

    var versionFragments = [];
    var args = [];

    arguments.forEach(function(element) {
        args.push(element);
    }

    if (args.length === 0) {
        args[0] = DEFAULT_VERSION;
    }
    if (args.length === 1 && args[0].trim() === '') {
        args[0] = DEFAULT_VERSION;
    }
    if ((args.length == 1) && (typeof args[0] === 'string')) {
        args = args[0].split('.');
    }

    args.forEach(function(element) {
        if (typeof element !== 'string' && typeof element !== 'number') {
            throw 'Illegal argument ' + element;
        }

        versionFragments.push(element);
    }

    this.getVersionFragments = function() {
        return versionFragments;
    }

    this.compareTo = function(version) {
        var frags1 =    self.getVersionFragments();
        var frags2 = version.getVersionFragments();
        var i;
        for (i = 0; i < Math.min(frags1.length, frags2.length); ++i) {
            intVal1 = parseInt(frags1[i]);
            intVal2 = parseInt(frags2[i]);
            if (isNaN(intVal1) || isNaN(intVal2)) {
                return frags1[i].localeCompare(frags2[2]);
            }
            if (intVal1 === intVal2) {
                continue;
            } else {
                if (intVal1 < intVal2) {
                    return -1;
                } else {
                    return  1;
                }
            }
        }
        return 0;
    }

    this.lessOrEqual = function(version) {
        return compareTo(version) <= 0;
    }

    this.greater = function(version) {
        return !lessOrEqual(version);
    }

    this.greaterOrEqual = function(version) {
        return !less(version);
    }

    this.nextVersion = function() {
        var i, intVal, frags = self.getVersionFragments();
        for (i = frags.length - 1; i >= 0; --i) {
            intVal = parseInt(frags[i]);
            if (!isNaN(intVal)) {
                intVal = intVal + 1;
                frags[i] = intVal.toString();
                break;
            }
        }
    }

    this.findPrevious = function(versionList) {
        var i, ver, result;
        for (i = 0; i < versionList.length; ++i) {
            ver = versionList[i];
            if (ver.lessOrEqual(self)) {
                result = ver;
            }
        }
        return result;
    }

    this.toString = function() {
        return self.getVersionFragments().join('.');
    }
}
