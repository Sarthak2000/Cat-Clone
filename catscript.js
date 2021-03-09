#!/usr/bin/env node
let fs=require("fs");
(function(){
    let cmd=process.argv.slice(2);
let op=[]; // operations array
let fn=[]; // file name array

for(let x in cmd){
    if(cmd[x].startsWith("-")&& cmd[x].length==2){  // if it is an operation
        op.push(cmd[x])                             // push in operation array
    }else{
        if(fs.existsSync(cmd[x])==false){
            return;
        }
        fn.push(cmd[x])                              // else push in filename array
    }
}

// Start of CatCommands clone

let str="";                                          //String containing filedata
for(let x in fn){
    str+= fs.readFileSync((fn[x]).toString())
}

str=str.split("\n");                                 // str to array split on new lines

// CAT COMMAND - "-s"
function RemoveSpace(arr){
    let ans=[];let found=0;
    for(let i=0;i<arr.length;i++){
        if((arr[i]=="" || arr[i]=="\r")&& (found==0)){
            ans.push(arr[i]);
            found=1;
        }else if(arr[i]!="" && arr[i]!="\r"){
            found=0;
            ans.push(arr[i]);
        }else{

        }
    }
    return ans;
}
if(op.includes("-s")){
    str=RemoveSpace(str)
}

// CATCOMMAND "-n" and "-b"

if(op.includes("-n") && op.includes("-b")){
    if(op.indexOf("-n")>op.indexOf("-b")){
        str=executeb(str);                      // execute b command
    }else{
        str=excuten(str);                       //execute n command
    } 
}else{
    if(op.includes("-n")){
        str=excuten(str);                       //execute n command
    }else{
        str=executeb(str);                      // execute b command
    }
}
function excuten(arr){                          //function for execute n
    let ans=[];
    for(let i=0;i<arr.length;i++){
        ans[i]=(i+1) + " " + arr[i];
    }
    return ans;
}
function executeb(arr){                         //function for execute n
    let ans=[];
    let li=1;
    for(let i=0;i<arr.length;i++){
        if(arr[i]=="" || arr[i]=="\r"){
            ans[i]=" "+" "+arr[i];
        }else{
            ans[i]=li+" "+arr[i];
            li=li+1;
        }
    }
    return ans;
}
//_________________________________________________

str=str.join("\n");             //converion of str array back to string

console.log(str);
})()