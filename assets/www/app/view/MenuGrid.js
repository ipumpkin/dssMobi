Ext
		.define(
				'Dss.view.MenuGrid',
				{
					extend : 'Ext.dataview.DataView',
					xtype : 'menugrid',
					requires : [ '' ],
					config : {
						id : 'menugrid',
						inline : true,
						scrollable : false,
						itemTpl : '<div class="menu-item"><img src="'+Global.webHost+'images/icon/{MENU_DATA_ICON}"/><div class="menu-label">{MENU_LABEL}</div></div>',
						store : 'menu'
					}
				});