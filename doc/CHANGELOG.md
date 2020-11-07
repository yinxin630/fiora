## 2020-11-07

### Changes
- Support send file directly
- Refactor webpack build config

## 2020-11-04

### Changes
- **Breaking!!!** Modify the config files. It no longer supports modifying config items through command line params
- Remove pm2 ecosystem config and deploy shell script
### Fix
- Remove NODE_ENV when build webpback bundle to solve async loader module issue

## 2020-11-03

### Changes
- Rename some scripts and set NODE_ENV
- Enable ts-loader transpileOnly when in production env