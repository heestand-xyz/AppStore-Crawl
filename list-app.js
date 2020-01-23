var fs = require('fs')
var request = require('request');

console.log("AppStore Crawl List")

let dir = "apps/"

var apps = []

let folders = fs.readdirSync(dir)
folders.forEach(folder => {
	if (folder != ".DS_Store") {
		let files = fs.readdirSync(dir + folder)
		console.log(folder, files.length)
		files.forEach(file => {
			if (file != ".DS_Store") {
				let filePath = dir + folder + '/' + file
				let app = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				apps.push(app)
			}
		})
	}
})

console.log(apps.length, "apps")

let uniqueApps = []

for (var i = apps.length - 1; i >= 0; i--) {
	var exists = false
	for (var j = uniqueApps.length - 1; j >= 0; j--) {
		if (apps[i]["id"] == uniqueApps[j]["id"]) {
			exists = true;
			break
		}
	}
	if (!exists) {
		uniqueApps.push(apps[i])
	}
}

console.log(uniqueApps.length, "unique apps")






// var firstApps = []
// for (var i = 0; i < 10; i++) {
// 	firstApps.push(uniqueApps[i])
// }
// console.log(firstApps.length, "firstApps")

// function load(url, callback) {
//     request({url: url, json: true}, function(error, response, body) {
//         if (error) {
//         	console.log('Error', error);
//             return
//         }
//         if (response.statusCode != 200) {
//             console.log('Invalid Status Code', response.statusCode, body);
//             return
//         }
//         callback(body)
//     });
// }

// for (var i = uniqueApps.length - 1; i >= 0; i--) {
// 	let app = uniqueApps[i]
// 	var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"
// 	url += "inputtype=textquery"
// 	url += "&input=" + escape(app["developer"])
// 	url += "&key=AIzaSyDseUwueKelf4CD4iCWRzbDJl_djQLJ9sY"
// 	url += "&fields=formatted_address,geometry,icon,name,photos,plus_code,place_id,types"
// 	console.log("url", url)
// 	load(url, function(result) {
// 		if (result["candidates"].length > 0) {
// 			let appPlace = {
// 				appInfo: { id: app.id, appId: app.appId, title: app.title },
// 				place: { result }
// 			}
// 			let firstCandidate = result["candidates"][0]
// 			console.log(app.id, app.title, firstCandidate["name"], "@", firstCandidate["formatted_address"])
// 			let json = JSON.stringify(appPlace, null, 4);
// 			fs.writeFileSync("places/" + 'place-of-app-' + app.id + '-' + app.appId + '.json', json, 'utf8');
// 		}
// 	})
// }






// try {
// 	fs.unlunkSync("app_list.csv")
// } catch(error) {}

// var csv = "id;appId;title;developer;primaryGenre;size;requiredOsVersion;released;updated;version;price;currency;free;score;reviews;currentVersionScore;currentVersionReviews;developerId;developerUrl;url;languages"

// for (var i = uniqueApps.length - 1; i >= 0; i--) {
// 	let app = uniqueApps[i]
// 	csv += "\n" +
// 			app["id"] + ";" +
// 			app["appId"] + ";" +
// 			app["title"].replace(";", ":,") + ";" +
// 			app["developer"] + ";" +
// 			app["primaryGenre"] + ";" +
// 			app["size"] + ";" +
// 			app["requiredOsVersion"] + ";" +
// 			app["released"] + ";" +
// 			app["updated"] + ";" +
// 			app["version"] + ";" +
// 			(app["price"] != undefined ? String(app["price"]).replace(".", ",") : "-1") + ";" +
// 			app["currency"] + ";" +
// 			app["free"] + ";" +
// 			(app["score"] != undefined ? String(app["score"]).replace(".", ",") : "-1") + ";" +
// 			(app["reviews"] != undefined ? app["reviews"] : "-1") + ";" +
// 			(app["currentVersionScore"] != undefined ? String(app["currentVersionScore"]).replace(".", ",") : "-1") + ";" +
// 			(app["currentVersionReviews"] != undefined ? app["currentVersionReviews"] : "-1") + ";" +
// 			app["developerId"] + ";" +
// 			app["developerUrl"] + ";" +
// 			app["url"] + ";" +
// 			app["languages"].join()
// }

// fs.writeFileSync('app_list.csv', csv, 'utf8');

// console.log("done!")