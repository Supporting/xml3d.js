(function(){


Xflow.shaderConstant = {}
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.OBJECT_ID] = "objectID";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.SCREEN_TRANSFORM] = "screenTransform";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.SCREEN_TRANSFORM_NORMAL] = "screenTransformNormal";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.VIEW_TRANSFORM] = "viewTransform";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.VIEW_TRANSFORM_NORMAL] = "viewTransformNormal";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.WORLD_TRANSFORM] = "worldTransform";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.WORLD_TRANSFORM_NORMAL] = "worldTransformNormal";

Xflow.setShaderConstant = function(type, name){
    Xflow.shaderConstant[type] = name;
}


/**
 * The output configuration of a VertexShader generated by Xflow.
 * @constructor
 */
Xflow.VSConfig = function(){
    this._attributes = {};
    this._blockedNames = [];
    this._addInput = {};
    this._addOutput = {};
    this._codeFragments = [];
    this._outputChanneling = {};
};

Xflow.VSConfig.prototype.addAttribute = function(type, name, optional){
    this._attributes[name] = {type: type, optional: optional, channeling: []};
}

Xflow.VSConfig.prototype.channelAttribute = function(inputName, outputName, code){
    this._attributes[inputName].channeling.push( { outputName : outputName, code : code });
}

Xflow.VSConfig.prototype.addInputParameter = function(type, name, uniform){
    if(this._addInput[name])
        return;
    this._addInput[name] = { type: type, uniform: uniform };
    this._blockedNames.push(name);
}
Xflow.VSConfig.prototype.addOutputParameter = function(type, name){
    if(this._addOutput[name])
        return;
    this._addOutput[name] = { type: type };
    this._blockedNames.push(name);
}
Xflow.VSConfig.prototype.addCodeFragment = function(codeFragment){
    this._codeFragments.push(codeFragment);
}

Xflow.VSConfig.prototype.addBlockedName = function(name){
    this._blockedNames.push(name);
}

Xflow.VSConfig.prototype.getBlockedNames = function(){
    return this._blockedNames;
}

Xflow.VSConfig.prototype.getFilter = function(){
    return Object.keys(this._attributes);
}
Xflow.VSConfig.prototype.getKey = function(){
    var key = "";
    for(var name in this._attributes){
        var attr = this._attributes[name];
        key += ";" + attr.type + "," + name + "," + attr.optional;
    }
    return key;
}

var c_vs_operator_cache = {};

Xflow.VSConfig.prototype.getOperator = function(){
    var key = this.getKey();
    if(c_vs_operator_cache[key])
        return c_vs_operator_cache[key];

    var outputs = [], params = [], glslCode = "\t// VS Connector\n";

    for(var name in this._attributes){
        var attr = this._attributes[name];
        var type = Xflow.getTypeName(attr.type);
        outputs.push( { type: type, name: name} );
        params.push( { type: type, source: name, optional: attr.optional} );
    }
    var operator = Xflow.initAnonymousOperator({
        outputs: outputs,
        params:  params,
        evaluate_glsl: glslCode
    });
    c_vs_operator_cache[key] = operator;
    return operator;
}

Xflow.VertexShader = function(programData){
    this._programData = programData;
    this._glslCode = null;
    this._inputNames = [];
    this._outputNames = [];
    this._inputInfo = {};
    this._outputInfo = {};
}

Object.defineProperty(VSDataResult.prototype, "inputNames", {
    set: function(v){
        throw new Error("inputNames is readonly");
    },
    get: function(){ return this._inputNames; }
});


Xflow.VertexShader.prototype.isInputUniform = function(name){
    return this._inputInfo[name].uniform;
}
Xflow.VSProgram.prototype.getInputData = function(name){
    return this._programData.getDataEntry(this._inputInfo[name].index);
}
Xflow.VertexShader.prototype.isOutputFragmentUniform = function(name){
    return this._outputInfo[name].iteration == Xflow.ITERATION_TYPE.ONE;
}
Xflow.VertexShader.prototype.getOutputData = function(name){
    return this._programData.getDataEntry(this._outputInfo[name].index);
}
Xflow.VertexShader.prototype.getOutputType = function(name){
    return this._outputInfo[name].type;
}
Xflow.VertexShader.prototype.getOutputSourceName = function(name){
    return this._outputInfo[name].sourceName;
}



}());