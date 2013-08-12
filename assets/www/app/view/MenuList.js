Ext.define('Dss.view.MenuList', {
	extend : 'Ext.NestedList',
	xtype : 'menulist',
	requires : [ 'Ext.NestedList' ],
	config : {
		itemTpl : '<a href="#report/{MENU_ID}">{MENU_LABEL}</a>'
	}
});