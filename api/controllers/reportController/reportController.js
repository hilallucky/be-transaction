
// const dateFormat = require('dateformat');
// const today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss');
// const {internalError, logSuccess, logError} = require('../../services/logger');
// const html_to_pdf = require('html-pdf-node');
// // const redis = require('redis');
// // const client = redis.createClient();
// // const axios = require('axios');
// // const qs = require('qs');

let fs = require('fs')
// const path = require('path')
// const express = require('express');
// const app = express();
// const ejs = require('ejs')
// const pdf = require('html-pdf')


let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let pdfPass = require('hummus-recipe')
let publicview = path.join(__dirname, '../controllers/reportController/');
let students = [
   {name: "Joy",
    email: "joy@example.com",
    city: "New York",
    country: "USA"},
   {name: "John",
    email: "John@example.com",
    city: "San Francisco",
    country: "USA"},
   {name: "Clark",
    email: "Clark@example.com",
    city: "Seattle",
    country: "USA"},
   {name: "Watson",
    email: "Watson@example.com",
    city: "Boston",
    country: "USA"},
   {name: "Tony",
    email: "Tony@example.com",
    city: "Los Angels",
    country: "USA"
}];


const reportController = () => {

"use strict";

//   const reportControllerPDF = async (req, res) => {
//     // let { body } = req;

//     // let options = { format: 'A4' };
//     // Example of options with args //
//     let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

//     // let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
//     let file = [{ url: "https://api.k-link.dev", name: 'example.pdf' }];
//     // or //
//     // let file = { url: "https://api.k-link.dev" };
//     html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//       console.log("PDF Buffer:-", pdfBuffer);
//     });
//     return res.status(200).json({ status:'success', message: 'success' });
//   }

//  async function reportControllerPDF2() {
//     // return res.status(200).json({ status:'success', message: 'success' });
//     console.log('sampe reportControllerPDF ya ');
//  }



// app.get("/generateReport", (req, res) => {
  const reportControllerPDF = async (req, res) => {
    ejs.renderFile(path.join(__dirname, '../controllers/report-template.ejs'), {students: students}, (err, data) => {
              if (err) {
                    res.send(err);
              } else {
                  let options = {
                      "height": "11.25in",
                      "width": "8.5in",
                      "header": {
                          "height": "20mm"
                      },
                      "footer": {
                          "height": "20mm",
                      },
                  };
                  pdf.create(data, options).toFile("report.pdf", function (err, data) {
                      if (err) {
                          res.send(err);
                      } else {
                          res.send("File created successfully");
                      }
                  });
              }
    });
  };

  const testGeneratePDF = async (req, res) => {
    const htmlpdf = require('html-pdf-node')

    let file = {
        url : "https://service-kirim.k-link.dev/Home"
    }

    let option = {
        format : 'Letter',
        path: 'pdf/servicekirim.pdf',
        displayHeaderFooter: true
    }

    htmlpdf.generatePdf(file, option).then((Buffer) => {
        console.log(Buffer);
    }).catch((err) => {
        console.log(err)
    })

    return res.status(200).json({ status:'success', message: 'success' });
  };


  app.set('view engine', 'ejs');

  const genPDF = async (req, res) => {
    let file = 'DATA.json';
    let datafile = fs.readFileSync(file)
    datafile = JSON.parse(datafile)

    let data = {
        data: datafile,
        tag: 'Testing bos'
    }
    
    ejs.renderFile(publicview+'report-template.ejs', data, {}, (err, str) => {
        if(err) return console.log(err);
        let filesPdf = publicview + 'index.pdf'
        pdf.create(str, {format:'Letter'}).toFile(filesPdf, function(err, foo) {
            if(err) return console.log('error conver', err)
            let fileoutEncrypt = publicview + 'output.pdf'
            let filesoutput = new pdfPass(filesPdf, fileoutEncrypt)
            filesoutput.encrypt({
                userPassword: 'abc',
                ownerPassword: '1234',
                userProtectionFlag: 4
            }).endPDF();
            
        })
        
    })
    res.render(publicview+'index', data)
  }

  return {
    reportControllerPDF,
    testGeneratePDF,
    genPDF,
    // reportControllerPDF2
  };

};

module.exports = reportController;
