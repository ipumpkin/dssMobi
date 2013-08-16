Ext.define('Dss.view.MainView', {
	extend : 'Ext.Panel',
	xtype : 'mainview',
	requires : [ 'Ext.TitleBar', 'Dss.view.MenuGrid' ],
	config : {
		layout : {
			type : 'card',
			animation : 'slide'
		},
		items : [ {
			xtype : 'titlebar',
			itemId : 'titlebar',
			docked : 'top',
			title : Global.appTitle,
			items : [ {
				xtype : 'image',
				src : 'css/images/title_logo_2.png',
				width : 110,
				height : 30,
				radius : 3
			},{
				ui : 'back',
				itemId : 'backBtn',
				hidden : true,
				// iconCls : 'back',
				// iconMask : true,
				align : 'right',
				text : '返回'
			}]
		}, {
			xtype : 'menugrid'
		} ]
	}
});