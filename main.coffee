#! /usr/bin/env node

https = require "https"
jsdom = require "jsdom"
{JSDOM} = jsdom;
{execSync} = require "child_process";

data = "";
readFromConsole = -> 

console.log "this is a test version"
# contorller("https://www.youtube.com/channel/UCEBb1b_L6zDS3xTUrIALZOw");
# readFromConsole("test");
# execSync ("you-get https://www.youtube.com/watch?v=Di0P1ME4qrI",{stdio:[0,1,2]});

readFromConsole(arg) if index is 2 for arg, index in process.argv

readFromConsole = (filename) -> 
  fs = require "fs"
  fs.readFile filename, "utf8", (err, contents) -> 
    throw err if err 
    data = contents
    downVideos()

# todo: 
###
function readFromUrl(url)
###

downVideos = ->
  dom = new JSDOM(data);
  videos = dom.window.document.querySelectorAll("a");
  errlist = [];
  for video in videos
    continue if(video.id != "thumbnail")
    console.log("you-get " + "'youtube.com" + video.href + "'")
    try
      # https://stackoverflow.com/questions/30134236/use-child-process-execsync-but-keep-output-in-console
      # https://nodejs.org/api/child_process.html#child_process_options_stdio
      execSync("you-get " + "'youtube.com" + video.href + "'", {stdio:[0,1,2]})
    catch e 
      errlist.push(e);
  
  console.log("==there are some errors.==") if(errlist.length > 0)
  errlist.forEach err ->console.log(err);
