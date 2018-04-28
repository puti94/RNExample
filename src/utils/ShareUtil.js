import {NativeModules} from 'react-native';

const UMShareModule = NativeModules.UMShareModule;

export default class ShareUtil {
    static SHARE_MEDIA_QQ: 0; //QQ
    static SHARE_MEDIA_SINA: 1; //新浪
    static SHARE_MEDIA_WEIXIN: 2; //微信
    static SHARE_MEDIA_WEIXIN_CIRCLE: 3; //微信朋友圈
    static SHARE_MEDIA_QZONE: 4; //QQ空间
    static SHARE_MEDIA_WEIXIN_FAVORITE: 9; //微信收藏

    /**
     *  单个分享
     * @param text            分享内容
     * @param img             分享图片链接
     * @param weburl          分享链接
     * @param title           分享标题
     * @param sharemedia      分享平台
     * @param successCallback 分享回调
     */
    static share(text: string = '',
                 img: string = '',
                 weburl: string = '',
                 title: string = '',
                 sharemedia: number = 0,
                 successCallback = (code, msg) => console.log('share', code, msg)) {
        UMShareModule.share(text, img, weburl, title, sharemedia, successCallback);
    }

    /**
     *  单个分享
     * @param text            分享内容
     * @param img             分享图片链接
     * @param weburl          分享链接
     * @param title           分享标题
     * @param sharemedias     分享平台
     * @param successCallback 分享回调
     */
    static shareboard(text: string = '',
                      img: string = '',
                      weburl: string = '',
                      title: string = '',
                      sharemedias: Array<number> = [0],
                      successCallback = (code, msg) => console.log('share', code, msg)) {
        UMShareModule.shareboard(
            text,
            img,
            weburl,
            title,
            sharemedias,
            successCallback
        );
    }

    /**
     *  第三方授权
     * @param sharemedia       授权平台
     * @param successCallback  回调
     */
    static auth(sharemedia: number = 0,
                successCallback = (code, result, msg) =>
                    console.log('auth', code, result, msg)) {
        UMShareModule.auth(sharemedia, successCallback);
    }
}
