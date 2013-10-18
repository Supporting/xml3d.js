(function (webgl) {

    var PickObjectRenderPass = function (pipeline, output, opt) {
        webgl.BaseRenderPass.call(this, pipeline, output, opt);
    };
    XML3D.createClass(PickObjectRenderPass, webgl.BaseRenderPass);

    XML3D.extend(PickObjectRenderPass.prototype, {
        render: (function () {

            var c_mvp = XML3D.math.mat4.create(),
                c_uniformCollection = {envBase: {}, envOverride: null, sysBase: {}},
                c_systemUniformNames = ["id", "modelViewProjectionMatrix"];

            return function (scene) {
                var gl = this.pipeline.context.gl,
                    target = this.pipeline.getRenderTarget(this.output);
                target.bind();

                gl.enable(gl.DEPTH_TEST);
                gl.disable(gl.CULL_FACE);
                gl.disable(gl.BLEND);

                gl.viewport(0, 0, target.getWidth(), target.getHeight());
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

                scene.updateReadyObjectsFromActiveView(target.getWidth() / target.getHeight());


                var program = this.pipeline.context.programFactory.getPickingObjectIdProgram();
                program.bind();
                var objects = scene.ready;

                for (var j = 0, n = objects.length; j < n; j++) {
                    var obj = objects[j];
                    var mesh = obj.mesh;

                    if (!obj.isVisible())
                        continue;

                    obj.getModelViewProjectionMatrix(c_mvp);

                    var objId = j + 1;
                    var c1 = objId & 255;
                    objId = objId >> 8;
                    var c2 = objId & 255;
                    objId = objId >> 8;
                    var c3 = objId & 255;

                    c_uniformCollection.sysBase["id"] = [c3 / 255.0, c2 / 255.0, c1 / 255.0];
                    c_uniformCollection.sysBase["modelViewProjectionMatrix"] = c_mvp;

                    program.setUniformVariables(null, c_systemUniformNames, c_uniformCollection);
                    mesh.draw(program);
                }
                program.unbind();
                target.unbind();
            };
        }()),

        /**
         * Reads pixels from the screenbuffer to determine picked object or normals.
         *
         * @param {number} x Screen Coordinate of color buffer
         * @param {number} y Screen Coordinate of color buffer
         * @param {XML3D.webgl.GLScene} scene Scene
         * @returns {XML3D.webgl.RenderObject|null} Picked Object
         */
        getRenderObjectFromPickingBuffer: function (x, y, scene) {
            var data = this.readPixelDataFromBuffer(x, y, this.pipeline.getRenderTarget(this.output));

            if (!data)
                return null;

            var result = null;
            var objId = data[0] * 65536 + data[1] * 256 + data[2];

            if (objId > 0) {
                var pickedObj = scene.ready[objId - 1];
                result = pickedObj;
            }
            return result;
        }
    });

    webgl.PickObjectRenderPass = PickObjectRenderPass;

}(XML3D.webgl));
