## 第0步
**请先在终端中完成编译和调试，systemd是用来挂守护进程的，不是用来调试的，挂起来后会少收到很多输出，非常不方便调试！！**

## 用法 | Usage
1. 确保主程序位于 ```/opt/fiora``` 或者参考后文中的提示创建 ```fiora.service```  
2. 确保 ```/opt/fiora``` 目录及相关文件目录对 运行用户 有必要的权限  
3. 使用 ```root``` 用户登录控制台  
4. 将 ```fiora@.service``` 复制到 ```/lib/systemd/system/``` 目录或 ```/etc/systemd/system/``` 目录中  
(**二选一**即可，**不**推荐两边都复制)  
5. 执行命令 ```systemctl daemon-reload``` 重载 systemd 的文件缓存  
6. 执行命令 ```systemctl enable -now fiora@<运行用户>``` 将 fiora 设置为 开机自启  
(请将<运行用户>**替换**为上文中提到的拥有权限的用户；开机自启**不一定生效**)  
7. 执行命令 ```systemctl start fiora@<运行用户>``` 启动 fiora 服务  
(请将<运行用户>**替换**为上文中提到的拥有权限的用户)  
8. 执行命令 ```systemctl status fiora@<运行用户>``` 检查 fiora 服务 运行状态  
(请将<运行用户>**替换**为上文中提到的拥有权限的用户)  
9. 部分系统执行 ```systemctl status fiora@<运行用户>``` 后需要按下键盘上的 Q 键退出  
(是否需要按Q请检查终端左下角是否有回到等待输入命令的状态)  

## 创建 fiora.service
**如果上述方案因为任何原因不工作，可以尝试直接创建fiora.service**  
1. 确保**运行目录**及**相关文件目录**对**运行用户**有必要的权限  
2. 使用 ```root``` 用户登录控制台  
3. 执行命令 ```systemctl edit --force --full fiora.service``` 使用默认编辑器创建 fiora.service 并开始编辑  
(**第一次使用将有可能询问你希望使用的默认编辑器，请选择你会操作的编辑器，如果你不熟悉任何编辑器，请使用nano**)
4. 将```fiora@.service```的内容粘贴至编辑器中  
(如果你使用的默认编辑器是vim,请查询相应文档以便插入内容至编辑器中)
5. 按照以下内容和实际情况，修改并填写内容

字段 | 默认值 | 描述
--- | --- | ---
Description | Fiora Message Server | 服务的描述
User | www-data | 运行用户，请将%i替换成实际使用的**运行用户**
WorkingDirectory | /opt/fiora | 工作路径，请替换成实际的**运行路径**
ExecStart | /usr/local/bin/yarn start | 启动时执行的命令，请将路径的部分根据实际情况修改为**yarn的实际路径**，空格start保持不变
StandardOutput | /var/log/fiora-1.log | 标准输出(stdout)的保存路径
StandardError | /var/log/fiora-2.log | 标准错误(stderr)的保存路径
6. 保存并退出(nano用户请使用ctrl+x快捷键，询问是否保存的时候按 Y，询问保存文件名的时候按 回车)(vim用户自己想办法)
7. 执行命令 ```systemctl daemon-reload``` 重载 systemd 的文件缓存
8. 执行命令 ```systemctl enable fiora``` 将 fiora 设置为 开机自启(有可能不生效)
9. 执行命令 ```systemctl start fiora``` 启动 fiora 服务
10. 执行命令 ```systemctl status fiora``` 检查 fiora 服务 运行状态
11. 部分系统执行 ```systemctl status fiora``` 后需要按下键盘上的 Q 键退出  
(是否需要按Q请检查终端左下角是否有回到等待输入命令的状态)  

## 补充说明
**文件中指定的stdout和stderr的保存文件必须对执行用户有读写权限，且必须存在，否则不会创建这两个文件！**

## 遇到问题怎么办
如果是**systemd的问题**请根据实际报错信息**去Google**，如果是**fiora软件**出了问题，去发issue
