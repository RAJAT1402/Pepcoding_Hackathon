//this script get top 10 youtube video links related to search and store them in pdf format

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { default: jsPDF } = require("jspdf");

let page;

function myFunction(search,folderPath){

    (async function fn(){
        let browser = await puppeteer.launch({
            headless:true,
            defaultViewport:null,
            args:["--start-maximized"],
        }) 
        page = await browser.newPage();
        await page.goto("https://www.youtube.com/");
        await page.waitFor(1000);
        await page.waitForSelector("input[type='text']");
        await page.type("input[type='text']",search,{ delay: 100 });
        await page.keyboard.press("Enter", { delay: 100 });
        await page.waitFor(1000);
        await page.waitForSelector(".title-and-badge.style-scope.ytd-video-renderer>a");
        const attr = await page.$$eval(".title-and-badge.style-scope.ytd-video-renderer>a", el => el.map(x => x.getAttribute("title")));
        const href = await page.$$eval(".title-and-badge.style-scope.ytd-video-renderer>a", el => el.map(x => x.getAttribute("href")));
        for(let i = 0 ; i < href.length ; i++){
            href[i] = "https://www.youtube.com/" + href[i];
        }
        let filePath = path.join(folderPath,search+".pdf");
        pdfGenerator(href,attr,filePath);
        await browser.close();
    })();
}

// function to generate pdf
function pdfGenerator(href,attr,filePath){
 
            if(fs.existsSync(filePath))
                fs.unlinkSync(filePath);

            const doc = new jsPDF();

            let size = 10;

            if(attr.length < 10 || href.length < 10){
                if(attr.length < href.length){
                    size = attr.length;
                }else{
                    size = href.length;
                }
            }

            for(let i = 0 ; i < size ; i++) {
                doc.text(attr[i], 10 , 10 + 15 * i);
                doc.text(href[i] , 10 , 15 + 15 * i);
            }

            doc.save(filePath);

}

module.exports = {
    fxn : myFunction
}