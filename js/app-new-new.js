//////////////////////////////////////////////////////////////////////////////
//app.js - this resembles the "octopus"
function App() {
	var currentActiveCat;

	var catData = [{
		name: 'Wepsi',
		imgSrc: 'img/catphoto.jpg'
	}, {
		name: 'Cuddles',
		imgSrc: 'img/catphoto2.jpg'
	}, {
		name: 'Kitty',
		imgSrc: 'img/catphoto3.jpg'
	}, {
		name: 'Pepsi',
		imgSrc: 'img/catphoto4.jpg'
	}, {
		name: 'CutiePie',
		imgSrc: 'img/catphoto5.jpg'
	}];

	var $catDisplay = $('#cat-display');
	var $catList = $('#cat-list');

	catData.forEach(function (cat) {
		var model = new CatModel(cat);

		var display = new CatDisplayView({ model: model });
		$catDisplay.append(display.render().$el);

		var item = new CatListItemView({ model: model });
		item.onClick(function () {
			if (currentActiveCat) { currentActiveCat.setInactive() }
			currentActiveCat = display;
			currentActiveCat.setActive();
		});
		$catList.append(item.render().$el);

	});
}
//////////////////////////////////////////////////////////////////////////////
//cat-model.js
var CatModel = function (options) {
	var self = this;
	self.name = options.name;
	self.imgSrc = options.imgSrc;
	self.counter = 0;

	self.increment = function () {
		self.counter++;
		self.triggerChange();
	}

	//this part of the model is normally part of backbonejs code, not your app.  this is here to show how backbone does events
	self._changeListeners = undefined;
	
	self.addChangeListener = function (listener) {
		self._changeListeners = listener
	}
	self.triggerChange = function () {
		self._changeListeners.call(self);
	}
}
//////////////////////////////////////////////////////////////////////////////
//cat-listitem-view.js
var CatListItemView = function (options) {
	var self = this;
	self.model = options.model;

	self.render = function () {
		var template = '<li>' + self.model.name + '</li>'
		var $el = $(template)
		$el.click(function () {
			self.onClickHander();
		});
		self.$el = $el;
		return self;
	}

	self.onClick = function (handler) {
		self.onClickHander = handler;
	}
};

//////////////////////////////////////////////////////////////////////////////
//cat-display-view.js
function CatDisplayView (options) {
	var self = this;
	self.model = options.model;

	self.model.addChangeListener(function () {
		self.$el.find('span').html(self.model.counter);
	});

	self.render = function () {
		var template = '<div class="kitty" style="display: none;"><h1>' + self.model.name + '</h1><figure><img src="' + self.model.imgSrc + '"><figcaption>Click Count: <span>' + self.model.counter + '</span></figcaption></figure></div>';
		var $el = $(template);
		
		$el.find('img').click(function () {
			self.model.increment();
		});

		self.$el = $el;

		return self;
	}

	self.setActive = function () {
		self.$el.show();
	}

	self.setInactive = function () {
		self.$el.hide();
	}
}

//normally this would belong in app.js
$(function () {
	App();
});
