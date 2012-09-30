/**
 * Core.js Framework is a collection of tools taking into account the need to Funbridge platform.
 * This framework has been developed to accompany the online version of the game Funbridge
 *
 * Core.js Framework est un regroupement d'outils prenant en compte les besoin de la platform Funbridge.
 * Ce frameWork a été développé dans le but d'accompagner la version web du jeu Funbridge
 *
 *
 * @name Core
 * @author Romain Lienard <romain.lienard@goto-games.com>
 * @http: goto-games.com
 * @copyright (c)2012 GOTO Games (Romain Lienard)
 * @version 0.0.1
 * @package ***
 * @date: 14/02/12
 * @time: 13:27
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy of this
 *	software and associated documentation files (the "Software"), to deal in the Software
 *	without restriction, including without limitation the rights to use, copy, modify, merge,
 *	publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 *	to whom the Software is furnished to do so, subject to the following conditions:
 *
 * 	The above copyright notice and this permission notice shall be included in all copies
 *	or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *	BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *	DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * 	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

(function(window, undefined){

    var CoreRoot,
    //Get all environment's arguments
        document = window.document,
        location = window.location,
        navigator = window.navigator,

    //Set the local copy of Core definition
        Core = function(){
            return new Core.fn.init(CoreRoot);
        };

    Core.fn = Core.prototype = {
        constructor : Core,
        init : function(CoreRoot){
            return this;
        },
        // The current version of Core being used
        core: "0.0.1",
        // The default length of a Core object is 0
        length: 0,

        //Starting tools
        isFunc:function(value){
            return typeof value == 'function';
        },
        isNum:function(value){
            return typeof value == 'number';
        },
        isStr:function(value){
            return typeof value == 'string';
        },
        isObj:function(value){
            return typeof value == 'object';
        }
    };

    Core.fn.init.prototype = Core.fn;

    Core.extend = Core.fn.extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            var i;
            for (i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    /* @param {Object|Array} obj Object to iterate over.
     * @param {Function} iterator Iterator function.
     * @param {Object=} context Object to become context (`this`) for the iterator function.
     * @returns {Object|Array} Reference to `obj`.
     */
    Core.each = Core.fn.each = function(obj, iterator, context) {
        var key;
        if (obj) {
            if (Core.isFunc(obj)){
                for (key in obj) {
                    if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            } else if (obj.each && obj.each !== Core.each) {
                obj.each(iterator, context);
            } else if (Core.isObj(obj) && Core.isNum(obj.length)) {
                for (key = 0; key < obj.length; key++)
                    iterator.call(context, obj[key], key);
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            }
        }
        return obj;
    };

    function Clock(interval)
    {
        if( typeof(interval) == "number" && interval > 0) var i = interval;
        else{
            throw new Error("<constructor>clock wait <number> to parameter.");
        }

        var t = null,a = null,debutfps,finfps,that = this;

        this.fps = 0;

        this.start = function()
        {
            var date = new Date();
            debutfps = date.getTime();
            t = setTimeout(that.restart,i);
        };

        this.restart = function()
        {
            if(a != null && typeof(a) == "function")
                a();

            var date = new Date();
            finfps = date.getTime();
            that.fps = Math.round(1000/(finfps - debutfps));

            if( (finfps - debutfps) >= i ){
                return that.start();
            }else{
                return t = setTimeout(that.start, i-(finfps - debutfps));
            }
        };

        this.stop = function()
        {
            clearTimeout(t);
        };

        this.setAction = function(action)
        {
            if(action != null && typeof(action) == "function"){
                a = action;
            }else{
                throw new Error("<method>setAction wait <function> to parameter.");
            }
        };

        this.start();
        return this;
    }

    Core.extend({
        Handler : function(){
            var that = this,
                interval = 1000/60;

            if(typeof(Buffer) == 'function' && typeof(Clock) == 'function'){
                this.buffer = new Buffer();
                this.clock = new Clock(interval);
                console.log(this.buffer,this.clock,this);
            }else{
                throw new Error("<constructor>clock and/or <constructor>buffer is wait");
            }

            this.getInterval = function(){
                return interval;
            };

            this.AddEvent = function(event){
                that.buffer.Add(event);
            };

            this.removeEvent = function(str)
            {
                that.buffer.remove(str);
            };

            this.unset = function()
            {
                that.buffer.setList([]);
            };

            this.setBreak = function()
            {
                that.clock.stop();
            };

            this.setReplay = function()
            {
                that.clock.start();
            };

            this.clock.setAction(function(){
                that.buffer.execBuffer();
            });
        }
    });

    window.Core = Core();

})(window);
