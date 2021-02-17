## 2020-2-17

### Features
- Support sharing groups externally
### Fixes
- Part of the text is not visible on windows


## 2021-1-22

### Changes
- A single ip can register up to 3 accounts within 24 hours


## 2020-12-17

### Features
- Support search expressions by input content. It is disabled default and you can enable it in setting
### Changes
- Only limit send message frequency


## 2020-12-08

### Changes
- **Breaking!!!** Refactor to use redis cache instead of memory variable cache. So you should run redis first before start fiora


## 2020-11-15

### Changes
- Refactor to use webpack plugin to generate service worker script
- Refacotr or add server scripts


## 2020-11-14

### Features
- Adapt to ios full screen devices


## 2020-11-12

### Features
- Support multiple administrators
- Add getUserId and deleteUser scripts


## 2020-11-08

### Features
- Support to withdraw self's message


## 2020-11-07

### Features
- Support send file directly
- Support display linkman realtime info. About user online status and group online members count
### Changes
- Refactor webpack build config
### Fixes
- Fix the issue of right click on image viewer to copy image will close it


## 2020-11-04

### Changes
- **Breaking!!!** Modify the config files. It no longer supports modifying config items through command line params
- Remove pm2 ecosystem config and deploy shell script


## 2020-11-03

### Changes
- Rename some npm scripts name