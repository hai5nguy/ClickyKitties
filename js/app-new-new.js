$(function() {
	var model = {
		init: function () {
			this.generateCats();
		},

		catCollection: [
			{
				"name": "Wepsi",
				"imgSrc": "img/catphoto.jpg"
			},
			{
				"name": "Cuddles",
				"imgSrc": "img/catphoto2.jpg"
			},
			{
				"name": "Kitty",
				"imgSrc": "img/catphoto3.jpg"
			},
			{
				"name": "Pepsi",
				"imgSrc": "img/catphoto4.jpg"
			},
			{
				"name": "CutiePie",
				"imgSrc": "img/catphoto5.jpg"
			}
		],

		kittyObjects: [],

		CatModel: function(name, imgSrc) {
			let self = this;
			self.name = name;
			self.counter = 0;
			self.imgSrc = imgSrc;

			//Would prefer this to be on the prototype
			//TODO: Get this out of the model
			// self.listItem.click(octopus.updateCatDisplay(e));
		},

		// CatModel.prototype.clickyKitty: function() {
		// 	this.counter++;
		// },

		generateCats: function() {
			model.catCollection.forEach(function(data) {
				var kitty = new model.CatModel(data.name, data.imgSrc);
				model.kittyObjects.push(kitty);
			});
		}

	};

	var octopus = {
		init: function () {
			model.init();
			catListView.init();
			catDisplayView.init();
		},

		getAllKitties: function () {
			return model.kittyObjects;
		},

		updateCatListItem: function (data, li) {
			data.listItem = li;
			data.listItem.click(function(e) { 
				console.log('list!');
			});
		},

		updateCatDisplayDiv: function (data, div) {
			data.catDisplayDiv = div;
			data.catDisplayDiv.click(function(e) {
				console.log('display!!');
			});
		},

		updateCatDisplay: function(e) {
			console.log(e);
		}

	};

	var catListView = {
		init: function () {
			this.render();
		},

		render: function() {
			var htmlStr = '';
			octopus.getAllKitties().forEach(function(data) {
				htmlStr = $('<li>' + data.name + '</li>');
				$('#cat-list').append(htmlStr);
				octopus.updateCatListItem(data, htmlStr);
			});
		}
	};

	var catDisplayView = {
		init: function () {
			this.render();
		},

		render: function() {
			var htmlStr = '';
			octopus.getAllKitties().forEach(function(data) {
				htmlStr = $('<div class="kitty"><h1>' + data.name + '</h1><figure><img src="' + data.imgSrc + '"><figcaption></figcaption></figure></div>');
				$('#cat-display').append(htmlStr);
				$('.kitty').hide();
				octopus.updateCatDisplayDiv(data, htmlStr);
			});
		}
	};

	octopus.init();

});