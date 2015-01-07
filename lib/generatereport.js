'use strict';

var fs = require('fs')
  , events = require('events')
  , stream = require('stream')
  , gps = require('gpagespeed')
  , validUrl = require('valid-url')
  , mkCsvFromArray = require('./mkcsvfromarray')
  , tracker = new events.EventEmitter()
  , counter = 0
  , urlsCounter = 0
  ;

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



}

module.exports = generateReport;