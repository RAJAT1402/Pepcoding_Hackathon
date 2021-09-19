//input format 
//1> node script.js "content user want to search" --> this will fetch an article , screenschot , youtube video links
//2> node script.js "content user want to search" -article  --> this command gives text content related to user search
//3> node script.js "content user want to search" -image  --> this command gives screenshot related to user search
//4> node script.js "content user want to search" -video  --> this command gives video links related to user search
//5> user can also use combinations of these commands


const fs = require("fs");
const path = require("path");

let imageObj = require("./getImage");                     //requiring objects from getimage.js
let videoObj = require("./getVideo");                    //requiring objects from getVideoLink.js
let articleObj = require("./getarticle");               //requiring objects from getArticle.js

let inputArr = process.argv.slice(2);                 //Taking input

let optionsArr = [];                                //initiliazing options array
let searchArr = [];                                //initiliazing search variable

for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);

  if (firstChar == "-") {
    //checking for options 
    optionsArr.push(inputArr[i]);               //pushing in options array
  } else {
    searchArr.push(inputArr[i]);               //pushing in  search array
  }
}

//user can input more than one words 
let search = "";                              

for(let i = 0 ; i < searchArr.length ; i++){                      //loop to convert array of input into a string
  search += searchArr[i] + " ";
}

//creating a folder where processed data will be stored
let currentPath = __dirname;                                    
console.log(currentPath);
let folderPath = path.join(currentPath,"User Data");

let doesExist = fs.existsSync(folderPath);
if(doesExist != true){
  fs.mkdirSync(folderPath);
}


//checking for options given by user
if (optionsArr.length == 0) {
        imageObj.fxn(search,folderPath);
        videoObj.fxn(search,folderPath);
        articleObj.fxn(search,folderPath);
  } else {
    if(optionsArr.includes("-image")) {
        imageObj.fxn(search,folderPath);
    }
    if(optionsArr.includes("-video")){
        videoObj.fxn(search,folderPath);
    }
    if(optionsArr.includes("-article")){
        articleObj.fxn(search,folderPath);
    }
}