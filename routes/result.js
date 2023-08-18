import express from 'express';
import {reports} from '../data/reports.js';

const router = new express.Router();

//get function
router.get('/', function(req, res, next) {
  var fname = req.param('fname');
  var lname = req.param('lname');
  res.send('Firstname :' + fname + ' Lastname : ' + lname);
});
//post function
router.post('/',function(req,res,next){
  var fname = req.body.fname;
  var lname = req.body.lname;
  res.send('Name:' + fname + ' : ' + lname);
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
