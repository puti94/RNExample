#!/bin/sh

#请配置如下打包信息
#项目中文昵称
projectChineseName="舍予"
#项目工程名字
projectName="RNExample"
#蒲公英配置
APIKey="e1f86c0a7738e96746df22694975dfa4"

UserKey="241f0198ceefc50069197e1e88a6f525"

echo "请输入此版本更新的内容描述:\n"

read answer

#打包
cd ../android && ./gradlew assembleRelease
cd ./app/build/outputs/apk
#记录apk路径
apkPath=`pwd`

#创建文件夹
exportPathDir=~/Documents/${projectChineseName}apk包历史记录

if [ ! -d "${exportPathDir}" ]; then
mkdir ${exportPathDir}
fi

#根据时间创建对应的文件目录
exportPath=${exportPathDir}/${projectName}-$(date "+%Y-%m-%d日%H:%M:%S")

if [ ! -d "${exportPath}" ]; then
mkdir ${exportPath}
fi

echo ${apkPath}
#拷贝apk文件
cp ${apkPath}/app-release.apk ${exportPath}

cd ${exportPath}

#上传至蒲公英
$answer = $(curl -F file=@/${exportPath}/app-release.apk \
-F uKey=${UserKey} \
-F _api_key=${APIKey} \
-F buildUpdateDescription=${answer} \
https://www.pgyer.com/apiv2/app/upload)

echo  "本版本更新描述:  安卓$answer " >> logfile.txt

echo "      自动打包并上传蒲公英成功~~~"

open .
