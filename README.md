# memory-producer

[![build
status](https://secure.travis-ci.org/jcrugzz/memory-producer.png)](http://travis-ci.org/jcrugzz/memory-producer)

A readable stream based off of [`producer`][producer] that emits
a [`godot`][godot] event object on each ttl.

## example

```js
var Memory = require('memory-producer');

//
// Emits a free and used memory event every 5 seconds
// with the process.memoryUsage() data for each data.meta
//
var memory = new Memory({ ttl: 5000 })

memory.on('data', function (data) {
  console.dir(data);
})
```
[producer]: https://github.com/jcrugzz/producer
[godot]: https://github.com/nodejitsu/godot
