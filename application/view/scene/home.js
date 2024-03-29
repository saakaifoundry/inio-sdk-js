/**
 * Home scene
 *
 * @author Mautilus s.r.o.
 * @class Scene_Home
 * @extends Scene
 */
function Scene_Home() {
	Scene.apply(this, arguments);
};

Scene_Home.prototype.__proto__ = Scene.prototype;

Scene_Home.prototype.init = function() {
	
};
/**
 * @inheritdoc Scene#onShow
 */
Scene_Home.prototype.onShow = function() {
	
};
/**
 * @inheritdoc Scene#activate
 */
Scene_Home.prototype.activate = function() {
	
};
/**
 * @inheritdoc Scene#create
 */
Scene_Home.prototype.create = function() {
	return $('<div class="scene" id="scene-home" />').appendTo(App.$viewport);
};
/**
 * @inheritdoc Scene#render
 */
Scene_Home.prototype.render = function() {
	return Template.render('scene-home', this).done(function(html) {
		this.$el.html(html);
	}, this);
};
/**
 * @inheritdoc Scene#focus
 */
Scene_Home.prototype.focus = function() {
	
};
/**
 * @inheritdoc Scene#onClick
 */
Scene_Home.prototype.onClick = function() {
	return this.onEnter.apply(this, arguments);
};
/**
 * @inheritdoc Scene#onEnter
 */
Scene_Home.prototype.onEnter = function($el) {
	var id = $el.attr('data-id');

	if (id) {
		Router.go('detail', id, null, this.catalog.collection);
		return false;
	}
};
/**
 * @inheritdoc Scene#focus
 */
Scene_Home.prototype.onReturn = function() {
	App.sidebar.focus();
	return false;
};
/**
 * @inheritdoc Scene#navigate
 */
Scene_Home.prototype.navigate = function(direction) {
	if(direction === 'up'){
		if(this.catalog.hasFocus()){
			this.carousel.focus();
			return false;
		}

	} else if(direction === 'down'){
		if(this.carousel.hasFocus()){
			this.catalog.focus();
			return false;
		}
	}
};