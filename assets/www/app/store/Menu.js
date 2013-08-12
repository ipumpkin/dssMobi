Ext.define('Dss.store.Menu', {
	extend : 'Ext.data.TreeStore',
	xtype : 'menustore',
	requires : [
	            'Dss.model.Menu'
	         ],
	config : {
		model : 'Dss.model.Menu',
		autoLoad : true,
		storeId : 'menuStore',
		remoteFilter : false,
		proxy : {
			type : 'jsonp',
			url : Global.webHost + 'common!getPageResult.action',
			callbackKey : 'callback',
			extraParams : {
				key : 'getMenu',
				'params["parent_id"]' : 0
			},
			reader : {
				type : 'json',
				rootProperty : 'data'
			}
		},
		listeners :{
			load : function(store,records,successful,opt,eopt){
//				alert(records.length);
			}
		}
	}

});