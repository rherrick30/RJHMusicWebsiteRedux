const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express();
const fs = require('fs');
const dotenv = require('dotenv').config();


app.use(
	proxy('/wbApi', {
		xfwd: true,
		target: process.env.JAVA_API_CONTAINER_URL || 'http://javaserver:9000/',
		changeOrigin: false,
		ws: true,
		pathRewrite: {
			'^/wbApi': '',
		},
		logLevel: process.env.HTTP_PROXY_LOG_LEVEL || 'debug',
	})
);

app.use(
	proxy('/api', {
		xfwd: true,
		target: process.env.API_CONTAINER_URL || 'http://node:3001/',
		changeOrigin: false,
		ws: true,
		pathRewrite: {
			'^/api': '',
		},
		logLevel: process.env.HTTP_PROXY_LOG_LEVEL || 'silent',
	})
);



app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const server = app.listen(3000, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.info(`listening at http://${host}:${port}`);

	console.log('webserver listening on port 3000!')
 });
  