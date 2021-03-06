(function (ns) {

    var singleton = null;

    var SYSTEM_CONTEXT_TEMPLATE = {
        "type": "object",
        "kind": "any",
        "info": {
            "coords": { "type": "object", "kind": "float3", "source": "uniform" },
            "viewMatrix": { "type": "object", "kind": "matrix4", "source": "uniform" },

            "MAX_POINTLIGHTS": { "type": "int", "source": "constant", "staticValue": 5 },
            "pointLightOn": { "type": "array", "elements": { "type": "boolean" }, "staticSize": 5, "source": "uniform"},
            "pointLightAttenuation": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "pointLightIntensity": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "pointLightPosition": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },

            "MAX_DIRECTIONALLIGHTS": { "type": "int", "source": "constant", "staticValue": 5 },
            "directionalLightOn": { "type": "array", "elements": { "type": "boolean" }, "staticSize": 5, "source": "uniform"},
            "directionalLightIntensity": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "directionalLightDirection": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },

            "MAX_SPOTLIGHTS": { "type": "int", "source": "constant", "staticValue": 5 },
            "spotLightOn": { "type": "array", "elements": { "type": "boolean" }, "staticSize": 5, "source": "uniform"},
            "spotLightAttenuation": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "spotLightIntensity": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "spotLightPosition": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "spotLightDirection": {
                "type": "array", "elements": { "type": "object", "kind": "float3" }, "staticSize": 5,
                "source": "uniform"
            },
            "spotLightCosFalloffAngle": {
                "type": "array", "elements": { "type": "number" }, "staticSize": 5,
                "source": "uniform"
            },
            "spotLightCosSoftFalloffAngle": {
                "type": "array", "elements": { "type": "number" }, "staticSize": 5,
                "source": "uniform"
            }
        }
    };

    function createSystemConfiguration(context) {
        var result = SYSTEM_CONTEXT_TEMPLATE;
        var ext = context.getExtensionByName(ns.GLContext.EXTENSIONS.STANDARD_DERIVATES);
        if (ext) {
            result.info.fwidth = { type: Shade.TYPES.FUNCTION };
            result.info.dFdx = { type: Shade.TYPES.FUNCTION };
            result.info.dFdy = { type: Shade.TYPES.FUNCTION };
        }
        return result;
    }


    ns.getJSSystemConfiguration = function (context) {
        if (!singleton) {
            singleton = createSystemConfiguration(context);
        }
        return singleton;
    };


}(XML3D.webgl));

