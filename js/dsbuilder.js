/*
IIFE in order to not mix the code with other libraries
*/
;(function (global) {

/*
We initialized the new instance
*/
var Dsbuilder = function () {
	return new Dsbuilder.init();
};

/*
Type of inputs available
*/
var inputs = {
	type: ['text', 'password', 'checkbox', 'radio', 'textarea', 'select', 'submit']
};

/*
Variables are initialized
*/
var textNumber = 0;
var checkNumber = 0;
var radioNumber = 0;
var areaNumber = 0;
var titleNumber = 0;
var selectNumber = 0;
var optionNumber = 0;
var selectOptionNumber = 0;
var str;

/*
Maps are defined
*/
var itemText = new Map();
var itemCheck = new Map();
var itemRadio = new Map();
var itemArea = new Map();
var itemTitle = new Map();
var itemSelect = new Map();
var itemOptions = new Map();
var itemSelectOptions = new Map();
var defaultOptions = new Map();

/*
An array with -almost- all maps
*/
var someContent = [itemText, itemCheck, itemRadio, itemArea, itemTitle, itemSelect];

/*
An array with all maps
*/
var allContent = [itemText, itemCheck, itemRadio, itemArea, itemTitle, itemSelect, itemOptions, itemSelectOptions, defaultOptions];

/*
Hard core method to clear maps and remove childs from the user interface
*/
var resetAll = function (someContent) {
	for (var i=0, l=someContent.length-1; i<l; i++) {
		if (someContent[i].size > 0) {
			removeChilds(someContent[i], 'form-item');
		}
	}
}

/*
Initialize and clear all values
*/
var resetValues = function (content) {
	textNumber = 0;
	checkNumber = 0;
	radioNumber = 0;
	areaNumber = 0;
	titleNumber = 0;
	selectNumber = 0;
	optionNumber = 0;
	selectOptionNumber = 0;

	resetAll(content);
};

/*
Method for defining the inputs (text, radio, checkbox) and textareas
*/
var createInput = function (type, value, optionsDefault) {
	if (type === inputs.type[0]) {
		if (optionsDefault === true) {
			itemSelectOptions.set(selectOptionNumber, '<input type="' + type + '" id="text' + selectOptionNumber + '" value="' + value + '" class="form-control">');
			publishDefaultOptions(itemSelectOptions);
			selectOptionNumber++;
			optionsDefault = null;
		}
		else {
			itemText.set(textNumber, '<input type="' + type + '" id="text' + textNumber + '" value="' + value + '" class="form-control">');
			textNumber++;
			publishInput(itemText);
			checkOnInit();
		}
		
	}
	else if (type === inputs.type[2]) {
		itemCheck.set(checkNumber, '<input type="' + type + '" id="check' + checkNumber + '" value="' + value + '" class="form-check-input">');
		checkNumber++;
		publishItem(itemCheck, type);
		checkOnInit();
	}
	else if (type === inputs.type[3]) {
		itemRadio.set(radioNumber, '<input type="' + type + '" id="radio' + radioNumber + '" value="' + value + '" class="form-check-input">');
		radioNumber++;
		publishItem(itemRadio, type);
		checkOnInit();
	}
	else if (type === inputs.type[4]) {
		itemArea.set(areaNumber, '<textarea id="textarea' + radioNumber + '" rows="3">' + value + '</textarea>');
		areaNumber++;
		publishArea(itemArea);
		checkOnInit();
	}
};

/*
Method for defining and publishing titles
*/
var createTitle = function (value) {
	if (value) {
		itemTitle.set(titleNumber, value);
		titleNumber++;
		publishTitle(itemTitle);
		checkOnInit();
	}
};

/*
Method for defining select menus
*/
var createSelect = function (options) {
		var type = 'select';
		var name = "select-menu" + selectNumber;
		var options = options || ['Option 1', 'Option 2', 'Option 3'];
		publishOptions(options);
		var optionsValues = [];
		itemOptions.forEach(function(value, key) { 
			optionsValues.push(value); 
		});
		var allOptions = optionsValues.join('');
		itemSelect.set(selectNumber, '<select id="' + name + '" class="custom-select">' + allOptions + '</select>');
		selectNumber++;
		publishItem(itemSelect, type);
		itemOptions.clear();
		checkOnInit();
}

/*
Method for creating the options used in the select menus
*/
var createOptions = function (options) {
	if (options) {
		var alternatives = [];
		for (var i=0, l=options.length-1; i<l; i++) {
			alternatives.push(options.elements[i].value);
		}
		alternatives.push('New Option');
	}
	var options = alternatives || ['Option 1', 'Option 2', 'Option 3'];
	removeChilds(itemSelectOptions, 'form-options');
	for (var i=0, l=options.length; i<l; i++) {
		createInput('text',options[i], true);
	}
	selectDisplay(true);
	checkOnInit();
};

/*
Method for defining the options used in the select menus
*/
var selectOptions = function (text, value) {
	if (text){
		itemOptions.set(optionNumber, '<option value="' + value + '">' + text + '</option>');
		optionNumber++;
		return itemOptions;
	}
};

/*
Method for publishing options for the select menu
*/
var publishDefaultOptions = function (items) {
	var mapLen = items.size - 1;
	items.forEach(function(value, key) {
		if (key === mapLen) {
			var label = 'default-options' + key;
			var buttonLabel = 'button-options' + key;
			var labelId = "'" + label + "'";
			var buttonId = "'" + buttonLabel + "'";
			
			var htmlDiv = '<div class="col-sm-10 input-label" id="' + label + '">' + value + '</div><label>' +
			'<a href="#" class="delete-option" onclick="ds.deleteOptions(' + key + ',' + labelId + ',' + buttonId + 
			')"><i class="fa fa-times fa-lg" aria-hidden="true" id="' + buttonLabel + '"></i></a></label>' +
			'<div class="offset-sm-2 col-sm-10 inner-submit">';
			var element = document.getElementById('form-options');
			element.innerHTML += htmlDiv;
		}
	});
};

/*
Method for publishing inputs
*/
var publishInput = function (items) {
	publishElement(items, 'text', "input-text", 'input-label', 'input-div');
};

/*
Method for publishing items (checkboxs or radios)
*/
var publishItem = function (items, type) {
	if (type === 'checkbox') {
		var labels = "label-check";
	}
	else if (type === 'select') {
		var labels = "label-select";
	}
	else if (type === 'radio') {
		var labels = "label-radio";
	}
	publishElement(items, type, labels, 'item-label', 'item-div');
};

/*
Method for publishing 'textarea' inputs
*/
var publishArea = function (items) {
	publishElement(items, 'textarea', "area-input", 'area-label', 'area-div');
};

/*
Method for publishing Titles
*/
var publishTitle = function (items) {
	publishElement(items, 'title', "label-title", 'title-parent-title', '');
};

/*
Method for adding simple quotations to an expression
*/
var addQuotations = function (word) {
	var expression = "'" + word + "'";
	return expression;
}

/*
Method for publishing all elements (in general)
*/
var publishElement = function (items, type, labelName, labelParent, divParent) {
	var mapLen = items.size - 1;
	var quotedType = addQuotations(type);
	items.forEach(function(value, key) {
		var labels = labelName + key;
		var labelid = addQuotations(labels);
		var parentLabel = labelParent + key;
		var parentId = addQuotations(parentLabel);
		var parentDiv = divParent + key;
		var parentDivId = addQuotations(parentDiv);
		if (key === mapLen) {
			if (type && type !== 'textarea') {
				var option = 'Edit ';
				if (type === 'title') {
					var divCode = '<label for="' + labels + '" class="full-width" id="' + parentLabel + 
					'"><a href="#" contenteditable="true" onclick="ds.editText(' + labelid + ')" id="' + 
					labels +'">' + value + '</a><a href="#" class="delete-button" onclick="ds.deleteTitle(' + 
					key + ',' + labelid + ',' + parentId + ',' + quotedType + 
					')"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a></label>';
				}
				else if (type === 'text') {
					var divCode = '<label class="col-sm-2 col-form-label input-label" id="' + parentLabel + 
					'"><a href="#" contenteditable="true" onclick="ds.editText(' + labelid + ')" id="' + labels +'">' 
					+ option + key + '</a></label><div class="col-sm-10 reduce" id="' + parentDiv + '">' + value +
					'<a href="#" class="delete-option" onclick="ds.deleteInput(' + key + ',' + parentDivId + ',' + parentId + 
					',' + quotedType + ')"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a></div>';
				}
				else {
					if (mapLen === 0 && type !== 'select') {
						createTitle('Edit Menu Title:');
					}
					var divCode = '<label class="col-sm-2 col-form-label input-label" id="' + parentLabel + 
					'"><a href="#" contenteditable="true" onclick="ds.editText(' + labelid + ')" id="' + labels +'">' 
					+ option + key +'</a></label><div class="col-sm-10 smart-padding" id="' + parentDiv +'">' + value + 
					'<a href="#" class="delete-button" onclick="ds.deleteItem('  + quotedType + ',' + key + ',' 
					+ parentDivId + ',' + parentId + ')"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a></div>';
				}
			}
			else if (type === 'textarea') {	
					var option = 'Edit ' + key;
					var divCode = '<label class="col-sm-2 col-form-label input-label" id="' + parentLabel + 
				    '"><a href="#" contenteditable="true" onclick="ds.editText(' + labelid + ')" id="' + labels +
				    '">' + option + '</a></label><div class="col-sm-10 text-area reduce" id="' + parentDiv + '">' 
					+ value + '<a href="#" class="delete-option" onclick="ds.deleteArea(' + key + ',' + parentDivId + ',' + parentId + 
					',' + quotedType + ')"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a></div>';
			}
			var element = document.getElementById('form-item');
			element.innerHTML += divCode;
		}
	});
};

/*
Method for editing the labels beside the inputs
*/
var editText = function (key) {
	document.getElementById(key).innerHTML = " : ";
};

/*
Method for switching display (on/off)
*/
var selectDisplay = function (open){
	if (open) {
		document.getElementById('options-container').style.display = 'block';
		document.getElementById('form-dynamic').style.display = 'none';
	}
	else {
		document.getElementById('options-container').style.display = 'none';
		document.getElementById('form-dynamic').style.display = 'block';
	}
};

/*
Method for defining cleaning text to be used in the select menus
*/
var publishOptions = function (options){
	for (var i=0, l=options.length; i<l; i++) {
		str = options[i].replace(/\s/g, '');
		str = str.toLowerCase();
		selectOptions(options[i], str);
	}
};

/*
Method for saving the options defined for the select menus
*/
var saveOptions = function (options){
	var codedOptions = [];
	if (options.length) {
		for (var i=0, l=options.length-1; i<l; i++) {
			codedOptions.push(options.elements[i].value);
		}
	}
	var defaultOptions = codedOptions || ['Option 1', 'Option 2', 'Option 3'];
	createSelect(defaultOptions);
	selectDisplay(false);
};

/*
Method for clearing maps and removing childs from an element
*/
var removeChilds = function (map, element){
	map.clear();
	selectOptionNumber = 0;
	var element = document.getElementById(element);
	while (element.firstChild) {
    	element.removeChild(element.firstChild);
	}
};

/*
Method for deleting options (select menus)
*/
var deleteOptions = function (id, option, button) {
	itemSelectOptions.delete(id);
	deleteElement(option);
	deleteElement(button);
	checkIfMapEmpty(itemSelectOptions);
};

/*
Method for updating elements in the UI
*/
var updateItem = function (id, option, parent, type) {
	if (type === 'text') {
		itemText.delete(id);
		deleteElement(option);
	}
	else if (type === 'textarea') {
		itemArea.delete(id);
		deleteElement(option);
	}
	else if (type === 'title') {
		itemTitle.delete(id);
	}
	deleteElement(parent);
	checkIfEmpty(someContent);
};

/*
Method for deleting content options (select) and inputs (checkbox, radio)
*/
var deleteItem = function (type, id, option, parent) {
	var map = new Map();
	if (type === 'checkbox') {
		itemCheck.delete(id);
		var map = itemCheck;
	}
	else if (type === 'select') {
		itemSelect.delete(id);
		var map = itemSelect;
	}
	else if (type === 'radio') {
		itemRadio.delete(id);
		var map = itemRadio;
	}
	deleteElement(option);
	deleteElement(parent);
	checkIfEmpty(someContent);
};

/*
Method for calling other methods 
while checking a map content
*/
var checkIfMapEmpty = function (map){
	var j = 0;
	for (var i=0, l=map.length; i<l; i++) {
		if (map[i].size > 0) {
			j += map[i].size;
		}
	}
	checkOnInit();
	if (map.size === 0) {
		selectDisplay(false);
	}
};

/*
Same than checkIfMapEmpty but for arrays of maps
*/
var checkIfEmpty = function (someContent){
	var j = 0;
	for (var i=0, l=someContent.length; i<l; i++) {
		if (someContent[i].size > 0) {
			j += someContent[i].size;
		}
	}
	if (j === 0) {
		checkOnInit();
	}
};

/*
Method for deleting elements (removing childs) 
on the UI
*/
var deleteElement = function (element){
	var nodeElement = document.getElementById(element);
	nodeElement.parentNode.removeChild(nodeElement);
};

/*
Method for switching elements and/or initializing values
*/
var checkOnInit = function (){
	var list = document.getElementById('form-item').hasChildNodes();
	if (list) {
		document.getElementById('submit-button').style.display = 'block';
		document.getElementById('delete-button').style.display = 'block';
		document.getElementById('intro-title').style.display = 'none';
		document.getElementById('intro-description').style.display = 'none';
		return true;
	}
	else {
		document.getElementById('submit-button').style.display = 'none';
		document.getElementById('delete-button').style.display = 'none';
		document.getElementById('intro-title').style.display = 'block';
		document.getElementById('intro-description').style.display = 'block';
		resetValues(someContent);
		return false;
	}
};

/*
Public methods available
*/
Dsbuilder.prototype = {
	addTitle: function (title) {
		return createTitle(title);
	},

	addInput: function (type, value, options) {
		return createInput(type, value, options);
	},

	addOptions: function (options) {
		return createOptions(options);
	},

	savedOptions: function (element) {
		return saveOptions(element);
	},

	deleteOptions: function (id, option, button) {
		return deleteOptions(id, option, button);
	},

	deleteInput: function (id, option, parent, type) {
		return updateItem(id, option, parent, type);
	},

	editText: function (key) {
		return editText(key);
	},

	deleteItem: function (type, id, option, parent) {
		return deleteItem(type, id, option, parent);
	},

	deleteArea: function (id, option, parent, type) {
		return updateItem(id, option, parent, type);
	},

	deleteTitle: function (id, option, parent, type) {
		return updateItem(id, option, parent, type);
	},

	deleteAll: function () {
		resetValues(allContent);
		checkOnInit();
		selectDisplay(false);
	}
};

/*
Method call on the constructor
*/
Dsbuilder.init = function () {
	checkOnInit();
}

/*
Inheritance of init to Dsbuilder
*/
Dsbuilder.init.prototype = Dsbuilder.prototype;

/*
How you actually call this library from outside
*/
global.Dsbuilder = Dsbuilder;

}(window));