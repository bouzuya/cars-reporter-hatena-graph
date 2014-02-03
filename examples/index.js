var reporter = require('../');

reporter({
  test: 1
}, function(err) {
  if (err) console.log(err);
});

