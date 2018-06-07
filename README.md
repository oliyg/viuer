# Viuer

File exploer cli app

## Install

This application is based on NodeJS. Installation is done using the npm install command:

```bash
$ npm install -g viuer
```

## Usage

Using this command show the help info about how to use this application:

Options:

- `-p` or `--port` set the port of static server. the default value is 8080
- `-h` or `--host` set the ip of static server. the default value is 127.0.0.1
- `-r` or `--root` set the root path of static server. the default value is current dir
- `-o` or `---autoOpenUrl` if you want open browser after static server started. the default value is false
- `-g` or `--compress` if you want the resources be compressed by gzip or deflate. the default value is true
- `-c` or `-cacheMode` if you want the resources be cached. the default value is true
- `--help` see help infomations

## Example

```plain
viuer -p 8080 --host=127.0.0.1 -r ./ -o true    set port to 8080 and hostname is
                                                127.0.0.1, set server host in
                                                current dir and open browser
                                                automatically.
```

## Help

```bash
$ viuer --help

# =================================================================
# == Viuer [option], type --help option to show help infomation. ==
# =================================================================


# 选项：
#   --version          显示版本号                                           [布尔]
#   -p, --port         server port                                  [默认值: 8080]
#   -h, --host         server host                           [默认值: "127.0.0.1"]
#   -r, --root         root path                                     [默认值: "/"]
#   -o, --autoOpenUrl  toggle auto open browser             [布尔] [默认值: false]
#   -g, --compress     toggle compress                       [布尔] [默认值: true]
#   -c, --cacheMode    toggle cache                          [布尔] [默认值: true]
#   --help             显示帮助信息                                         [布尔]

# 示例：
#   viuer -p 8080 --host=127.0.0.1 -r ./ -o   set port to 8080 and hostname is
#   true                                      127.0.0.1, set server host in
#                                             current dir and open browser
#                                             automatically.


# message me: billyangg@qq.com
# my github: https://github.com/oliyg
```
