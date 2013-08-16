Ext.define('Dss.store.Menu', {
	extend : 'Ext.data.Store',
	xtype : 'menu',
	requires : [
	            'Dss.model.Menu'
	         ],
	config : {
		model : 'Dss.model.Menu',
		autoLoad : true,
		storeId : 'menu',
		remoteFilter : false,
		proxy : {
			type : 'jsonp',
			url : Global.webHost + 'common!getPageResult.action',
			callbackKey : 'callback',
			extraParams : {
				key : 'getMenuByParent',
				'params["parent_id"]' : 0
			},
			reader : {
				type : 'json',
				rootProperty : 'data'
			}
		}
	}

});