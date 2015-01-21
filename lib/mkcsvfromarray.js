'use strict';

function mkCsvRowFromArray(arr) {
  var a = arr.map(function(i) {
    return '"' + i + '"';
  });
  return a.join(',') + '\r\n';
}

module.exports = mkCsvRowFromArray;
