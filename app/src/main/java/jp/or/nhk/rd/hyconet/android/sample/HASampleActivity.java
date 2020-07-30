package jp.or.nhk.rd.hyconet.android.sample;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.FragmentActivity;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.webkit.ValueCallback;
import android.webkit.WebView;
import android.widget.Button;
import android.support.design.widget.TabLayout;

import static java.net.URLDecoder.*;

public class HASampleActivity extends FragmentActivity {
	String blank_page  = "about:blank";
	WebView webview = null;

	private Context context;
	private HyconetClientIFImpl hyconetif;

	private String prev_url = null;
	private String new_url = null;
	private String curr_url = "";

	private int numFragments = 3;
	private String[] tabTitle = {"WebView", "Log", "Setting"};
	private FragmentWebView fragwebview;
	private FragmentLog    fraglog;
	private FragmentSetting fragsetting;
	private AppViewInfo appviews[] = new AppViewInfo[numFragments];

	ViewPager viewPager;
	PagerAdapter mAdapter ;

	public Context getContext() {
		return context;
	}
	public HyconetClientIFImpl getHyconetClientIFImpl() {
		return hyconetif;
	}

	/**
	 * MessageType
	 */
	public enum MessageType {
		URL(0),
		JS(1);

		private final int id;
		private MessageType(final int id) {
			this.id = id;
		}
		public int getId() {
			return id;
		}
	};

	/**
	 *
	 */
    @SuppressLint("HandlerLeak")
    final Handler msghandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
        Log.i("handleMessage: ", (String) (msg.obj + "|" + curr_url) );

		WebView webviewa = findViewById(R.id.web_view_name_wv);
		if( webviewa != null ) {
			if (msg.arg1 == MessageType.URL.getId()) {
				String req_url = (String) (msg.obj);
				if ((curr_url.equals("")) || !(curr_url.equals(req_url))) {
					webviewa.loadUrl(req_url);
					curr_url = req_url;
				}
			} else if (msg.arg1 == MessageType.JS.getId()) {
//				webviewa.evaluateJavascript((String) (msg.obj), null);
				webviewa.evaluateJavascript((String) (msg.obj), new ValueCallback<String>() {
					@Override
					public void onReceiveValue(String s) {
					}
				});
			}
		}
        }
    };

	public HASampleActivity() {
	}

	public void sendmsg(Message msg) {
        msghandler.sendMessage( msg );
    }

	/**
	 *
	 */
	@SuppressLint("HandlerLeak")
	final Handler loghandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
		Log.i("loghandler: ", (String) (msg.obj) );

		fraglog.logtext( (String)(msg.obj) );
		}
	};
	public void setlog(String logstr) {
		Message msg = new Message();
		msg.obj = logstr;
		loghandler.sendMessage( msg );
	}

	/**
	 *
	 */
	@SuppressLint("HandlerLeak")
	final Handler settinghandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
		Log.i("settinghandler: ", "" );

		fragsetting.dispDevInfo( msg );
		}
	};

	/**
	 * dispDevInfo
	 * @param devinfo
	 */
	public void dispDevInfo(String[] devinfo) {
		Message msg = new Message();
		msg.arg1 = 0;
		msg.obj = devinfo;
		settinghandler.sendMessage( msg );
	}

	/**
	 * onCreate
	 * @param savedInsanceState
	 */
	@Override
	public void onCreate(Bundle savedInsanceState) {
		Log.i("hyconet.android: ", "onCreate()");

		context = getApplicationContext();
		super.onCreate(savedInsanceState);

		fragwebview = new FragmentWebView();
		fraglog     = new FragmentLog();
		fragsetting = new FragmentSetting();
		appviews[0] = new AppViewInfo( tabTitle[0], fragwebview);
		appviews[1] = new AppViewInfo( tabTitle[1], fraglog);
		appviews[2] = new AppViewInfo( tabTitle[2], fragsetting);

		setContentView(R.layout.pager);
		mAdapter = new HASampleFragmentStatePagerAdapter((FragmentActivity)this, numFragments, appviews);

		viewPager = findViewById(R.id.viewPager);
		viewPager.setOffscreenPageLimit(tabTitle.length);
		viewPager.setAdapter(mAdapter);
		TabLayout tabLayout = findViewById(R.id.tabs);
		tabLayout.setupWithViewPager(viewPager);

		hyconetif = new HyconetClientIFImpl(this);

		Intent intent = getIntent();
		Bundle extras = intent.getExtras();
		String url_param = null;
		if (extras != null) {
			url_param = intent.getStringExtra("urlparam");
			if (url_param != null) {
				new_url = url_param;
				prev_url = url_param;
				Log.i("WebViewActivity:", url_param);
			}
		}
	}

	@Override
	protected void onNewIntent(Intent intent) {
		Log.i("hyconet.android: ", "onNewIntent()");
	}

	@Override
	public void onPause() {
		super.onPause();
		Log.i("hyconet.android: ", "onPause()");
	}

	@Override
	public void onResume() {
		super.onResume();
		Log.i("hyconet.android: ", "onResume()");
	}

	@Override
	public void onStart() {
		super.onStart();
		Log.i("hyconet.android: ", "onStart()");
	}

	@Override
	public void onStop() {
		super.onStop();
		Log.i("hyconet.android: ", "onStop()");
	}
}
