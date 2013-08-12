Ext.define('Dss.view.MainView', {
	extend : 'Ext.tab.Panel',
	xtype : 'mainview',
	requires : [ 'Ext.TitleBar', 'Dss.view.MenuList' ],
	config : {
		layout : {
			// Possible values: cover, cube, fade, flip, pop, reveal,
			// scroll,
			// slide
			// You can also specify "false" (Boolean value) to disable all
			// animations
			animation : 'slide'
		},
		tabBarPosition : 'bottom',
		items : [
				{
					// xtype : 'titlebar',
					// docked : 'top',
					// title : Global.appTitle,
					// items : [ {
					// ui : 'back',
					// // iconCls : 'back',
					// // iconMask : true,
					// align : 'left',
					// text : 'Back'
					// }, {
					// iconCls : 'user',
					// iconMask : true,
					// align : 'right',
					// text : 'Profile'
					// } ]
					// }, {
					title : '日报',
					iconCls : 'user',
					iconAlign : 'left',
					itemId : 'dayMenu',
					flex : 1,
					layout : 'fit',
					iconMask : true,
					items : [ {
						xtype : 'nestedlist',
						itemId : 'dayMenuList',
						title : '日报',
						baseCls : 'report-list',
						displayField : 'MENU_LABEL',
						toolbar : {
							docked : 'top',
							xtype : 'titlebar',
							ui : 'light',
							inline : true,
							items : [ {
								itemId : 'dataSelect',
								iconCls : 'action',
								iconMask : true,
								hidden : true,
								align : 'right',
								text : Global.curDayDate
							} ]
						},
						store : {
							type : 'tree',
							model : 'Dss.model.Menu',
							defaultRootProperty : 'items',
							root : Global.dayMenu
						}
					} ]
				},
				{
					title : '月报',
					iconCls : 'favorites',
					flex : 1,
					iconMask : true,
					itemId : 'monthMenu',
					layout : 'fit',
					items : [ {
						xtype : 'nestedlist',
						title : '月报',
						itemId : 'monthMenuList',
						displayField : 'MENU_LABEL',
						toolbar : {
							docked : 'top',
							xtype : 'titlebar',
							ui : 'light',
							inline : true,
							items : [ {
								itemId : 'dataSelect',
								iconCls : 'action',
								iconMask : true,
								hidden : true,
								align : 'right',
								text : Global.curMonthDate
							} ]
						},
						store : {
							type : 'tree',
							model : 'Dss.model.Menu',
							defaultRootProperty : 'items',
							root : Global.monthMenu
						}
					} ]

				},
				{
					title : '关于',
					iconCls : 'more',
					flex : 1,
					iconMask : true,
					items : [
							{
								xtype : 'toolbar',
								title : '关于'
							},
							{
								xtype : 'panel',
								itemId : 'acctInfo',
								html : Global.empee_name,
								listeners : {
									painted : function(panel, opts) {
										panel.setHtml([ '<div class="about">', '用户名：' + Global.empee_name + '<br/>',
												'账号：' + Global.empee_acct + '<br/>',
												'区域：' + Global.latn_name + '<br/>', '软件版本:' + Global.version + '<br/><hr/>',
												'<img src="css/images/about-bg.png"/><br/>', '增值业务针对性营销系统手机版<br/>',
												'中国电信甘肃分公司版权所有©', '</div>' ].join(""));
									}
								}

							} ]
				} ]
	}
});