/*
 * memory.js :: responsible for assessing state of memory on the machine and if
 * we should worry about it
 *
 * (C) 2014, Jarrett Cruger, MIT
 *
 */

var os = require('os'),
    util = require('util'),
    Producer = require('producer');

var Memory = module.exports = function (options) {
  if (!(this instanceof Memory)) { return new Memory(options) }
  this.used = options.used || .90;
  this.free = options.free || .05;

  Producer.call(this, options);
};

util.inherits(Memory, Producer);

Memory.prototype.produce = function () {
  var now = Date.now(),
      percents = {
        free: os.freemem() / os.totalmem(),
        used: (os.totalmem() - os.freemem()) / os.totalmem()
      };

  ['used', 'free'].forEach(function (type) {
    var service = 'memory/' + type;

    this.emit('data', {
      host: this.values.host,
      service: this.values.service
        ? this.values.service + '/' + service
        : service,
      state: type === 'used'
        ? (percents[type] >= this[type] ? 'error' : 'ok')
        : (percents[type] <= this[type] ? 'error' : 'ok'),
      time: now,
      description: 'Percent of ' + type + ' memory',
      metric: percents[type],
      //
      // Remark: for any of these memory events we may want to
      // look at what the heap/rss memory looks like for more
      // complex cases. Percentage is the first degree filtering
      // with this being the data for more complex analysis
      //
      meta: process.memoryUsage(),
      tags: this.values.tags,
      ttl: this.values.ttl
    });
  }, this);

};
