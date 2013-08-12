var Global = {
	viewCache : [],
	appTitle : '针对性营销',
	loadingText : '正在加载...',
	webHost : 'http://192.168.0.103:7001/dssMobileServer/',
	IMSI : '',
	latn_id : '',
	latn_name : '',
	empee_name : '',
	empee_acct : '',
	curDayDate : parseInt(Ext.Date.format(new Date(),'Ym')),
	maxDayDate : parseInt(Ext.Date.format(new Date(),'Ym')),
	curMonthDate : '',
	maxMonthDate : '',
	dayMenu : {
		MENU_LABEL : '日报',
		MENU_ID : 2,
		expanded : true,
		items : []
	},
	monthMenu : {
		MENU_LABEL : '月报',
		MENU_ID : 3,
		expanded : true,
		items : []
	}
};

Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext.ux.touch.grid': 'sencha/ux/Ext.ux.touch.grid'
    }
});

Ext.application({
	name : 'Dss',
	models : ['Menu','Report'],
	controllers : ['MainTest'],
	views : ['MainView','LoadingSplash'],
	launch : function() {
		// This is where the fun starts! 
//		Ext.Viewport.add({ xtype: 'menulist'});
	}
});