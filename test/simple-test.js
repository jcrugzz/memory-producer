var test = require('tape');
var Memory = require('../');

test('ensure we get memory values on produce', function (t) {
  t.plan(10);
  var saw = {};
  var memory = new Memory({ ttl: 5000 });

  memory.on('data', function (data) {
    saw[data.service] = data;
    var keys = Object.keys(saw);
    if (keys.length === 2) {
      keys.forEach(function (key) {
        assess(saw[key]);
      });
      memory.destroy();
      t.end();
    }
  });

  function assess(data) {
    t.ok(data, 'we have a data object');
    t.equals(typeof data.metric, 'number','it has a metric');
    t.ok(data.meta.rss, 'we have an rss property');
    t.ok(data.meta.heapTotal, 'we have a heapTotal');
    t.ok(data.meta.heapUsed, 'we have a heapUsed');
  }
});
