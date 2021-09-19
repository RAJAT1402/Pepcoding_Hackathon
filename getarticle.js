//this script get text related to search and store it in .txt format

const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
const fs = require("fs");

function myFunction(search,folderPath){
    let url = "https://www.wikipedia.org/"+"wiki/"+search;          //call on wikipedia page to get text content 
    request(url , cb1);

    function cb1(err,res,html){
        if(err){
            console.log(err);
        }else{
            getData(html);
        }
    }
    
    function getData(html){
        let st = cheerio.load(html);
        let data = st("p").text().trim();

        let open = false;
        let final = '';

        //removing superscripts for the content
        data.split('').map(s => {
            if (s ===  '[') open = true;

            if (!open)
            final += s;

            if (s === ']') open = false;
        })
        data = final;
        let filePath = path.join(folderPath,search+".txt");
        if(fs.existsSync(filePath) == true){
            fs.unlinkSync(filePath);
        }
        fs.writeFileSync(filePath,data);
    }
}

module.exports = {
    fxn : myFunction
}