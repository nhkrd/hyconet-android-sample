package jp.or.nhk.rd.hyconet.android.sample;

import android.support.v4.app.Fragment;

/**
 * AppViewInfo
 */
public class AppViewInfo {
    public String name;
    public Fragment fragment;

    AppViewInfo(String _name, Fragment _fragment) {
        name = _name;
        fragment = _fragment;
    }
}
