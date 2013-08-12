Ext.define('Dss.model.Menu', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : "MENU_ID",
			type : "int"
		}, {
			name : "MENU_LABEL",
			type : "string"
		}, {
			name : "MENU_PARENT",
			type : "string"
		}, {
			name : "REPORT_KEY",
			type : "string"
		}, {
			name : "REPORT_COLUMN_TITLES",
			type : "string"
		}, {
			name : "REPORT_COLUMN",
			type : "string"
		}, {
			name : "REPORT_DATE_TYPE",
			type : "string"
		} ],
		idProperty : 'MENU_ID'
	},
	toUrl : function(){
		return  'report/'+this.data.REPORT_DATE_TYPE.toLowerCase()+'/'+this.data.MENU_ID;
	}
	
	
});
