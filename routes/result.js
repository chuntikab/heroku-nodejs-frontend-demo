import express from 'express';
import {reports} from '../data/reports.js';
import jsforce from 'jsforce';


const router = new express.Router();

//get function
router.get('/', function(req, res, next) {
  var FirstName = req.param('FirstName');
  var LastName = req.param('LastName');
  res.send('Firstname :' + FirstName + ' Lastname : ' + LastName);
});
//post function
router.post('/',function(req,res,next){
  var Name = req.body.Name;
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;

  const str="Query More - ";

  var conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl: 'https://login.salesforce.com'
  });
  var username = 'chuntika.bum@resilient-goat-reze1m.com';
  var password = 'TrailHead1007ScMCLFfUPVaYKOTrXoih755C2';

  conn.login(username, password, function (err, userInfo) {

      if (err) {return console.error(err);}
      console.log("accessToken: "+ conn.accessToken);
      console.log("instanceUrl: "+ conn.instanceUrl);
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
      console.log(req.body);
    conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object

    conn.sobject("Lead").insertBulk(req.body, function(err, rets) {
      console.log(req.body);
        if (err) { return console.error(err); }
        for (var i=0; i < rets.length; i++) {
          if (rets[i].success) {
            console.log("#" + (i+1) + " loaded successfully, id = " + rets[i].id);
          } else {
            console.log("#" + (i+1) + " error occurred, message = " + rets[i].errors.join(', '));
          }
        }
        // ...
    });
  });

  res.send('Name:' + FirstName + ' : ' + LastName +' : '+ Name);
});

router.get('/', function (req, res, next) {
  res.send('This route only receives a form or XHR POST');
});

router.post('/', function (req, res, next) {
  // If it's an AJAX request, respond with some JSON otherwise render the index page
  if (req.xhr) {
    res.status(200).send({});
  } else {
    res.render('index', reports);
  }
});

export {router as resultRouter};
