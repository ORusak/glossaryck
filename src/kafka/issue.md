### node-rdkafka fails to build
If you happen to use Mac OS (which is without a doubt the best OS out there) you may encounter this issue. In order to fix this please refer to this [github issue](https://github.com/Blizzard/node-rdkafka/issues/373) which gives some explanation. In particular the following command could help: 
```bash
CPPFLAGS=-I/usr/local/opt/openssl/include LDFLAGS=-L/usr/local/opt/openssl/lib npm install
```

### script start-up error - missing `librdkafka.so.1` in default directory
In case when you get log like this:
```
>> Error: librdkafka.so.1: cannot open shared object file: No such file or directory
>>     at Error (native)
>>     at Object.Module._extensions..node (module.js:434:18)
>>     at Module.load (module.js:343:32)
>>     at Function.Module._load (module.js:300:12)
>>     at Module.require (module.js:353:17)
>>     at require (internal/module.js:12:17)
>>     at bindings (/home/keereal/projects/glip/ec/node_modules/glip-kafka-client/node_modules/node-rdkafka/node_modules/bindings/bindings.js:112:48)
>>     at Object.<anonymous> (/home/keereal/projects/glip/ec/node_modules/glip-kafka-client/node_modules/node-rdkafka/librdkafka.js:10:32)
>>     at Module._compile (module.js:409:26)
>>     at Object.Module._extensions..js (module.js:416:10)
>>     at Module.load (module.js:343:32)
>>     at Function.Module._load (module.js:300:12)
>>     at Module.require (module.js:353:17)
>>     at require (internal/module.js:12:17)
>>     at Object.<anonymous> (/home/keereal/projects/glip/ec/node_modules/glip-kafka-client/node_modules/node-rdkafka/lib/client.js:14:13)
>>     at Module._compile (module.js:409:26)
```

There are two ways to fix this
1. configure dynamic linker with the directory where library is built (deeply inside `./node_modules`)
2. Build and install lib system-wide
    1. `git clone https://github.com/edenhill/librdkafka.git`
    1. `cd librdkafka`
    1. `./configure && make`
    1. `sudo make install`
    1. `sudo ldconfig`
