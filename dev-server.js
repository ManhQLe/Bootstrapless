const fs = require('fs')
const path = require('path')
const liveServer = require("live-server");
const less = require('less');
const gulp = require('gulp')


gulp.watch('./src/public/app/less/*.less').on("change", d => {
	let p = d.path.split("\\");
	let filename = p[p.length - 1].split(".")[0];

	fs.readFile(d.path, 'utf8', function (err, data) {
		if(err)
			console.log(err)
		else
			less.render(data, (e, out) => {
				if (e)
					console.log(e);
				else {				
					fs.writeFile(path.join(__dirname, "src/public/app/css", filename + ".css")
					,out.css,'utf-8',()=>{})
				}
			})

	});
})


var params = {
	port: 3000, // Set the server port. Defaults to 8080.
	host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	root: "./src", // Set root directory that's being served. Defaults to cwd.
	open: false, // When false, it won't load your browser by default.
	ignore: 'src/less/*.less', // comma-separated string for paths to ignore
	file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
	wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.	
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots	
};
liveServer.start(params)