const { promises: fs } = require('fs');
fs.readFile("in","utf8").then(l=>console.log(l.split("\n").map((n,i,a)=>+n+ +a[i+1]+ +a[i+2]).map((n,i,a)=>n<a[i+1]).reduce((a,b)=>a+b)))