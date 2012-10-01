/**
 *
 * no-detail
 *
 * <p>***</p>
 *
 * @name Ayumi Engine
 * @author Romain Lienard <sxmcrow@iwantgeek.com>
 * @http: https://bitbucket.org/iwantgeek/ayumi
 * @copyright (c)2012 IwantGeek
 * @version 0.0.1
 * @package ***
 * @date: 28/09/2012
 * @time: 10:13
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
 *
 *  Use Exemple :::

    (function(window, undefined){

        var Game,
            document = window.document,
            location = window.location,
            navigator = window.navigator;


        Game = function(){
            var i = 0;
            console.log(Core.handler);
            Ayumi.handler.AddEvent('test',function(){
                if(i++<6)
                    console.log('toto');
            });
        };

        window.Game = new Game();

        window.addEventListener('click',function(){
            console.log('stop');
            Ayumi.handler.break();
        });

    })(window);

 *
 *
 **/

(function(window, undefined){

    var AyumiRoot,
    //Get all environment's arguments
        document = window.document,
        location = window.location,
        navigator = window.navigator,

    //Set the local copy of Ayumi definition
        Ayumi = function(){
            return new Ayumi.fn.init(AyumiRoot);
        };

    Ayumi.fn = Ayumi.prototype = {
        constructor : Ayumi,
        init : function(AyumiRoot){
            return this;
        },
        // The current version of Ayumi being used
        core: "0.0.1",
        // The default length of a Ayumi object is 0
        length: 0
    };

    Ayumi.fn.init.prototype = Ayumi.fn;

    //Starting tools
    function isFunc(value){return typeof value == 'function';}
    function isNum(value){return typeof value == 'number'}
    function isStr(value){return typeof value == 'string'}
    function isObj(value){return typeof value == 'object'}
    function int(str) {return parseInt(str, 10)}
    function str(value) {return value+''}

    /**
     * Ayumi.tools
     * @type {Object}
     */
    var tools = {
        isFunc:isFunc,
        isNum:isNum,
        isStr:isStr,
        isObj:isObj,
        int :int
    };
    //Add extend at Ayumi for later
    Ayumi.tools = Ayumi.fn.tools = tools;

    /***
     * Ayumi.each
     *
     * @param obj
     * @param iterator
     * @param context
     * @return {*}
     */
    function each(obj, iterator, context) {
        var key;
        if (obj) {
            if (isFunc(obj)){
                for (key in obj) {
                    if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            } else if (obj.each && obj.each !== Ayumi.each) {
                obj.each(iterator, context);
            } else if (isObj(obj) && isNum(obj.length)) {
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
    }
    //Add extend at Ayumi for later
    Ayumi.each = Ayumi.fn.each = each;

    /***
     * Ayumi.extend
     *
     * @param obj
     * @param extObj
     * @return {*}
     */
    function extend(obj, extObj) {
        if(arguments.length === 1){
            var options = arguments[0];
            obj =  Ayumi.fn;
            extend(obj,options);
        }else if(arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        }else{
            Ayumi.each(extObj,function(ext,key){
                obj[key] = ext;
            });
        }
        return obj;
    }
    //Add extend at Ayumi for later
    Ayumi.extend = Ayumi.fn.extend = extend;

    /**
     * Ayumi.handler.clock
     *
     * Clock object implements a loop with a setTimeOut() and "interval" passed as a parameter
     * this loop indefinitely repeat an action that time is the Clock does not pause.
     * generally the Clock will be managed by Ayumi Handler
     *
     * @param interval
     * @return {*}
     * @constructor
     */
    function Clock(interval)
    {
        if( typeof(interval) == "number" && interval > 0) var i = interval;
        else{
            throw new Error("<constructor>clock wait <number> to parameter.");
        }

        var t = null,a = null,debutfps,finfps,that = this;
        this.fps = 0;

        /* Start the Clock */
        this.start = function(){
            var date = new Date();
            debutfps = date.getTime();
            t = setTimeout(that.restart,i);
        };

        /* Restart the Clock if clock pause */
        this.restart = function(){
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

        /* Stop the clock */
        this.stop = function(){
            clearTimeout(t);
        };

        /* Set an repeated action at the end of all loop */
        this.setAction = function(action){
            if(action != null && typeof(action) == "function"){
                a = action;
            }else{
                throw new Error("<method>setAction wait <function> to parameter.");
            }
        };

        this.start();
        return this;
    }

    /***
     * Class Event
     *
     * @param name
     * @param doEvent
     * @constructor
     */
    function Event(name,doEvent){
        this.id = null;
        if( typeof(name) == "string" )
            this.name = name;
        else
            throw new Error("<constructor>clock wait <string> to parameter name.");
        if( typeof(doEvent) == "function" )
            this.event = doEvent;
        else
            throw new Error("<constructor>clock wait <function> to parameter name.");
    }

    /***
     * Ayumi.handler.buffer
     *
     * @constructor
     */
    function Buffer()
    {
        var that = this;
        var b = [];
        var index = 1;

        this.Add = function(e){
            console.log(e.constructor);
            if( e.constructor == Event ){
                e.id = index;
                b[b.length] = e;
                index ++;
                return index;
            }else{
                throw new Error("<method>Add wait <function> to parameter.");
            }
        };

        this.remove = function(str){
            var e = that.getIdOfList(str);
            if( e.constructor == Number){
                for(var i = e; i < ( b.length - 1); i++ ){
                    b[i]=b[i+1];
                }
                b.pop();
                index --;
            }
        };

        this.getIdOfList = function(id){
            var e = false,i= 0,l=0;
            switch(typeof(id)){
                case "number":
                    for(i=0,l=b.length; i < l ;i++){
                        if( id == b[i].id ){
                            e = i;
                            return e;
                        }
                    }
                    return false;
                    break;
                case "string":
                    for(i=0,l=b.length; i < l ;i++){
                        if( id == b[i].name ){
                            e = i;
                            return e;
                        }
                    }
                    return false;
                    break;
                default:
                    throw new Error("<method>getIdOfList wait <string> or <number> to parameter.");
                    break;
            }
        };

        this.execBuffer = function(){
            Ayumi.each(b,function(obj){
                if(obj.hasOwnProperty('event'))
                    obj.event();
            });
            return true;
        };

        this.getList = function(){
            return b;
        };

        this.setList = function(array){
            if(typeof(array) == "array")
            //TODO setList verifier si le contenus de l'array vient bien du constructeur Event.
                b = array;
            else
                throw new Error("<method>setList wait <array> of <Event> to parameter.");
        };
    }

    /***
     * Ayumi.hanlder
     *
     * @constructor
     */
    function Handler()
    {
        var that = this,
            interval = 1000/60;

        if(isFunc(Buffer) && isFunc(Clock)){
            this.clock = new Clock(interval);
            this.buffer = new Buffer();
        }else{
            throw new Error("<constructor>clock and/or <constructor>buffer is wait");
        }

        this.getInterval = function(){ return interval; };

        this.AddEvent = function(name,action){
            that.buffer.Add(new Event(name,action));
        };

        this.removeEvent = function(str){ that.buffer.remove(str); };

        this.unset = function(){ that.buffer.setList([]); };

        this.break = function(){ that.clock.stop(); };

        this.play = function(){ that.clock.start(); };

        this.clock.setAction(function(){ that.buffer.execBuffer(); });

        return this;
    }

    //Add all Function and Object at external Ayumi instance
    Ayumi.extend({
        handler : new Handler()
    });


    window.Ayumi = Ayumi();

})(window);

