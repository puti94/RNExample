package com.example.customlib;

import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.view.Gravity;
import android.widget.TextView;


/**
 * Created by puti on 2018/1/14.
 */

public class RCTUITest extends TextView {


    public RCTUITest(Context context) {
        super(context);
        setText("原生字符");
        setTextSize(20);
        setGravity(Gravity.CENTER);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            setTextAlignment(TextView.TEXT_ALIGNMENT_CENTER);
        }
    }


    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

}
