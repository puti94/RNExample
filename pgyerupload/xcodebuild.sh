#!/bin/sh

#请配置如下打包信息

#项目中文昵称
projectChineseName="舍予"
#项目工程名字
projectName="RNExample"

#蒲公英配置
APIKey="e1f86c0a7738e96746df22694975dfa4"

UserKey="241f0198ceefc50069197e1e88a6f525"

#编译条件 Realse Debug 两种
configuration=Realse

echo "请输入此版本更新的内容描述:\n"

read answer

bundle=../ios/bundle

adHocOptions=../pgyerupload/AdHocOptions.plist

if [ -d "${bundle}" ]; then
rm -rf ${bundle}
fi


mkdir ${bundle}

react-native bundle --platform ios --assets-dest ${bundle} --dev false --entry-file index.ios.js --bundle-output ${bundle}/main.jsbundle

cd ../ios
#记录一下当前jsbundle路径
jsbundlePath=`pwd`


xcodebuild archive -project ${projectName}.xcodeproj -scheme ${projectName}  -configuration ${configuration}  -archivePath ../${projectName}.xcarchive

#创建文件夹
exportPathDir=~/Documents/${projectChineseName}ipa包历史记录

if [ ! -d "${exportPathDir}" ]; then
mkdir ${exportPathDir}
fi

#根据时间创建对应的文件目录
exportPath=${exportPathDir}/${projectName}-$(date "+%Y-%m-%d日%H:%M:%S")

if [ ! -d "${exportPath}" ]; then
mkdir ${exportPath}
fi

xcodebuild -exportArchive -archivePath ../${projectName}.xcarchive -exportOptionsPlist ${adHocOptions} -exportPath "${exportPath}"

cd ${exportPath}


#压缩拷贝jsbundle到文件目录中去
cd ${jsbundlePath}
zipFile=${projectName}_iOS_jsbundle.zip
zip -r ${zipFile} bundle
mv ${zipFile} ${exportPath}

#保留xcarchive文件
cd ${jsbundlePath}
cd ..
mv ./${projectName}.xcarchive ${exportPath}

cd ${exportPath}

#上传至蒲公英
$answer = $(curl -F file=@/${exportPath}/${projectName}.ipa \
-F uKey=${UserKey} \
-F _api_key=${APIKey} \
-F buildUpdateDescription=${answer} \
https://www.pgyer.com/apiv2/app/upload)

echo  "本版本更新描述:  $answer " >> logfile.txt

echo "      自动打包并上传蒲公英成功~~~"

open .
