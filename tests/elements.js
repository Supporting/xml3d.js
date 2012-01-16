module("Element interface tests", {
});

test("&lt;xml3d&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "xml3d");
	ok(e, "xml3d exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.onclick, "object", "onclick is of type 'object'");
	equals(typeof e.ondblclick, "object", "ondblclick is of type 'object'");
	equals(typeof e.onmousedown, "object", "onmousedown is of type 'object'");
	equals(typeof e.onmouseup, "object", "onmouseup is of type 'object'");
	equals(typeof e.onmouseover, "object", "onmouseover is of type 'object'");
	equals(typeof e.onmousemove, "object", "onmousemove is of type 'object'");
	equals(typeof e.onmouseout, "object", "onmouseout is of type 'object'");
	equals(typeof e.onkeypress, "object", "onkeypress is of type 'object'");
	equals(typeof e.onkeydown, "object", "onkeydown is of type 'object'");
	equals(typeof e.onkeyup, "object", "onkeyup is of type 'object'");
	equals(typeof e.height, "number", "height is of type 'number'");
	equals(typeof e.width, "number", "width is of type 'number'");
});
test("&lt;data&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "data");
	ok(e, "data exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.map, "string", "map is of type 'string'");
	equals(typeof e.expose, "string", "expose is of type 'string'");
});
test("&lt;defs&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "defs");
	ok(e, "defs exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
});
test("&lt;group&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "group");
	ok(e, "group exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.onclick, "object", "onclick is of type 'object'");
	equals(typeof e.ondblclick, "object", "ondblclick is of type 'object'");
	equals(typeof e.onmousedown, "object", "onmousedown is of type 'object'");
	equals(typeof e.onmouseup, "object", "onmouseup is of type 'object'");
	equals(typeof e.onmouseover, "object", "onmouseover is of type 'object'");
	equals(typeof e.onmousemove, "object", "onmousemove is of type 'object'");
	equals(typeof e.onmouseout, "object", "onmouseout is of type 'object'");
	equals(typeof e.onkeypress, "object", "onkeypress is of type 'object'");
	equals(typeof e.onkeydown, "object", "onkeydown is of type 'object'");
	equals(typeof e.onkeyup, "object", "onkeyup is of type 'object'");
	equals(typeof e.visible, "boolean", "visible is of type 'boolean'");
});
test("&lt;mesh&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "mesh");
	ok(e, "mesh exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.onclick, "object", "onclick is of type 'object'");
	equals(typeof e.ondblclick, "object", "ondblclick is of type 'object'");
	equals(typeof e.onmousedown, "object", "onmousedown is of type 'object'");
	equals(typeof e.onmouseup, "object", "onmouseup is of type 'object'");
	equals(typeof e.onmouseover, "object", "onmouseover is of type 'object'");
	equals(typeof e.onmousemove, "object", "onmousemove is of type 'object'");
	equals(typeof e.onmouseout, "object", "onmouseout is of type 'object'");
	equals(typeof e.onkeypress, "object", "onkeypress is of type 'object'");
	equals(typeof e.onkeydown, "object", "onkeydown is of type 'object'");
	equals(typeof e.onkeyup, "object", "onkeyup is of type 'object'");
	equals(typeof e.visible, "boolean", "visible is of type 'boolean'");
	equals(typeof e.type, "string", "type is of type 'string'");
});
test("&lt;transform&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "transform");
	ok(e, "transform exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.translation, "object", "translation is of type 'object'");
	equals(typeof e.scale, "object", "scale is of type 'object'");
	equals(typeof e.rotation, "object", "rotation is of type 'object'");
	equals(typeof e.center, "object", "center is of type 'object'");
	equals(typeof e.scaleOrientation, "object", "scaleOrientation is of type 'object'");
});
test("&lt;shader&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "shader");
	ok(e, "shader exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
});
test("&lt;light&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "light");
	ok(e, "light exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.onclick, "object", "onclick is of type 'object'");
	equals(typeof e.ondblclick, "object", "ondblclick is of type 'object'");
	equals(typeof e.onmousedown, "object", "onmousedown is of type 'object'");
	equals(typeof e.onmouseup, "object", "onmouseup is of type 'object'");
	equals(typeof e.onmouseover, "object", "onmouseover is of type 'object'");
	equals(typeof e.onmousemove, "object", "onmousemove is of type 'object'");
	equals(typeof e.onmouseout, "object", "onmouseout is of type 'object'");
	equals(typeof e.onkeypress, "object", "onkeypress is of type 'object'");
	equals(typeof e.onkeydown, "object", "onkeydown is of type 'object'");
	equals(typeof e.onkeyup, "object", "onkeyup is of type 'object'");
	equals(typeof e.visible, "boolean", "visible is of type 'boolean'");
	equals(typeof e.global, "boolean", "global is of type 'boolean'");
	equals(typeof e.intensity, "number", "intensity is of type 'number'");
});
test("&lt;lightshader&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "lightshader");
	ok(e, "lightshader exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
});
test("&lt;script&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "script");
	ok(e, "script exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.value, "string", "value is of type 'string'");
	equals(typeof e.src, "string", "src is of type 'string'");
	equals(typeof e.type, "string", "type is of type 'string'");
});
test("&lt;float&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "float");
	ok(e, "float exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;float2&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "float2");
	ok(e, "float2 exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;float3&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "float3");
	ok(e, "float3 exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;float4&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "float4");
	ok(e, "float4 exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;float4x4&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "float4x4");
	ok(e, "float4x4 exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;int&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "int");
	ok(e, "int exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;bool&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "bool");
	ok(e, "bool exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.value, "object", "value is of type 'object'");
});
test("&lt;texture&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "texture");
	ok(e, "texture exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.name, "string", "name is of type 'string'");
	equals(typeof e.type, "string", "type is of type 'string'");
	equals(typeof e.filterMin, "string", "filterMin is of type 'string'");
	equals(typeof e.filterMag, "string", "filterMag is of type 'string'");
	equals(typeof e.filterMip, "string", "filterMip is of type 'string'");
	equals(typeof e.wrapS, "string", "wrapS is of type 'string'");
	equals(typeof e.wrapT, "string", "wrapT is of type 'string'");
	equals(typeof e.wrapU, "string", "wrapU is of type 'string'");
	equals(typeof e.borderColor, "string", "borderColor is of type 'string'");
});
test("&lt;img&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "img");
	ok(e, "img exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.src, "string", "src is of type 'string'");
});
test("&lt;video&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "video");
	ok(e, "video exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.src, "string", "src is of type 'string'");
});
test("&lt;view&gt; interface test", function() {
	var e = document.createElementNS(org.xml3d.xml3dNS, "view");
	ok(e, "view exits");
	equals(typeof e.className, "string", "className is of type 'string'");
	equals(typeof e.style, "object", "className is of type 'object'");
	equals(typeof e.id, "string", "id is of type 'string'");
	equals(typeof e.onclick, "object", "onclick is of type 'object'");
	equals(typeof e.ondblclick, "object", "ondblclick is of type 'object'");
	equals(typeof e.onmousedown, "object", "onmousedown is of type 'object'");
	equals(typeof e.onmouseup, "object", "onmouseup is of type 'object'");
	equals(typeof e.onmouseover, "object", "onmouseover is of type 'object'");
	equals(typeof e.onmousemove, "object", "onmousemove is of type 'object'");
	equals(typeof e.onmouseout, "object", "onmouseout is of type 'object'");
	equals(typeof e.onkeypress, "object", "onkeypress is of type 'object'");
	equals(typeof e.onkeydown, "object", "onkeydown is of type 'object'");
	equals(typeof e.onkeyup, "object", "onkeyup is of type 'object'");
	equals(typeof e.visible, "boolean", "visible is of type 'boolean'");
	equals(typeof e.position, "object", "position is of type 'object'");
	equals(typeof e.orientation, "object", "orientation is of type 'object'");
	equals(typeof e.fieldOfView, "number", "fieldOfView is of type 'number'");
});
