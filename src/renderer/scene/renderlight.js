(function(webgl) {

    /** @const */
    var XML3D_DIRECTIONALLIGHT_DEFAULT_DIRECTION = XML3D.math.vec3.fromValues(0,0,-1);
    /** @const */
    var XML3D_SPOTLIGHT_DEFAULT_DIRECTION = XML3D.math.vec3.fromValues(0,0,1);

    /** @const */
    var LIGHT_DEFAULT_INTENSITY = XML3D.math.vec3.fromValues(1,1,1);
    /** @const */
    var LIGHT_DEFAULT_ATTENUATION = XML3D.math.vec3.fromValues(0,0,1);
    /** @const */
    var SPOTLIGHT_DEFAULT_FALLOFFANGLE = Math.PI / 4.0;
    /** @const */
    var SPOTLIGHT_DEFAULT_SOFTNESS = 0.0;

    /** @const */
    var LIGHT_PARAMETERS = ["intensity", "attenuation", "softness", "falloffAngle", "direction", "position"];

    /** @const */
    var ENTRY_SIZE = 16;

    /**
     * @constructor
     * @param {Scene} scene
     * @param {Object} pageEntry
     * @param {Object} opt
     * @extends {RenderNode}
     */
    var RenderLight = function(scene, pageEntry, opt) {
        XML3D.webgl.RenderNode.call(this, webgl.Scene.NODE_TYPE.LIGHT ,scene, pageEntry, opt);
        opt = opt || {};
        var light = opt.light || {};
        this.light = {
            type : light.type || "directional",
            data : light.data
        }
        this.intensity   = XML3D.math.vec3.clone(LIGHT_DEFAULT_INTENSITY);
        this.srcPosition    = XML3D.math.vec3.fromValues(0,0,0);
        this.srcDirection   = XML3D.math.vec3.clone(XML3D_DIRECTIONALLIGHT_DEFAULT_DIRECTION);
        this.position    = XML3D.math.vec3.fromValues(0,0,0);
        this.direction   = XML3D.math.vec3.clone(XML3D_DIRECTIONALLIGHT_DEFAULT_DIRECTION);
        this.attenuation = XML3D.math.vec3.clone(LIGHT_DEFAULT_ATTENUATION);

        if (this.light.data) {
            // Bounding Box annotated
            this.lightParameterRequest = new Xflow.ComputeRequest(
                this.light.data, LIGHT_PARAMETERS, this.lightParametersChanged.bind(this));
            this.lightParametersChanged(this.lightParameterRequest, null);
        } else {
            XML3D.debug.logWarning("External light shaders not supported yet"); // TODO
        }

        this.localIntensity = opt.localIntensity !== undefined ? opt.localIntensity : 1.0;
        this.addLightToScene();
    };
    RenderLight.ENTRY_SIZE = ENTRY_SIZE;

    XML3D.createClass(RenderLight, webgl.RenderNode);
    XML3D.extend(RenderLight.prototype, {

        addLightToScene : function() {
            var lightEntry = this.scene.lights[this.light.type];
            if (Array.isArray(lightEntry)) {
                lightEntry.push(this);
                this.updateWorldMatrix(); // Implicitly fills light position/direction
                this.lightStructureChanged();
            } else {
                XML3D.debug.logError("Unsupported light shader script: urn:xml3d:lightshader:" + this.light.type);
            }
        },
        removeLightFromScene : function() {
            var container = this.scene.lights[this.light.type];
            if (Array.isArray(container)) {
                container = container.splice(this);
                this.lightStructureChanged();
            }
        },
        lightParametersChanged: function(request, changeType) {
            // console.log("Light parameters have changed", arguments);
            var result = request.getResult();
            if (result) {
                var entry = result.getOutputData("intensity");
                entry && XML3D.math.vec3.copy(this.intensity, entry.getValue());
                entry = result.getOutputData("attenuation");
                entry && XML3D.math.vec3.copy(this.attenuation, entry.getValue());
                entry = result.getOutputData("position");
                entry && XML3D.math.vec3.copy(this.srcPosition, entry.getValue());
                entry = result.getOutputData("direction");
                entry && XML3D.math.vec3.copy(this.srcDirection, entry.getValue());
                this.updateWorldMatrix();
                changeType && this.lightValueChanged();
            }
        },
        lightValueChanged: function() {
            this.scene.dispatchEvent({ type: webgl.Scene.EVENT_TYPE.LIGHT_VALUE_CHANGED, light: this });
        },
        lightStructureChanged: function() {
            this.scene.dispatchEvent({ type: webgl.Scene.EVENT_TYPE.LIGHT_STRUCTURE_CHANGED, light: this });
        },
        getLightData: function(target, offset) {
            var off3 = offset*3;
            ["position", "direction", "attenuation"].forEach( function(name) {
                if(target[name]) {
                    target[name][off3+0] = this[name][0];
                    target[name][off3+1] = this[name][1];
                    target[name][off3+2] = this[name][2];
                }
            }, this);
            if (target["intensity"]) {
                target["intensity"][off3+0] = this.intensity[0] * this.localIntensity;
                target["intensity"][off3+1] = this.intensity[1] * this.localIntensity;
                target["intensity"][off3+2] = this.intensity[2] * this.localIntensity;
            }
            if (target["on"]) {
                target["on"][offset] = this.visible;
            }
            var result;
            var data;
            if (target["softness"]) {
                target["softness"][offset] = SPOTLIGHT_DEFAULT_SOFTNESS;
                if (this.light.data) {
                    result = this.lightParameterRequest.getResult();
                    data = result.getOutputData("softness");
                    target["softness"][offset] = data ? data.getValue()[0] : SPOTLIGHT_DEFAULT_SOFTNESS;
                }
            }
            if (target["falloffAngle"]) {
                target["falloffAngle"][offset] = SPOTLIGHT_DEFAULT_FALLOFFANGLE;
                if (this.light.data) {
                    result = this.lightParameterRequest.getResult();
                    data = result.getOutputData("falloffAngle");
                    target["falloffAngle"][offset] = data ? data.getValue()[0] : SPOTLIGHT_DEFAULT_FALLOFFANGLE;
                }
            }
        },

        setTransformDirty: function() {
            this.updateWorldMatrix();
        },

        updateWorldMatrix: (function() {
            var tmp_mat = XML3D.math.mat4.create();
            return function() {
                if(this.parent){
                    this.parent.getWorldMatrix(tmp_mat);
                    this.setWorldMatrix(tmp_mat);
                    this.updateLightTransformData(tmp_mat);
                }
            }
        })(),

        updateLightTransformData: function(transform) {
            switch (this.light.type) {
                case "directional":
                    XML3D.math.vec3.copy(this.direction, this.applyTransformDir(this.srcDirection, transform));
                    break;
                case "spot":
                    XML3D.math.vec3.copy(this.direction, this.applyTransformDir(this.srcDirection, transform));
                    XML3D.math.vec3.copy(this.position, this.applyTransform(this.srcPosition, transform));
                    break;
                case "point":
                    XML3D.math.vec3.copy(this.position, this.applyTransform(this.srcPosition, transform));
            }
            this.lightValueChanged();
        },

        applyTransform: function(vec, transform) { // TODO: closure
            var newVec = XML3D.math.vec4.transformMat4(XML3D.math.vec4.create(), [vec[0], vec[1], vec[2], 1], transform);
            return [newVec[0]/newVec[3], newVec[1]/newVec[3], newVec[2]/newVec[3]];
        },

        applyTransformDir: function(vec, transform) { // TODO: closure
            var newVec = XML3D.math.vec4.transformMat4(XML3D.math.vec4.create(), [vec[0], vec[1], vec[2], 0], transform);
            return [newVec[0], newVec[1], newVec[2]];
        },

        setLocalVisible: function(newVal) {
            this.localVisible = newVal;
            if (newVal === false) {
                this.visible = false;
                this.lightValueChanged();
            } else {
                this.setVisible(this.parent.isVisible());
            }
        },

        setVisible: function(newVal) {
            if (this.localVisible !== false) {
                this.visible = newVal;
                this.lightValueChanged();
            }
        },

        setLocalIntensity: function(intensity) {
            this.localIntensity = intensity;
            this.lightValueChanged();
        },

        setLightType: function(type) {
            type = type || "directional";
            if(type != this.light.type) {
                this.removeLightFromScene();
                this.light.type = type;
                this.addLightToScene();
            }
        },
        remove: function() {
            this.parent.removeChild(this);
            this.removeLightFromScene();
        },

        getWorldSpaceBoundingBox: function(bbox) {
            XML3D.math.bbox.empty(bbox);
        }

    });

    webgl.RenderLight = RenderLight;


})(XML3D.webgl);
