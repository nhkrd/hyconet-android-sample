package jp.or.nhk.rd.hyconet.android.sample;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.util.Log;

/**
 * HASampleFragmentStatePagerAdapter
 */
public class HASampleFragmentStatePagerAdapter extends FragmentStatePagerAdapter {
  private final FragmentActivity mActivity ;

  private int numFragments ;
  private AppViewInfo appviews[] ;

  /**
   *
   * @param activity
   * @param _numFragments
   * @param _appviews
   */
  public HASampleFragmentStatePagerAdapter(FragmentActivity activity, int _numFragments, AppViewInfo[] _appviews) {
    super(activity.getSupportFragmentManager());

    mActivity = activity;
    numFragments = _numFragments;
    appviews = _appviews;

    Log.i("HASampleFragmentStatePagerAdapter",String.format("***** init *****"));
  }

  /**
   *
   * @return
   */
  @Override
  public int getCount(){
    return numFragments;
  }

  /**
   *
   * @param i
   * @return
   */
  @Override
  public Fragment getItem(int i) {
    return appviews[i].fragment;
  }

  /**
   *
   * @param position
   * @return
   */
  @Override
  public CharSequence getPageTitle(int position) {
    return appviews[position].name;
  }

}