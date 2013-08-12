Ext.define('Dss.controller.MainTest', {
	extend : 'Ext.app.Controller',
	requires : [ 'Ext.ux.touch.grid.List' ],
	config : {

		refs : {
			main : 'mainview',
			loadSplash : {
				selector : 'loadingsplash',
				xtype : 'loadingsplash',
				autoCreate : true
			},
			dayMenu : 'mainview #dayMenuList',
			monthMenu : 'mainview #monthMenuList',
			dayMenuDateSelect : '#dayMenuList  #dataSelect',
			monthMenuDateSelect : '#monthMenuList #dataSelect',
			loadmask : {
				selector : 'loadmask',
				xtype : 'loadmask',
				message : Global.loadingText,
				autoCreate : true
			}
		},

		control : {
			dayMenu : {
				itemtap : 'onMenuTap',
				back : 'onMenuBack'
			},
			monthMenu : {
				itemtap : 'onMenuTap'
			},
			dayMenuDateSelect : {
				tap : 'dataSelect'
			}
		},

		routes : {
			'report/day/:id' : 'showDayReportById',
			'report/month/:id' : 'showMonthReportById'
		},

		/**
		 * @cfg {Ext.data.Model} currentDemo The Demo that is currently loaded.
		 *      This is set whenever showViewById is called and used by
		 *      functions like onSourceTap to fetch the source code for the
		 *      current demo.
		 */
		currentDemo : undefined
	},
	launch : function() {
		Ext.Viewport.mask(this.getLoadSplash());

		Global.IMSI = '460023026147705';
		// Make the JsonP request
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

					// 加载菜单数据
					Ext.data.JsonP.request({
						type : 'jsonp',
						url : Global.webHost + 'common!getResult.action',
						callbackKey : 'callback',
						params : {
							key : 'getMenu',
							'params["parent_id"]' : 0
						},
						success : function(data, request) {
							if (data.length > 0) {
								for ( var i = 0; i < data.length; i++) {
									data[i].leaf = true;
									if (data[i].MENU_PARENT == 2) {// 日报菜单
										Global.dayMenu.items.push(data[i]);
									} else if (data[i].MENU_PARENT == 3) {// 月报菜单
										Global.monthMenu.items.push(data[i]);
									}
								}
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
										// 添加日期选择控件
										var date = new Date();
										var datePicker = Ext.create('Ext.picker.Date', {
											doneButton : '确认',
											cancelButton : '取消',
											hidden : true,
											yearFrom : 2012,
											yearTo : date.getFullYear(),
											slotOrder : [ 'month', 'year' ]
										});
										Ext.Viewport.add(datePicker);
										// 取消加载遮罩层
										Ext.Viewport.unmask();
									},
									failure : function() {
										alert("网络异常,请检查网络状态");
										navigator.app.exitApp();
									}
								});
							} else {
								alert("菜单加载失败");
								navigator.app.exitApp();
							}

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
	showDayView : function(item) {
		var nav = this.getDayMenu(), layout = nav.getLayout(), anim = item.get('animation'), initialAnim = layout
				.getAnimation(), newAnim;

		this.getDayMenuDateSelect().show();

		var grid = Global.viewCache[item.get("MENU_ID")];
		if (grid) {

		} else {
			var columns = [];
			var columnDataIndex = item.get('REPORT_COLUMN').split(',');
			var columnTitle = item.get('REPORT_COLUMN_TITLES').split(',');
			if (columnDataIndex.length < 1 || columnTitle.length < 1 || columnDataIndex.length != columnTitle.length) {
				Ext.msg.alert("系统提示", "报表配置错误");
				return;
			}
			var widthPer = 100 / columnTitle.length;
			for ( var i = 0; i < columnDataIndex.length; i++) {
				columns.push({
					width : widthPer + '%',
					itemHeight : 30,
					header : columnTitle[i],
					dataIndex : columnDataIndex[i],
					style : 'text-align: center;'
				});
			}
			grid = Ext.create('Ext.ux.touch.grid.List', {
				columns : columns,
				store : {
					model : 'Dss.model.Report',
					autoLoad : false,
					proxy : {
						type : 'jsonp',
						url : Global.webHost + 'common!getPageResult.action',
						callbackKey : 'callback',
						enablePagingParams : false,
						extraParams : {
							key : item.get("REPORT_KEY"),
							'params["month_id"]' : 201307,
							'params["latn_id"]' : Global.latn_id
						},
						reader : {
							type : 'json',
							rootProperty : 'data'
						}
					},
				}
			});
		}

		if (anim) {
			layout.setAnimation(anim);
			newAnim = layout.getAnimation();
		}
		Global.viewCache[item.get("MENU_ID")] = grid;
		nav.setDetailCard(grid);
		grid.getStore().load({
			params : {
				'params["month_id"]' : Global.curDayDate,
			}
		});
		// nav.goToNode(item.parentNode);
		// nav.goToLeaf(item);

		if (newAnim) {
			newAnim.on('animationend', function() {
				layout.setAnimation(initialAnim);
			}, this, {
				single : true
			});
		}

		// this.getToolbar().setTitle(title);
	},
	onMenuTap : function(nestedList, list, index) {
		var record = list.getStore().getAt(index);
		if (record.isLeaf()) {
			this.redirectTo(record);
		} else {
			this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
				url : 'menu/' + record.get('MENU_ID')
			}));
		}
	},
	onDayMenuBack : function(nestedList, list, index) {
		this.getDayMenuDateSelect().hide();
	},
	onMonthMenuBack : function(nestedList, list, index) {
		this.getMonthMenuDateSelect().hide();
	},
	showDayDatePicker : function() {
		this.getDatePicker().setValue({
			year : Global.curDayDate.substr(0, 4),
			month : Global.curDayDate.substr(4, 6)
		});
		this.getDatePicker().dateFlag = "DAY";
		this.getDatePicker().show();
	},
	showMonthDatePicker : function() {
		this.getDatePicker().setValue({
			year : Global.curMonthDate.substr(0, 4),
			month : Global.curMonthDate.substr(4, 6)
		});
		this.getDatePicker().dateFlag = "MONTH";
		this.getDatePicker().show();
	},
	dateChanged : function(picker, value, opts) {
		var item = this.getCurrentDemo();
		var grid = Global.viewCache[item.get("MENU_ID")];

		var store = grid.getStore();
		var month_id = Ext.Date.format(value, 'Ym');
		if (this.getDatePicker().dateFlag == "DAY") {
			Global.curDayDate = month_id;
			this.getDayMenuDateSelect().setText(month_id);
		} else if (this.getDatePicker().dateFlag == "MONTH") {
			Global.curMonthDate = month_id;
			this.getMonthMenuDateSelect().setText(month_id);
		}

		store.load({
			params : {
				'params["month_id"]' : month_id,
			}
		});
	}
});
