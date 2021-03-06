(function(webgl){

    /**
     * @param {GLContext} context
     * @constructor
     */
    var DrawableFactory = function(context) {
        this.context = context;

    };

    XML3D.extend(DrawableFactory.prototype, {
        createDrawable: function(obj) {
            XML3D.debug.logDebug("DrawableFactory::createDrawable", obj);
            var result = new webgl.MeshClosure(this.context, obj.getType(), obj.getDataNode(), { boundingBoxChanged: obj.setObjectSpaceBoundingBox.bind(obj)});
            obj.mesh = result.getMesh();
            return result;
        }
    });

    webgl.DrawableFactory = DrawableFactory;


}(XML3D.webgl));
