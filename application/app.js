/**
 * Application class
 *
 * @author Mautilus s.r.o.
 * @class App
 * @singleton
 * @mixins Events
 * @mixins Deferrable
 */
var App = (function() {
	function Factory() {
		Events.call(this);
		Deferrable.call(this);

		/**
		 * @property {Boolean} networkStatus Network status, TRUE if connected
		 */
		this.networkStatus = true;

		// Initialize this class when Inio is ready
		Inio.ready(function() {
			this.init();
		}, this);
	};

	Factory.prototype.VERSION = '1.0.0';

	Factory.prototype.__proto__ = Events.prototype;
	Factory.prototype.__proto__.__proto__ = Deferrable.prototype;

	/**
	 * @event network
	 * Will be called when network status changes
	 * @param {Boolean} status
	 */

	/**
	 * Initialize Application
	 */
	Factory.prototype.init = function() {
		try {
			// pre-fetch your content here
			// ... and do `run` after everithung is loaded
			this.run();

		} catch (e) {
			console.error(e);
			Inio.displayError(e);
		}
	};
	/**
	 * Register scenes and route to the `main` scene
	 *
	 * @private
	 */
	Factory.prototype.run = function() {
		var scope = this;
		
		this.$viewport = $('#viewport');
		this.$viewport.show();

		// monitor network connection
		setInterval(function() {
			scope.checkNetworkConnection();
		}, 1000);

		Router.addScene('home', new Scene_Home);

		this.render().done(function() {
			Router.go('home');
		}, this)
	};
	/**
	 * @private
	 */
	Factory.prototype.checkNetworkConnection = function() {
		Device.checkNetworkConnection(function(status) {
			if (status !== this.networkStatus) {
				this.networkStatus = status;
				this.trigger('network', this.networkStatus);
			}
		}, this);
	};
	/**
	 * Render views
	 * @return {Promise}
	 */
	Factory.prototype.render = function() {
		// render yout views here...
		// example: return this.all(this.header.renderTo(this.$viewport), this.navigation.renderTo(this.$viewport));
		
		return this.timeout(0); // we don't have any view yet, so just return new Promise 
	};

	return new Factory();
})();