Ext.define("Dss.store.List", {
    extend: 'Ext.data.Store',
    alias: 'store.List',
    config: {
        model: 'Dss.model.Menu',
        data: [
           {MENU_ID:1,MENU_LABEL:'菜单一',MENU_PARENT:0},
           {MENU_ID:2,MENU_LABEL:'菜单二',MENU_PARENT:0},
           {MENU_ID:3,MENU_LABEL:'菜单三',MENU_PARENT:0},
           {MENU_ID:4,MENU_LABEL:'菜单四',MENU_PARENT:0},
           {MENU_ID:5,MENU_LABEL:'菜单五',MENU_PARENT:0},
           {MENU_ID:6,MENU_LABEL:'菜单六',MENU_PARENT:0},
        ]
    }
});
