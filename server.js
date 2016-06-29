var spawn = require('child_process').spawn;

spawn('twitter-proxy');
spawn('http-server', ['-p', '3000']);

console.log('Server running on http://localhost:3000');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=appdirect');
