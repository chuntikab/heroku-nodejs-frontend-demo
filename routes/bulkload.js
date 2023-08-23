import express from 'express';
import bodyParser from 'body-parser';
import {reports} from '../data/reports.js';
import jsforce from 'jsforce';

const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Query 1 record and update
router.get('/querymore', (req, res) => {
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

        var records = [];
        var query = conn.query("SELECT Id, Name__c,CreatedBy.Name FROM PTW_Inspection_Report__c")
        .on("record", function(record) {
            records.push(record);
        })
        .on("end", function() {
            console.log("total in database : " + query.totalSize);
            console.log("total fetched : " + query.totalFetched);
            res.render('index',{records});

            // console.log("total records : " + JSON.stringify(records));

            // var objlist = [];
            // for (var i = 0; i < records.length; i++) {
            //     //pass data from express to my hbs view
            //     res.render('index',{records});
            // }

            // conn.sobject('PTW_Inspection_Report__c')
            //     .update(objlist, { allowRecursive: true })
            //     .then((rets) => {
            //         console.log('Update Successfully');
            //         res.send('Update Successfully');
            // });

        })
        .on("error", function(err) {
            console.error(err);
        })
        .run({ autoFetch : true, maxFetch : 20000 });

        // res.send('Query Successfully');

    });
});

//Query 1 record and update
router.get('/update', (req, res) => {
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

        var records = [];
        var query = conn.query("SELECT Id, Name__c,CreatedBy.Name FROM PTW_Inspection_Report__c")
        .on("record", function(record) {
            records.push(record);
        })
        .on("end", function() {
            console.log("total in database : " + query.totalSize);
            console.log("total fetched : " + query.totalFetched);
            // console.log("total records : " + JSON.stringify(records));

            var objlist = [];
            for (var i = 0; i < records.length; i++) {
                var data = {
                    Id: records[i].Id,
                    Name__c: i+": hello"
                };
                //console.log(records[i].Name);
                objlist.push(data);
                //console.log(olist);
            }

            conn.sobject('PTW_Inspection_Report__c')
                .update(objlist, { allowRecursive: true })
                .then((rets) => {
                    console.log('Update Successfully');
                    res.send('Update Successfully');

            });
        })
        .on("error", function(err) {
            console.error(err);
        })
        .run({ autoFetch : true, maxFetch : 20000 });

        // res.send(str+" done");
    });
});

/*router.post('/deleteaccount', (req, res) => {
   
    var conn = new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl: 'https://login.salesforce.com'
    });
    var username = 'chuntika.bum@resilient-goat-reze1m.com';
    var password = 'TrailHead1007ScMCLFfUPVaYKOTrXoih755C2';

    console.log('req.body Id: '+ req.body.Id);
    conn.login(username, password, function (err, userInfo) {

        if (err) {return console.error(err);}
        console.log("accessToken: "+ conn.accessToken);
        console.log("instanceUrl: "+ conn.instanceUrl);
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);

        // console.log(leadslist);
        // const data = req.body;
        if (JSON.stringify([{Id : "a0E5h00000aW60EEAS"}]) != "{}") {
            conn.sobject("PTW_Inspection_Report__c").del([{Id : req.body.Id}], function (err, rets) {
                if (err) {
                return console.error(err);
                }
                console.log("rets : " + rets);
                console.log("length : " + rets.length);
                console.log("JSON : " + JSON.stringify(rets));
                //res.send("Data Deleted Successfully");
                for (var i = 0; i < rets.length; i++) {
                if (rets[i].success) {
                    console.log("Deleted Successfully : " + rets[i].id);
                }
                }
            });
        } else {
        res.send("No data Received");
        }
    });
});
*/

// //Solution 2 interface ver.2 - use conn.sobject(YourObject).bulkload("insert").execute()
// router.post('/bulkload_bulkload_execute', (req, res) => {
//     const str="Query More - ";

//     var conn = new jsforce.Connection({
//         // you can change loginUrl to connect to sandbox or prerelease env.
//         loginUrl: 'https://login.salesforce.com'
//     });
//     var username = 'chuntika.bum@resilient-goat-reze1m.com';
//     var password = 'TrailHead1007ScMCLFfUPVaYKOTrXoih755C2';

//     conn.login(username, password, function (err, userInfo) {

//         if (err) {return console.error(err);}
//         console.log("accessToken: "+ conn.accessToken);
//         console.log("instanceUrl: "+ conn.instanceUrl);
//         console.log("User ID: " + userInfo.id);
//         console.log("Org ID: " + userInfo.organizationId);

//             // Provide records
//             /*var ptws = [];
//             for (var i = 0; i < 1000  ; i++) {
//                 var data = {
//                     Name__c: i+'-r2'
//                 };
//                 //console.log(records[i].Name);
//                 ptws.push(data);
//                 //console.log(olist);
//             }*/
            
//             conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object

//             // conn.sobject("PTW_Inspection_Report__c").bulkload("insert").execute(ptws, function(err, rets) {
//             conn.sobject("PTW_Inspection_Report__c").bulkload("insert").execute(req.body, function(err, rets) {
//                 if (err) { return console.error(err); }
//                 for (var i=0; i < rets.length; i++) {
//                   if (rets[i].success) {
//                     console.log("#" + (i+1) + " loaded successfully, id = " + rets[i].id);
//                   } else {
//                     console.log("#" + (i+1) + " error occurred, message = " + rets[i].errors.join(', '));
//                   }
//                 }
//                 // ...
//             });
            

//             res.send("bulkload_bulkload_execute");

//     });
// });

// //Solution 2 interface ver.1 - use conn.sobject(YourObject).insertBulk()
// router.post('/bulkload_insertBulk', (req, res) => {
//     const str="Query More - ";

//     var conn = new jsforce.Connection({
//         // you can change loginUrl to connect to sandbox or prerelease env.
//         loginUrl: 'https://login.salesforce.com'
//     });
//     var username = 'chuntika.bum@resilient-goat-reze1m.com';
//     var password = 'TrailHead1007ScMCLFfUPVaYKOTrXoih755C2';

//     conn.login(username, password, function (err, userInfo) {

//         if (err) {return console.error(err);}
//         console.log("accessToken: "+ conn.accessToken);
//         console.log("instanceUrl: "+ conn.instanceUrl);
//         console.log("User ID: " + userInfo.id);
//         console.log("Org ID: " + userInfo.organizationId);

//             // Provide records
//             /*var ptws = [];
//             for (var i = 0; i < 10000 ; i++) {
//                 var data = {
//                     Name__c: i+'-r2'
//                 };
//                 //console.log(records[i].Name);
//                 ptws.push(data);
//                 //console.log(olist);
//             }*/
//             conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object

//             // conn.sobject("PTW_Inspection_Report__c").insertBulk(ptws, function(err, rets) {
//             conn.sobject("PTW_Inspection_Report__c").insertBulk(req.body, function(err, rets) {
//                 if (err) { return console.error(err); }
//                 for (var i=0; i < rets.length; i++) {
//                   if (rets[i].success) {
//                     console.log("#" + (i+1) + " loaded successfully, id = " + rets[i].id);
//                   } else {
//                     console.log("#" + (i+1) + " error occurred, message = " + rets[i].errors.join(', '));
//                   }
//                 }
//                 // ...
//             });

//             // conn.bulk.job(jobId).batch(batchId).check((err, results) => {
//             //     // Note: all returned data is of type String from parsing the XML response from Salesforce, but the following attributes are actually numbers: apexProcessingTime, apiActiveProcessingTime, numberRecordsFailed, numberRecordsProcessed, totalProcessingTime
//             //     if (err) { return console.error(err); }
//             //     console.log('results', results);
//             //   });

//             res.send("bulkload_insertBulk");

//     });
// });

// //Solution 2 - use conn.bulk.load
// router.post('/bulkload_bulk-load', (req, res) => {
//     const str="Query More - ";

//     var conn = new jsforce.Connection({
//         // you can change loginUrl to connect to sandbox or prerelease env.
//         loginUrl: 'https://login.salesforce.com'
//     });
//     var username = 'chuntika.bum@resilient-goat-reze1m.com';
//     var password = 'TrailHead1007ScMCLFfUPVaYKOTrXoih755C2';

//     conn.login(username, password, function (err, userInfo) {

//         if (err) {return console.error(err);}
//         console.log("accessToken: "+ conn.accessToken);
//         console.log("instanceUrl: "+ conn.instanceUrl);
//         console.log("User ID: " + userInfo.id);
//         console.log("Org ID: " + userInfo.organizationId);

//             // Provide records
//             var ptws = [];
//             for (var i = 0; i < 10000 ; i++) {
//                 var data = {
//                     Name__c: i+'-r2'
//                 };
//                 //console.log(records[i].Name);
//                 ptws.push(data);
//                 //console.log(olist);
//             }
//             conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object
//             // conn.bulk.load("PTW_Inspection_Report__c", "insert", req.body, function(err, rets) {
//             conn.bulk.load("PTW_Inspection_Report__c", "insert", ptws, function(err, rets) {
//               if (err) { return console.error(err); }
//               for (var i=0; i < rets.length; i++) {
//                 if (rets[i].success) {
//                   console.log("#" + (i+1) + " loaded successfully, id = " + rets[i].id);
//                 } else {
//                   console.log("#" + (i+1) + " error occurred, message = " + rets[i].errors.join(', '));
//                 }
//               }
//               // ...
//             });

//             res.send("bulkload_bulk-load");

//     });

//     //res.send("bulkload_v2");
// });

// //Solution 1 - use method batch.on
// router.get('/bulkload_v1', (req, res) => {
//     const str="Query More - ";

//     var conn = new jsforce.Connection({
//         // you can change loginUrl to connect to sandbox or prerelease env.
//         loginUrl: 'https://login.salesforce.com'
//     });
//     var username = 'chuntika.bum@resilient-goat-reze1m.com';
//     var password = 'TrailHead1007ScMCLFfUPVaYKOTrXoih755C2';

//     conn.login(username, password, function (err, userInfo) {

//         if (err) {return console.error(err);}
//         console.log("accessToken: "+ conn.accessToken);
//         console.log("instanceUrl: "+ conn.instanceUrl);
//         console.log("User ID: " + userInfo.id);
//         console.log("Org ID: " + userInfo.organizationId);

//             // Provide records
//             /*var accounts = [
//                 { Name : 'Account #21' },
//                 { Name : 'Account #22' },
//                 { Name : 'Account #23' },
//             ];*/
//             var ptws = [];
//             for (var i = 0; i < 10000 ; i++) {
//                 var data = {
//                     Name__c: i+'-r2'
//                 };
//                 //console.log(records[i].Name);
//                 ptws.push(data);
//                 //console.log(olist);
//             }
//             // Create job and batch
//             var job = conn.bulk.createJob("PTW_Inspection_Report__c", "insert");
//             var batch = job.createBatch();
//             // start job
//             // batch.execute(req.body);
//             batch.execute(ptws);
//             // listen for events
//             batch.on("error", function(batchInfo) { // fired when batch request is queued in server.
//                 console.log('Error, batchInfo:', batchInfo);
//             });
//             batch.on("queue", function(batchInfo) { // fired when batch request is queued in server.
//                 console.log('queue, batchInfo:', batchInfo);
//                 batch.poll(1000 /* interval(ms) */, 25000 /* timeout(ms) */); // start polling - Do not poll until the batch has started
//             });
//             batch.on("response", function(rets) { // fired when batch finished and result retrieved
//                 for (var i=0; i < rets.length; i++) {
//                 if (rets[i].success) {
//                     console.log("#" + (i+1) + " loaded successfully, id = " + 
//                     rets[i].id);
//                 } else {
//                     console.log("#" + (i+1) + " error occurred, message = " + 
//                     rets[i].errors.join(', '));
//                 }
//                 }
//                 // ...
//             });
//             res.send("bulkload_v1");

//     });
// });

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
  
export {router as bulkloadRouter};