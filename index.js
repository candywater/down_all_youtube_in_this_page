#! /usr/bin/env node

const https = require("https");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {execSync} = require("child_process");

var data = "";

console.log("this is a test version");
//contorller("https://www.youtube.com/channel/UCEBb1b_L6zDS3xTUrIALZOw");
//readFromConsole("test");
//execSync ("you-get https://www.youtube.com/watch?v=Di0P1ME4qrI",{stdio:[0,1,2]});
process.argv.forEach((filename, index, arr) => {
  if(index == 2)
    readFromConsole(filename);
})


function readFromConsole(filename){
  var fs = require("fs");
  fs.readFile(filename, "utf8", (err, contents) => {
    if(err) throw err;
    data = contents;
    //console.log(data);
    downVideos();
  })

}

// todo: 
function readFromUrl(url){
  if(!url) return; // if url == null, return
  data = "";
  https.get(
    url,
    (res) => {
      res.on("data",(chunk)=> {data += chunk;});
      res.on("end", () => {findVideos();});
    }).on(("error"),(err) => {console.log("error:" + err.message)}
  );
}

function downVideos(){
  const dom = new JSDOM(data);
  let videos = dom.window.document.querySelectorAll("a");
  let errlist = [];
  for(let video of videos){
    if(video.id != "thumbnail")
      continue;
    console.log("you-get " + "'youtube.com" + video.href + "'");
    try{
      //https://stackoverflow.com/questions/30134236/use-child-process-execsync-but-keep-output-in-console
      //https://nodejs.org/api/child_process.html#child_process_options_stdio
      execSync("you-get " + "'youtube.com" + video.href + "'", {stdio:[0,1,2]});
    }
    catch(e) {
      errlist.push(e);
    }
  }
  if(errlist.length > 0)
    console.log("==there are some errors.==");
  errlist.forEach((err) =>{
    console.log(err);
  });

}
