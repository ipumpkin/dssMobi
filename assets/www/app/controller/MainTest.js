Ext.define('Dss.controller.MainTest', {
	extend : 'Ext.app.Controller',
	requires : [ 'Ext.ux.touch.grid.List', 'Ext.picker.Date' ],
	config : {

		refs : {
			mainView : 'mainview',
			mainMenu : 'menugrid',
			backBtn : 'mainview #backBtn',
			titleBar : 'mainview #titlebar',
			loadSplash : {
				selector : 'loadingsplash',
				xtype : 'loadingsplash',
				autoCreate : true
			},
			loadmask : {
				selector : 'loadmask',
				xtype : 'loadmask',
				message : Global.loadingText,
				autoCreate : true
			}
		},

		control : {
			mainMenu : {
				itemtap : 'mainMenuTap'
			},
			backBtn : {
				tap : 'backBtnTap'
			}
		},

		routes : {
			'main' : 'showMainMenu',
			'menu/:id' : 'showMenuById'
		},
		currentView : 0
	},
	launch : function() {
		var thiz = this;
		Ext.Viewport.mask(this.getLoadSplash());

		Global.IMSI = '460023026147705';
		Ext.data.JsonP.request({
			url : Global.webHost + 'common!getResult.action',
			callbackKey : 'callback',
			params : {
				key : 'login',
				'params["IMSI"]' : Global.IMSI
			},
			success : function(data, request) {
				// Unmask the viewport
				if (data.length == 1) {
					var item = data[0];
					Global.latn_id = item.LATN_ID;
					Global.latn_name = item.LATN_NAME;
					Global.empee_name = item.EMPEE_NAME;
					Global.empee_acct = item.EMPEE_ACCT;
					// Ext.Msg.alert("登陆用户","账号："+Global.empee_acct+"<br/>姓名："+Global.empee_name+"</br>区域:"+Global.latn_name);

					// 查询报表日期
					Ext.data.JsonP.request({
						type : 'jsonp',
						url : Global.webHost + 'common!getResult.action',
						callbackKey : 'callback',
						params : {
							key : 'getMaxMonthDate'
						},
						success : function(data, request) {
							if (data.length > 0) {
								var item = data[0];
								Global.maxMonthDate = item.MONTH_ID;
								Global.curMonthDate = item.MONTH_ID;
							} else {
								Global.maxMonthDate = Global.maxDayDate;
								Global.curMonthDate = Global.maxDayDate;
							}
							// 加载主页面
							Ext.Viewport.add({
								xtype : 'mainview'
							});
							thiz.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
								url : 'main'
							}));
							// 取消加载遮罩层
							Ext.Viewport.unmask();
						},
						failure : function() {
							alert("网络异常,请检查网络状态");
							navigator.app.exitApp();
						}
					});

				} else {
					alert("登陆失败:" + Global.IMSI);
					navigator.app.exitApp();
				}

			},
			failure : function() {
				alert("网络异常,请检查网络状态");
				navigator.app.exitApp();
			}
		});

	},
	showDayReportById : function(id) {
		var nav = this.getDayMenu();
		var view = nav.getStore().getNodeById(id);
		this.showDayView(view);
		this.setCurrentDemo(view);
	},
	mainMenuTap : function(view, index, target, record, e, opts) {

		// this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
		// url : 'menu/' + record.get('MENU_ID')
		// }));
		this.redirectTo(record);
		
	},
	showMainMenu : function() {
		// this.getMainView().animateActiveItem(0,{type: 'slide', direction:
		// 'right'});
		this.getMainView().setActiveItem(0);
		this.getTitleBar().setTitle(Global.appTitle);
		this.getBackBtn().hide();
	},
	showMenuById : function(menuId) {
		this.getBackBtn().show();
		var viewItem = Global.viewCache[menuId];
		var menuItem = this.getMainMenu().getStore().getById(menuId);
		
		if (!Ext.isDefined(viewItem)) {
			var pageType = menuItem.get('PAGE_TYPE');
			if(pageType == 'carousel'){
				viewItem = Ext.create('Ext.Carousel', {
					fullscreen : true,
//					direction : 'vertical',
					defaults : {
						styleHtmlContent : true
					},
					items : [ ]
				});
				Global.viewCache[menuId] = viewItem;
				this.getMainView().add([ viewItem ]);
				this.getMainView().setActiveItem(viewItem);
				
				Ext.Viewport.mask({
					xtype : 'loadmask',
					message : Global.loadingText,
				    });
				// 查询报表子项
				Ext.data.JsonP.request({
					type : 'jsonp',
					url : Global.webHost + 'common!getResult.action',
					callbackKey : 'callback',
					params : {
						key : 'getMenuByParent',
						'params["parent_id"]' : menuId
					},
					success : function(data, request) {
						if (data.length > 0) {
							for(var i=0;i<data.length;i++){
								var columns = [];
								var columnDataIndex = data[i]['REPORT_COLUMN'].split(',');
								var columnTitle = data[i]['REPORT_COLUMN_TITLES'].split(',');
								if (columnDataIndex.length < 1 || columnTitle.length < 1 || columnDataIndex.length != columnTitle.length) {
									Ext.msg.alert("系统提示", "报表配置错误");
									return;
								}
								var widthPer = 100 / columnTitle.length;
								for ( var j = 0; j < columnDataIndex.length; j++) {
									columns.push({
										width : widthPer + '%',
										header : columnTitle[j],
										dataIndex : columnDataIndex[j],
										style : 'text-align: center;'
									});
								}
								var grid = Ext.create('Ext.ux.touch.grid.List', {
									columns : columns,
									itemHeight : 30,
									store : {
										model : 'Dss.model.Report',
										autoLoad : true,
										proxy : {
											type : 'jsonp',
											url : Global.webHost + 'common!getPageResult.action',
											callbackKey : 'callback',
											enablePagingParams : false,
											extraParams : {
												key : data[i]["REPORT_KEY"],
												'params["month_id"]' : Global.curDayDate,
												'params["latn_id"]' : Global.latn_id
											},
											reader : {
												type : 'json',
												rootProperty : 'data'
											}
										},
									}
								});
								viewItem.add(grid);
								var id = 'ichart-'+data[i]['MENU_ID'];
								viewItem.add({xtype : 'panel',html :'<div id="'+id+'"></div>'});
								var dataV = [
								        	{
								        		name : '北京',
								        		value:[-9,1,12,20,26,30,32,29,22,12,0,-6],
								        		color:'#1f7e92',
								        		line_width:3
								        	}
								       ];
								var chart = new iChart.LineBasic2D({
											render : id,
											data: dataV,
											width : 600,
											height : 220,
											coordinate:{height:'90%',background_color:'#f6f9fa'},
											sub_option:{
												hollow_inside:false,//设置一个点的亮色在外环的效果
												point_size:16
											},
											labels:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
										});
								chart.draw();
							}
							
						}
						// 取消加载遮罩层
						Ext.Viewport.unmask();
					},
					failure : function() {
						alert("网络异常,请检查网络状态");
					}
				});
			}
			
		}else{
			this.getMainView().setActiveItem(viewItem);
		}
		this.getTitleBar().setTitle(menuItem.get('MENU_LABEL'));
	},
	backBtnTap : function() {

		var app = this.getApplication();
		var actions = app.getHistory().getActions(), previousAction = actions[actions.length - 2];
		actions.pop();
		app.redirectTo(previousAction.getUrl());
	}

});
