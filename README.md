## 基于React的音乐播放器

## 一、项目环境 运行
1、该项目是基于node环境，通过create-react-app搭建的react项目，所以该项目应在装有node的机器上运行

2、该项目运用的是网易云音乐接口，所以应该下载网易云音乐接口项目https://github.com/agnij/NeteaseCloudMusicApi 并运行set PORT=4000 && node app.js 开启4000端口

3、使用npm start 启动该项目

## 二、项目简介

该项目是我自己使用react搭建的一款pc端的音乐播放器，使用react的一系列知识，制作的一个基于网易云音乐接口作为后端数据的音乐播放器

## 三、项目结构

.vscode  VS code编辑软件的文件。

config   是该项目的一些配置文件，里面包含less，js等等的一些配置。

node_modules  该文件是npm下载的一些文件的集合，包括redux等等。

public   是项目的公共文件，也是项目以后的打包文件夹的去处，是项目的入口文件。

scripts  是项目的运行，打包，以及测试的文件启动文件。

src      是项目的主要文件的放置地方，里面包含有路由的配置，项目的组件等等。

package.json 是项目用到的模块的说明，以及一些模块的版本信息

package-lock.json  锁定安装时的包的版本号，使得安装的版本和我当前的版本信息一致

README.md  这是github的说明文档

## 四、项目功能介绍

