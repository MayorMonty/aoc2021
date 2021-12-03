const { promises: fs } = require('fs');

fs.readFile("in", "utf8").then(l=>console.log(l.split("\r\n").map(r=>([a,b]=r.split(" "), a[0]>"e"?a[0]>"g"?[-b,0]:[0,+b]:[+b,0])).reduce(([a,b],[c,d])=>[a+c,b+d],[0,0]).reduce((a,b)=>a*b)));
