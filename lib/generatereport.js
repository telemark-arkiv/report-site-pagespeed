'use strict';

var fs = require('fs');
var events = require('events');
var stream = require('stream');
var gps = require('gpagespeed');
var mkCsvFromArray = require('./mkcsvfromarray');
var tracker = new events.EventEmitter();
var jobCounter = 0;
var urlsCounter = 0;
var errors = [];
var reportHeaders = {
      'desktop' : ['url', 'speed'],
      'mobile' : ['url', 'speed', 'usability']
  };
var verbose;
var apiversion;
var key;
var strategy;
var fileName;
var writeStream;
var readStream;

function generateReport(options, callback){

  if(!options){
    return callback(new Error('Missing required input: options'), null);
  }

  if(!options.urls){
    return callback(new Error('Missing required input: options.urls'), null);
  }

  if(!options.apikey){
    return callback(new Error('Missing required input: options.apikey'), null);
  }

  verbose = options.verbose;
  apiversion = options.apiversion || 'v3beta1';
  key = options.apikey;
  strategy = options.strategy || 'mobile';
  fileName = options.fileName || 'report.csv';
  urlsCounter = options.urls.length;
  writeStream = fs.createWriteStream(fileName);
  readStream = stream.PassThrough();

  readStream.pipe(writeStream);

  readStream.push(mkCsvFromArray(reportHeaders[strategy]));

  tracker.on('row', function(row){
    if(row.length > 0){
      readStream.push(mkCsvFromArray(row));
    }
    jobCounter++;
    if(verbose){
      console.log(jobCounter);
    }
    if(jobCounter === urlsCounter){
      tracker.emit('finished');
    }
  });

  tracker.on('finished', function(){
    return callback(null, {message:'Finished!', urls: urlsCounter, errors:errors});
  });

  options.urls.forEach(function(url){

    var reportOptions = {
      url:url,
      key:key,
      strategy:strategy,
      userequest:true,
      apiversion:apiversion
    };

    gps(reportOptions, function(error, data){
      var result;
      var scores = [];

      if(error){
        errors.push({url:url, error:error});
        tracker.emit('row', []);
      } else {
        result = JSON.parse(data);
        scores.push(url);
        scores.push(result.ruleGroups.SPEED.score);

        if(strategy === 'mobile'){
          scores.push(result.ruleGroups.USABILITY.score);
        }

        tracker.emit('row', scores);
      }
    });
  });
}

module.exports = generateReport;