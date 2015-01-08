#report-site-pagespeed [![Build Status](https://travis-ci.org/telemark/report-site-pagespeed.svg?branch=master)](https://travis-ci.org/telemark/report-site-pagespeed)

Node.js module for creating PageSpeed reports for webpages.

##Usage

Pass in an options object with properties and a callback function.

**apikey** your google api key (required)

**urls** array of urls to report (required)

**strategy** which report do you want. Can be desktop og mobile (default). (optional)

**fileName** filename for your report. Defaults to report.csv (optional)

**verbose** if true it will send the increasing number of urls checked to the console. Defaults to false. (optional)



```
'use strict';

var generateReport = require('report-site-pagespeed')
  , apikey = 'your-api-key'
  , urls = [
      'https://postlister.t-fk.no/',
      'https://postlister.t-fk.no/om.html',
      'https://postlister.t-fk.no/hjelp.html',
      'https://postlister.t-fk.no/personvern.html'
    ]
  ;

generateReport({apikey:apikey, urls:urls, fileName:'postlister.mobile.csv'}, function(error, data){
  if(error){
    console.error(error);
  } else {
    console.log(data);
  }
});
```

###Output examples

console:

´´´
{ message: 'Finished!', urls: 4, errors: [] }
```

file: postlister.mobile.csv

```
"url","speed","usability"
"https://postlister.t-fk.no/om.html","90","100"
"https://postlister.t-fk.no/personvern.html","90","92"
"https://postlister.t-fk.no/hjelp.html","90","100"
"https://postlister.t-fk.no/","84","93"
```