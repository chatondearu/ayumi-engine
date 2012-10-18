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
            console.log(Ayumi.handler);
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
    'use strict';

////////////////////////////////////

    /*
     * Set up global to Ayumi and all Modul
     *
     * Root
     * */
    var AyumiRoot,
    //Get all environment's arguments
        document = window.document,
        location = window.location,
        navigator = window.navigator,

    // Copy Jquery or Mootools Frameworks
        _Jquery = window.Jquery || (window.Jquery = {jquery:'none'}),
        _Mootools = window.Mootools || (window.Mootools = {version:'none'}),
        if_Jquery = !!(_Jquery.jquery != 'none'),
        if_Mootools = !!(_Mootools.version != 'none'),

    //Constante of Core params
        conf={
            //URL to the Server ReST
            SERVER : '../server/',
            DEBUG:true
        },

    //Set the local copy of Ayumi definition
        Ayumi = function(){
            return new Ayumi.fn.init(AyumiRoot);
        };

    /**
     * @name Ayumi.fn
     *
     * @description we Initialize Core Object and instantiates Core.fn
     * @type {Object}
     */
    Ayumi.fn = Ayumi.prototype = {
        constructor : Ayumi,
        init : function(AyumiRoot){
            return AyumiRoot = this;
        },
        // The current version of Ayumi being used
        core: "0.0.1",
        // The default length of a Ayumi object is 0
        length: 0
    };

    Ayumi.fn.init.prototype = Ayumi.fn;

    /***
     *  MODULE DE LOG --------------------------------------------------------------------------------------------------
     */

    /**
     * Ayumi.log()
     */
    function log(){
        if(!conf.DEBUG)
            return false;
        var message = Ayumi.fn,type = 'log',script=false;
        if(arguments.length>0){
            // log(message)
            if(arguments.length<2){
                message = arguments[0];
            }else{
                // log(type,message,log,log,log,[...])
                type = arguments[0];
                message = arguments[1];
                script=true;
            }
        }
        if(console){
            if(!script)
                console[type](message);
            else{
                if(console.group)
                    console.group(message);
                else console.log(message);

                for(var i= 2,l=arguments.length;i<l;i++)
                    console[type](arguments[i]);

                if(console.group)
                    console.groupEnd();
            }
        }else{
            alert('==='+type+'===\n'+message);
        }
        return true;
    }
    //Add log at Core for later
    Ayumi.log = Ayumi.fn.log = log;

    /***
     *  END MODULE DE LOG ----------------------------------------------------------------------------------------------
     */

    /***
     *  TOOLS FUNCTIONS ------------------------------------------------------------------------------------------------
     */

    /**
     * @name Ayumi.tools.isFunc()
     *
     * @description return if value is a function
     *
     * @param value
     * @return {Boolean}
     */
    function isFunc(value){return typeof value == 'function';}

    /**
     * @name Ayumi.tools.isNum()
     *
     * @description return if value is a Number
     *
     * @param value
     * @return {Boolean}
     */
    function isNum(value){return typeof value == 'number'}

    /**
     * @name Ayumi.tools.isFunc()
     *
     * @description return if value is a String
     *
     * @param value
     * @return {Boolean}
     */
    function isStr(value){return typeof value == 'string'}

    /**
     * @name Ayumi.tools.isObj()
     *
     * @description return if value is a Object
     *
     * @param value
     * @return {Boolean}
     */
    function isObj(value){return typeof value == 'object'}

    /**
     * @name Ayumi.tools.isUndef()
     *
     * @description return if the type of value is undefined
     *
     * @param value
     * @return {Boolean}
     */
    function isUndef(value) {return typeof(value)=='undefined'}

    /**
     * @name Ayumi.tools.toInt()
     *
     * @description return String into Integer
     *
     * @param str{String}
     * @return {Number}
     */
    function toInt(str) {return parseInt(str, 10)}

    /**
     * @name Ayumi.tools.toStr()
     *
     * @description return value into Strong
     *
     * @param value
     * @return {String}
     */
    function toStr(value) {return value+''}

    /**
     * @name Ayumi.tools.random()
     *
     * @description return a random value between min and max
     *
     * @param min
     * @param max
     * @return {Number}
     */
    function random(min,max){return min + ( Math.random() * (Math.abs(min)+Math.abs(max)) )}

    /**
     * @name Ayumi.tools
     * @type {Object}
     */
    var tools = {
        isFunc:isFunc,
        isNum:isNum,
        isStr:isStr,
        isObj:isObj,
        isUndef:isUndef,
        toInt :toInt,
        toStr :toStr,
        random :random
    };
    //Add extend at Ayumi for later
    Ayumi.tools = Ayumi.fn.tools = tools;
    Ayumi.extend(Ayumi.tools);

    /***
     *  END TOOLS FUNCTIONS --------------------------------------------------------------------------------------------
     */

    /***
     * @name Ayumi.each()
     *
     * @param obj
     * @param iterator
     * @param context
     * @return {*}
     */
    function each(obj,iterator,context) {
        var key;
        if (arguments.length===1){
            obj = this;
            iterator = arguments[0];
        }else if (arguments.length===2){
            obj = arguments[0];
            iterator = arguments[1];
        }
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
        return obj;
    }
    //Add extend at Ayumi for later
    Ayumi.each = Ayumi.fn.each = each;
    if(!if_Mootools)Object.prototype.each = Ayumi.each; //Set compatibility for Mootools

    /***
     * @name Ayumi.extend
     *
     * @return {*}
     */
    function extend(obj) {
        var extObj = null;
        if(arguments.length == 2)
            extObj= arguments[1];
        if(arguments.length === 1){
            var options = arguments[0];
                obj = this;
            extend(obj,options);
        }else if(arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        }else{
            extObj.each(function(ext,key){
                obj[key] = ext;
            });
        }
        return obj;
    }
    //Add extend at Ayumi for later
    Ayumi.extend = Ayumi.fn.extend = extend;
    if(!if_Mootools)Object.prototype.extend = Ayumi.extend;

    //TODO Actuellement function, Transformation requete ajax en Module avec gestion de queue
    /**
     * @name Ayumi.ajax
     *
     * @param uri
     * @param callback
     */
    function ajax(uri,callback){
        var _request =null;
        if(!isFunc(callback))
            callback = function(){};
        if(window.Request){
            _request = new Request({
                url: uri,
                method: 'post',
                format: 'json',
                async: true,
                noCache : true,
                onSuccess: function(data){
                    log('info','request to '+uri+' success with data :',data);
                    return callback(data);
                },
                onFailure: function(data){
                    log('info','request to '+uri+' is complete');
                    return callback(data);
                },
                onCancel: function(data){
                    log('warn','request to '+uri+' is canceled');
                    return callback(data);
                }
            });
            //TODO retour de l'objet compatible seulement mootools, prévus évolution avec gestionnaire de queue ajax
            return _request;
        }
    }
    //Add ajax at Ayumi for later
    Ayumi.ajax = Ayumi.fn.ajax = ajax;


    /***
     * LIST ------------------------------------------------------------------------------------------------------------
     */

    /**
     * Class {List}
     *
     * /// methods
     * List::add(object {Object})
     * List::remove(object {Object})
     * List::getNext(o {Object})
     * List::getParent(o {Object})
     * List::getByName(o {Object})
     * List::parcour(callback {function}, limit {int})
     *
     * @description gesture of Object's pile with next and parent elements.
     * @constructor
     */
    function List(prefix){

        var that = this;
        this.prefix = prefix || 'list';
        this.first = null;
        this.last = null;
        this.length = 0;

        this.add = function(name,objet){
            if(!isStr(name)){
                objet = name;
                var date = new Date();
                name = date.getTime()+ "rnd" + random(0,1000);
            }
            if(that.first == null){
                objet[prefix+'_name'] = name;
                that.first = objet;
                that.last = objet;
            }
            else{
                objet[prefix+'_name'] = name;
                if(!that.getNext(that.last))
                    that.last[prefix+'_next'] = objet;
                if(!that.getParent(objet))
                    objet[prefix+'_parent'] = that.last;
                that.last = objet;
            }
            that.length ++;
            return that.last;
        };

        this.remove = function(objet){
            var parent = that.getParent(objet);
            var next = that.getNext(objet);
            if(parent && next){
                next[prefix+'_parent'] = parent;
                parent[prefix+'_next'] = next;
            }else if(next && !parent){
                next[prefix+'_parent'] = null;
                that.first = next;
            }else if(parent && !next){
                parent[prefix+'_next'] = null;
                that.last = parent;
            }else{
                that.last = null;
                that.first = null;
            }
            objet = null;
            that.length --;
        };

        this.getNext = function(o){
            if(o != null && typeof(o[prefix+'_next']) != "undefined" && o[prefix+'_next'] != null )
                return o[prefix+'_next'];
            else
                return false;
        };
        this.getParent = function(o){
            if(o != null && typeof(o[prefix+'_parent']) != "undefined" && o[prefix+'_parent'] != null )
                return o[prefix+'_parent'];
            else
                return false;
        };

        this.getByName = function(name){
            var obj = that.first;
            while( !isUndef(obj) && obj != null){
                if(obj[prefix+'_name'] == name){
                    return obj;
                }else{
                    obj = obj[prefix+'_next'];
                }
            }
            return false;
        };

        this.parcour = function(callback,limit){
            if(typeof(callback) != "function")
                callback = function(){};
            var obj = that.first;

            var i = 0;

            while( !isUndef(obj) && obj != null){

                if(i > limit)
                    break;

                callback(obj);

                obj = obj[prefix+'_next'];
            }
        };
    }
    /***
     *  END LIST -------------------------------------------------------------------------------------------------------
     */

    /***
     * MODULE HANDLER --------------------------------------------------------------------------------------------------
     */

    /**
     * @name Ayumi.handler.clock
     *
     * @description Clock object implements a loop with a setTimeOut() and "interval" passed as a parameter
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
     * @name Class Event
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
     * @name Ayumi.handler.buffer
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
                return index ++;
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
            b.each(function(obj){
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
     * @name Ayumi.hanlder
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
    Ayumi.handler = Ayumi.fn.handler = new Handler;

    /***
     *  END MODULE HANDLER ---------------------------------------------------------------------------------------------
     */

    /***
     *  MODULE Event ---------------------------------------------------------------------------------------------------
     * Dependency :: Module Handler
     */

    //event ajoute un event unique listener à un object
    /**
     * @name Ayumi.event
     *
     * @description Set a Listener on an Object, when the conditions required is true the callback is called
     *
     * @param name
     * @param conditions
     * @param action
     */
    function event(name,conditions,action){
        var me = this;
        if(isObj(this)){
            eval("this.extend({"+name+":action});");
            Ayumi.handler.addEvent("event_"+this.name+"_"+name,function(){
                if(eval(conditions)){
                    action(me);
                    Ayumi.handler.removeEvent("event_"+me.name+"_"+name);
                }
            });
        }else
            throw new Error("Can't add event as no Object");
    }
    Ayumi.event = Ayumi.fn.event = event;
    if(!if_Mootools)Object.prototype.event = Ayumi.event;

    /***
     *  END MODULE Event -----------------------------------------------------------------------------------------------
     */

    /***
     *  MODULE Animate -------------------------------------------------------------------------------------------------
     * @dependency :: Module Handler
     */

    function Animate(){
        //TODO en préparation ;) so good
    }

    /***
     *  END MODULE Animate ---------------------------------------------------------------------------------------------
     */

    function Loader(){

    }

    function Screen(){

    }


    //Add all Function and Object at external Ayumi instance
    Ayumi.fn.extend({
        screen : Screen,
        animate : Animate,
        loader : Loader
    });


    window.Ayumi = Ayumi();

})(window);

