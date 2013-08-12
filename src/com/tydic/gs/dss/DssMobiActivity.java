package com.tydic.gs.dss;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Menu;
import android.view.MenuItem;

import com.tydic.gs.dss.update.UpdateManager;

public class DssMobiActivity extends DroidGap {
	
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");

		UpdateManager manager = new UpdateManager(DssMobiActivity.this);
		// 检查软件更新
		manager.checkUpdate();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		menu.add(0, 1, 1, R.string.exit);
		// TODO Auto-generated method stub
		return super.onCreateOptionsMenu(menu);
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		if (item.getItemId() == 1) {
			finish();
		}
		return super.onOptionsItemSelected(item);
	}
}
