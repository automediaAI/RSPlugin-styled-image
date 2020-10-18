/*
 React Studio plugin for a styled image tag.

 - 2020 / Nitin Khanna / @nitinthewiz / automedia.ai 

. v1.0
. Icon from https://icon-library.com/icon/width-icon-3.html

 */


// -- plugin info requested by host app --

this.describePlugin = function(id, lang) {
  switch (id) {
    case 'displayName':
      return "Styled Image";

    case 'shortDisplayText':
      return "component for CSS styled images";

    case 'defaultNameForNewInstance':
      return "styled-img";
  }
}

// This is all data for the plugin 
// -- private variables --

this._data = {
  src: '', 
  style: '{"display": "block"}'
};



// OFFICIAL dont touch 
// -- persistence, i.e. saving and loading --

this.persist = function() {
  return this._data;
}

this.unpersist = function(data) {  
	this._data = data;
}


// WHAT you see in settings in React Studio
// -- inspector UI --

this.reactWebDataLinkKeys = [
  "source",
  "style"
];

this.inspectorUIDefinition = [
  {
    "type": "label",
    "text": "You can either select a data slot that contains the \nsource URL of the image and manually enter the style \nof the image below, or set these values in the data \nlinkage tab. The data linkage in the data tab \noverrides the plugin parameters below. \n",
    "height": 80,
  },
  {
    "type": "label",
    "text": "Please ensure style follows the React in-line style \nJSON format, e.g.:\n{\n  'display': 'block',\n  'maxHeight': '100%',\n}",
    "height": 80,
  },
  {
    "type": "label",
    "text": "Style:",
    "height": 20,
  },
  {
    "type": "textinput",
    "id": "style", // MAKE SURE THIS is same as the variable name in this._data{}
    "label": "Style of the image",
    "actionBinding": "this.onUIChange",
    "multiline": true, 
    "height": 100,  // HEIGHT of component in RS
  },
  {
    "type": "label",
    "text": "Source URL:",
    "height": 10,
    "paddingTop": 20,
  },
  {
    "type": "dataslot-picker",
    "id": "src",
    "label": "source URL or dataSlot of image",
    "actionBinding": "this.onUIChange"
  }
];

// ACTUAL Settings declared 
this._uiTextFields = [ 'style'];
this._uiCheckboxes = [];
// this._uiCheckboxes = ['loop', 'play'];
this._uiNumberFields = [];
this._uiColorPickers = [];
this._uiComponentPickers = [];
this._uiDataSlotPickers = [ 'src' ];

this._accessorForDataKey = function(key) {
  if (this._uiTextFields.includes(key)) return 'text';
  else if (this._uiCheckboxes.includes(key)) return 'checked';
  else if (this._uiNumberFields.includes(key)) return 'numberValue';
  else if (this._uiColorPickers.includes(key)) return 'rgbaArrayValue';
  else if (this._uiComponentPickers.includes(key)) return 'componentName';
  else if (this._uiDataSlotPickers.includes(key)) return 'dataSlotName';
  return null;
}

this.onCreateUI = function() {
  var ui = this.getUI();
  for (var controlId in this._data) {
    var prop = this._accessorForDataKey(controlId);
    if (prop) {
      try {
      	ui.getChildById(controlId)[prop] = this._data[controlId];
      } catch (e) {
        console.log("** can't set ui value for key "+controlId+", prop "+prop);
      }
    }
  }
}

this.onUIChange = function(controlId) {
  var ui = this.getUI();
  var prop = this._accessorForDataKey(controlId);
  if (prop) {
    this._data[controlId] = ui.getChildById(controlId)[prop];
  } else {
    console.log("** no data property found for controlId "+controlId);
  }
}

// -- plugin preview --

this.renderIcon = function(canvas) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.save();
  if (this.icon == null) {
    // got the YouTube logo online
    var path = Plugin.getPathForResource("logo.png");  // LOGO image 
    this.icon = Plugin.loadImage(path);
  }
  var iconW = this.icon.width;
  var iconH = this.icon.height;
  var aspectScale = Math.min(w/iconW, h/iconH);
  var scale = 0.9 * aspectScale; // add some margin around icon
  iconW *= scale;
  iconH *= scale;
  ctx.drawImage(this.icon, (w-iconW)*0.5, (h-iconH)*0.5, iconW, iconH);
  ctx.restore();
};

// WHAT shows in the RS area after dragging component 
this.renderEditingCanvasPreview = function(canvas, controller) {
  this._renderPreview(canvas, controller);
}

// REAL preview if needed to show while in dev
this._renderPreview = function(canvas, controller) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.save();

  if (this.icon == null) {
    var path = Plugin.getPathForResource("logo.png");
    this.icon = Plugin.loadImage(path);
  }
  var iconW = this.icon.width;
  var iconH = this.icon.height;
  var aspectScale = Math.min(w/iconW, h/iconH);
  var scale = 0.9 * aspectScale; // add some margin around icon
  iconW *= scale;
  iconH *= scale;
  ctx.drawImage(this.icon, (w-iconW)*0.5, (h-iconH)*0.5, iconW, iconH);
  ctx.restore();

}


// ACTUALLY TELLING REACT WHERE TO PULL COMPONENT FROM 

// -- code generation, React web --

this.getReactWebPackages = function() {
  // Return dependencies that need to be included in the exported project's package.json file.
  // Each key is an npm package name that must be imported, and the value is the package version.
  
  return;
}

this.getReactWebImports = function(exporter) {
	var arr = [];
	
	return arr;
}

this.writesCustomReactWebComponent = false;

this.getReactWebJSXCode = function(exporter) {  
  const src = this._data.src; // FROM Variable declared at top  
  const style = this._data.style; // FROM Variable declared at top  
  var jsx = `<img `;

  var sourceLinkage = exporter.getExpressionForLinkKey('source');
  var styleLinkage = exporter.getExpressionForLinkKey('style');

  if (sourceLinkage) {
    jsx += `src={${sourceLinkage}} `;
  }
  else {
    jsx += `src={this.props.appActions.dataSlots['${src}']} `;
  }

  if (styleLinkage) {
    jsx += `style={${styleLinkage}} `;
  }
  else {
    jsx += `style={${style}} `;
  }
  jsx += ` />`;
  return jsx;
}

