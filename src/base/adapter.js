//-----------------------------------------------------------------------------
// Adapter and Adapter factory
//-----------------------------------------------------------------------------
(function(XML3D) {

    XML3D.base = {
        toString: function() {
            return "base";
        }
    };

    /**
     * A normal adapter that doesn't need to be connected to a DOM node
     * @constructor
     * @param {XML3D.base.AdapterFactory} factory - the factory this adapter was created from
     */
    XML3D.base.Adapter = function(factory) {
        this.factory = factory;
    };

    /**
     * Connect an adapterHandle to a certain key.
     * This will enable the ConnectedAdapterNotifcations for notifyChanged.
     * @param {string} key - the key that will also be provided in connectAdapterChanged callback
     * @param {XML3D.base.AdapterHandle} adapterHandle handle of adapter to be added
     */
    XML3D.base.Adapter.prototype.connectAdapterHandle = function(key, adapterHandle) {
        if (!this.connectedAdapterHandles) {
            this.connectedAdapterHandles = {};
            this._bindedAdapterHandleCallback = adapterHandleCallback.bind(this);
        }

        this.disconnectAdapterHandle(key);

        if (adapterHandle) {
            this.connectedAdapterHandles[key] = adapterHandle;
            this.connectedAdapterHandles[key].addListener(this._bindedAdapterHandleCallback);
        }
        else
            delete this.connectedAdapterHandles[key];

    };

    /**
     * Disconnects the adapter handle from the given key.
     * @param {string} key - the key that was provided when this adapter handle was connected
     */
    XML3D.base.Adapter.prototype.disconnectAdapterHandle = function(key) {
        if (this.connectedAdapterHandles && this.connectedAdapterHandles[key]) {
            this.connectedAdapterHandles[key].removeListener(this._bindedAdapterHandleCallback);
            delete this.connectedAdapterHandles[key];
        }
    };

    /**
     * Disconnects all adapter handles.
     */
    XML3D.base.Adapter.prototype.clearAdapterHandles = function() {
        for (var i in this.connectedAdapterHandles) {
            this.connectedAdapterHandles[i].removeListener(this._bindedAdapterHandleCallback);
        }

        this.connectedAdapterHandles = {};
    };

    /**
     * Get the connected AdapterHandle of a certain key.
     * This will only return AdapterHandles previously added via connectAdapterHandle
     * @param {string} key
     * @return {?XML3D.base.AdapterHandle} the adapter of that key, or null if not available
     */
    XML3D.base.Adapter.prototype.getConnectedAdapterHandle = function(key) {
        return this.connectedAdapterHandles && this.connectedAdapterHandles[key];
    };

    /**
     * Get the connected adapter of a certain key.
     * This will only return adapters of AdapterHandles previously added via connectAdapter
     * @param {string} key
     * @return {?XML3D.base.Adapter} the adapter of that key, or null if not available
     */
    XML3D.base.Adapter.prototype.getConnectedAdapter = function(key) {
        var handle = this.getConnectedAdapterHandle(key);
        return handle && handle.getAdapter();
    };

    /**
     * This function is called, when the adapater is detached from the node.
     * At this point, the adapater should disconnect from any other adapter and prepare to be properly garbage collected
     */
    XML3D.base.Adapter.prototype.onDispose = function() {
    }


    /**
     * Internal function that converts an AdapterHandleNotification to a ConnectedAdapterNotification
     * @private
     * @param {XML3D.events.AdapterHandleNotification} evt
     */
    function adapterHandleCallback(evt) {
        for (var key in this.connectedAdapterHandles) {
            if (this.connectedAdapterHandles[key] == evt.adapterHandle) {
                var subEvent = new XML3D.events.ConnectedAdapterNotification(evt, key)
                this.notifyChanged(subEvent);
            }
        }
    };


    /**
     * An Adapter connected to a DOMNode (possibly of an external document)
     * @constructor
     * @param {XML3D.base.AdapterFactory} factory the AdapterFactory this adapter was created from
     * @param {Object} node - DOM node of this Adapter
     */
    XML3D.base.NodeAdapter = function(factory, node) {
        XML3D.base.Adapter.call(this, factory)
        this.node = node;
    };
    XML3D.createClass(XML3D.base.NodeAdapter, XML3D.base.Adapter);

    /**
     * called by the factory after adding the adapter to the node
     */
    XML3D.base.NodeAdapter.prototype.init = function() {
    };

    /**
     * Notifiction due to a change in DOM, related adapters and so on.
     * @param {XML3D.events.Notification} e
     */
    XML3D.base.NodeAdapter.prototype.notifyChanged = function(e) {

    };

    /**
     * @param {string|XML3D.URI} uri Uri to referred adapterHandle
     * @param {Object=} adapterType Optional: the type of adapter (use same adapter type by default)
     * @param {number=} canvasId Optional: the canvas id of the adapter (use canvas id of this adapter by default)
     * @returns an AdapterHandle to the referred Adapter of the same aspect and canvasId
     */
    XML3D.base.NodeAdapter.prototype.getAdapterHandle = function(uri, aspectType, canvasId) {
        canvasId = canvasId === undefined ? this.factory.canvasId : 0;
        return XML3D.base.resourceManager.getAdapterHandle(this.node.ownerDocument, uri,
            aspectType || this.factory.aspect, canvasId);
    };
    /**
     * notifies all adapter that refer to this adapter through AdapterHandles.
     * @param {number?} type The type of change
     */
    XML3D.base.NodeAdapter.prototype.notifyOppositeAdapters = function(type) {
        type = type || XML3D.events.ADAPTER_HANDLE_CHANGED;
        return XML3D.base.resourceManager.notifyNodeAdapterChange(this.node,
            this.factory.aspect, this.factory.canvasId, type);
    };

    /**
     * Depth-first traversal over element hierarchy
     * @param {function(NodeAdapter)} callback
     */
    XML3D.base.NodeAdapter.prototype.traverse = function(callback) {
        callback(this);
        var child = this.node.firstElementChild;
        while (child) {
            var adapter = this.factory.getAdapter(child);
            adapter && adapter.traverse(callback);
            child = child.nextElementSibling;
        }
    }


    /**
     * @interface
     */
    XML3D.base.IFactory = function() {
    };

    /** @type {string} */
    XML3D.base.IFactory.prototype.aspect;


    /**
     * An adapter factory is responsible for creating adapter from a certain data source.
     * Note that any AdapterFactory is registered with XML3D.base.resourceManager
     * @constructor
     * @implements {XML3D.base.IFactory}
     * @param {Object} aspect The aspect this factory serves (e.g. XML3D.data or XML3D.webgl)
     * @param {string|Array.<string>} mimetypes The mimetype this factory is compatible to
     * @param {number} canvasId The id of the corresponding canvas handler. 0, if not dependent on any CanvasHandler
     */
    XML3D.base.AdapterFactory = function(aspect, mimetypes, canvasId) {
        this.aspect = aspect;
        this.canvasId = canvasId || 0;
        this.mimetypes = typeof mimetypes == "string" ? [ mimetypes] : mimetypes;

        XML3D.base.registerFactory(this);
    };

    /**
     * Implemented by subclass
     * Create adapter from an object (node in case of an xml, and object in case of json)
     * @param {object} obj
     * @returns {?XML3D.base.Adapter} created adapter or null if no adapter can be created
     */
    XML3D.base.AdapterFactory.prototype.createAdapter = function(obj) {
        return null;
    };

    /**
     * Checks if the adapter factory supports specified mimetype. Can be overridden by subclass.
     * @param {String} mimetype
     * @return {Boolean} true if the adapter factory supports specified mimetype
     */
    XML3D.base.AdapterFactory.prototype.supportsMimetype = function(mimetype) {
        return this.mimetypes.indexOf(mimetype) != -1;
    };

    /**
     * A NodeAdaperFactory is a AdapterFactory, that works specifically for DOM nodes / elements.
     * @constructor
     * @implements {XML3D.base.AdapterFactory}
     * @param {Object} aspect The aspect this factory serves (e.g. XML3D.data or XML3D.webgl)
     * @param {number} canvasId The id of the corresponding canvas handler. 0, if not dependent on any CanvasHandler
     */
    XML3D.base.NodeAdapterFactory = function(aspect, canvasId) {
        XML3D.base.AdapterFactory.call(this, aspect, ["text/xml", "application/xml"], canvasId);
    };
    XML3D.createClass(XML3D.base.NodeAdapterFactory, XML3D.base.AdapterFactory);

    /**
     * This function first checks, if an adapter has been already created for the corresponding node
     * If yes, this adapter is returned, otherwise, a new adapter is created and returned.
     * @param {Object} node
     * @returns {XML3D.base.Adapter} The adapter of the node
     */
    XML3D.base.NodeAdapterFactory.prototype.getAdapter = function(node) {
        if(node && node._configured === undefined)
            XML3D.config.element(node, true);
        if (!node || node._configured === undefined)
            return null;

        var elemHandler = node._configured;
        var key = this.aspect + "_" + this.canvasId;
        var adapter = elemHandler.adapters[key];
        if (adapter !== undefined)
            return adapter;

        // No adapter found, try to create one
        adapter = this.createAdapter(node);
        if (adapter) {
            elemHandler.adapters[key] = adapter;
            adapter.init();
        }
        return adapter;
    };

    /**
     * This function sends single or multiple adapter functions by calling functions
     * specified in funcs parameter for each adapter associated with the node.
     *
     * funcs parameter is used as a dictionary where each key is used as name of a
     * adapter function to call, and corresponding value is a list of arguments
     * (i.e. must be an array). For example sendAdapterEvent(node, {method : [1,2,3]})
     * will call function 'method' with arguments 1,2,3 for each adapter of the node.
     *
     * @param {Object} node
     * @param {Object} funcs
     * @return {Array} array of all returned values
     */
    XML3D.base.callAdapterFunc = function(node, funcs) {
        var result = [];
        if (!node || node._configured === undefined)
            return result;
        var adapters = node._configured.adapters;
        for (var adapter in adapters) {
            for (var func in funcs) {
                var adapterObject = adapters[adapter];
                var eventHandler = adapterObject[func];
                if (eventHandler) {
                    result.push(eventHandler.apply(adapterObject, funcs[func]));
                }
            }
        }
        return result;
    };

    /**
     * This function sends single or multiple adapter events by calling functions
     * specified in events parameter for each adapter associated with the node.
     *
     * events parameter is used as a dictionary where each key is used as name of a
     * adapter function to call, and corresponding value is a list of arguments
     * (i.e. must be an array). For example sendAdapterEvent(node, {method : [1,2,3]})
     * will call function 'method' with arguments 1,2,3 for each adapter of the node.
     *
     * @param {Object} node
     * @param {Object} events
     * @return {Boolean} false if node is not configured.
     */
    XML3D.base.sendAdapterEvent = function(node, events) {
        if (!node || node._configured === undefined)
            return false;
        var adapters = node._configured.adapters;
        for (var adapter in adapters) {
            for (var event in events) {
                var eventHandler = adapters[adapter][event];
                if (eventHandler) {
                    eventHandler.apply(adapters[adapter], events[event]);
                }
            }
        }
        return true;
    };

}(window.XML3D));
