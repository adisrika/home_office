var request = require('request'),
	home = '3rd%20Main%20Rd,%20Teacher%27s%20Colony,%201st%20Block%20Koramangala,%20HSR%20Layout%205th%20Sector,%20Bengaluru,%20Bangalore%20Urban,%20Karnataka%20560034',
	office = 'Cessna%20Business%20Park,%20Embassy%20Tech%20Square%20Main%20Road,%20Kaverappa%20Layout,%20Bengaluru,%20Karnataka',
	fs = require('fs'),
	today,
	hour,
	minute,
	date;

date = new Date();
hour = date.getHours();
minute = date.getMinutes();
today = date.getDate() + '-' + date.getMonth();

if (hour >= 9 && hour < 14) {
	request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + home + '&destinations=' + office + '&departure_time=now&key=AIzaSyAqWgYh1ytIpb0njggpA4b3jdcBCtq5Uf8', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			fs.appendFile(today + '-home-office.txt', hour + ':' + minute + ' ' + body.rows[0].elements[0].duration_in_traffic.value);
		}
	});
} else if (hour >= 16 && hour < 21) {
	request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + office + '&destinations=' + home + '&departure_time=now&key=AIzaSyAqWgYh1ytIpb0njggpA4b3jdcBCtq5Uf8', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			console.log(hour + ':' + minute + ' ' + body.rows[0].elements[0].duration_in_traffic.value);
			fs.appendFile(today + '-office-home.txt', hour + ':' + minute + ' ' + body.rows[0].elements[0].duration_in_traffic.value);
		}
	});
}
