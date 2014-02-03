var async = require('async');
var hatenaGraph = require('hatena-graph-api');

module.exports = function(counts, callback) {
  var username = process.env.HATENA_USERNAME;
  var apikey = process.env.HATENA_APIKEY;

  if (!username) {
    console.log('export HATENA_USERNAME=\'username\'');
    process.exit(1);
    return;
  }

  if (!apikey) {
    console.log('export HATENA_APIKEY=\'apikey\'');
    process.exit(1);
    return;
  }

  var graph = hatenaGraph(username, apikey);
  var date = new Date().toISOString().substring(0, 10);
  async.eachSeries(Object.keys(counts), function(key, next) {
    var graphname = key;
    var value = counts[key];
    graph.postData(graphname, date, value, next);
  }, callback);
};
