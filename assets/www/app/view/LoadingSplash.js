Ext.define('Dss.view.LoadingSplash', {
	extend : 'Ext.LoadMask',
	xtype : 'loadingsplash',
	config : {
		cls : 'loading-splash',
		message : Global.loadingText,
	}
});
Ext.override(Dss.view.LoadingSplash, {
	getTemplate : function() {
		var prefix = Ext.baseCSSPrefix;

		return [ {
			// it needs an inner so it can be centered
			// within the mask, and have
			// a background
			reference : 'innerElement',
			cls : prefix + 'mask-inner',
			children : [
			// the elements required for the CSS loading
			// {@link #indicator}
			{
				reference : 'indicatorElement',
				cls : prefix + 'loading-spinner-outer',
				children : [ {
					cls : prefix + 'loading-spinner',
					children : [ {
						tag : 'span',
						cls : prefix + 'loading-top'
					}, {
						tag : 'span',
						cls : prefix + 'loading-right'
					}, {
						tag : 'span',
						cls : prefix + 'loading-bottom'
					}, {
						tag : 'span',
						cls : prefix + 'loading-left'
					} ]
				} ]
			},
			// the element used to display the {@link
			// #message}
			{
				reference : 'messageElement'
			} ]
		}, {
			id : 'loading-splash-logo',
			html : '<img width="100%" height="100%" src="css/images/splash.png"/>'
		} ];
	}
});