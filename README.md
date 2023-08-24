# next bug

## Usage
How to reproduce
```
corepack enable
pnpm install
node build.js
```

## The problem
The process never ends because a HTTP server is started
```
$ ss -natup
Netid              State               Recv-Q              Send-Q                              Local Address:Port                                Peer Address:Port              Process
tcp                LISTEN              0                   511                                             *:34441                                          *:*                  users:(("node",pid=392310,fd=33))
```

The HTTP route doesn't call `.end` when requests are made either
```
$ curl -v http://127.0.0.1:34441
* processing: http://127.0.0.1:34441
*   Trying 127.0.0.1:34441...
* Connected to 127.0.0.1 (127.0.0.1) port 34441
> GET / HTTP/1.1
> Host: 127.0.0.1:34441
> User-Agent: curl/8.2.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Thu, 24 Aug 2023 10:31:36 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
<
* Connection #0 to host 127.0.0.1 left intact
```

## Expected behaviour
THe process stops after `nextBuild` completes
