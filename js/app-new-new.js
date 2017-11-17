//Store (redux)
/////////////////////////////////////////////////////////////

//store.js
var Store = {
	state: {},
	dispatch: function (action) {
		var newState = JSON.parse(JSON.stringify(this.state))  //this duplicates the state and breaks ALL references, nested or not
		switch (action.type) {
			case 'ADD_CATS':
				newState.cats = action.data;
				this.state = newState;
				break;
			case 'SET_ACTIVE_CAT':
				newState.activeCat = action.data;
				this.state = newState;
				break;
			case 'INCREMENT_CAT_COUNT':
				newState.cats.forEach(function (cat, i) {
					if (cat.name === action.data) {
						newState.cats[i].count++
					}
				})
				this.state = newState;
				break;
			default:
				this.state = newState;
		}
		this.updateComponents();
	},

	//this is normally part of redux's internal codebase, shown here for learning purpose
	_components: undefined,

	updateComponents: function () {
		if (this._components) {
			this._components.render()
		}
	},

	connect: function (component) {
		this._components = component
	}
}


//Actions (redux)
/////////////////////////////////////////////////////////////

//actions.js
var Actions = {
	addCats: function (cats) {
		Store.dispatch({
			type: 'ADD_CATS',
			data: cats
		})
	},
	setActiveCat: function (name) {
		Store.dispatch({
			type: 'SET_ACTIVE_CAT',
			data: name
		})
	},
	incrementCount: function (name) {
		Store.dispatch({
			type: 'INCREMENT_CAT_COUNT',
			data: name
		})
	}
}


//Components (react)
/////////////////////////////////////////////////////////////

//main-component.js
function Main (props, $el) {
	var self = this;
	self.render = function () {
		var jsx = $(
			'<div>' +
				'<h3>' + props.title + '</h3>' +
				'<div id="cat-list" />' +
				'<div id="picture-list" />' +
			'</div>'
		);

		var list = new CatList()
		jsx.find('#cat-list').append(list.render());

		var pictures = new PictureList()
		jsx.find('#picture-list').append(pictures.render());

		$el.empty().append(jsx)
	}

	Store.connect(self);
}

//cat-list-component.js
function CatList() {
	var cats = Store.state.cats;
	this.render = function () {
		var jsx = $('<ul />');

		cats.forEach(function (c) {
			var item = new CatListItem(c);
			jsx.append(item.render());
		});

		return jsx;
	}
}

//cat-list-item.js
function CatListItem(props) {
	this.render = function () {
		var jsx = $(
			'<div>' + props.name + '</div>'
		)
		jsx.on('click', function () {
			Actions.setActiveCat(props.name)
		});

		return jsx;
	}
}

//picture-list-component.js
function PictureList() {
	var cats = JSON.parse(JSON.stringify(Store.state.cats.slice()));  //break references

	this.render = function () {
		var jsx = $('<div />');
		cats.forEach(function (c) {
			if (Store.state.activeCat === c.name) {
				c.active = true;
			}
			var picture = new CatPicture(c);
			jsx.append(picture.render())
		})
		return jsx;
	}
}

//cat-picture-component.js
function CatPicture(props) {
	this.render = function () {
		var style = props.active ? "display: block;" : "display: none;";
		var jsx = $(
			'<div style="' + style + '">' +
				'<h5>' + props.name + '</h5>' +
				'<img src="' + props.imgSrc + '"></img>' +
				'<div>count: <span>' + props.count + '</span></div>' +
			'</div>'
		);

		jsx.click(function () {
			Actions.incrementCount(props.name);
		})
		return jsx;
	}
}

/////////////////////////////////////////////////////////////
//index.js - the start of everything

var catCollection = [{
	name: 'Wepsi',
	imgSrc: 'img/catphoto.jpg',
	count: 0
}, {
	name: 'Cuddles',
	imgSrc: 'img/catphoto2.jpg',
	count: 0
}, {
	name: 'Kitty',
	imgSrc: 'img/catphoto3.jpg',
	count: 0
}, {
	name: 'Pepsi',
	imgSrc: 'img/catphoto4.jpg',
	count: 0
}, {
	name: 'CutiePie',
	imgSrc: 'img/catphoto5.jpg',
	count: 0
}];

Actions.addCats(catCollection);

$(function () {
	var $el = $('#app');
	var main = new Main({ title: 'Kitties' }, $el);
	main.render();
});