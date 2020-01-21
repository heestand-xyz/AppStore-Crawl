var store = require('app-store-scraper');
var fs = require('fs');

console.log("AppStore Crawl")

let appListIndex = 0
let appList = []

if (appList.length == 0) {
	console.log("appList is empty")
	process.exit()
}

for (var i = appList.length - 1; i >= 0; i--) {
	let name = appList[i]
	let dir = 'apps/' + name
	if (fs.existsSync(dir)) {
		console.log(name, "already exists")
		process.exit()
	}
}

function crawl(name, index) {
	let dir = 'apps/' + name;
	if (!fs.existsSync(dir)) {
	    fs.mkdirSync(dir)
	}
	console.log("crawl", name, index)
	store.search({
	  term: name,
	  num: 100,
	  page: index,
	  country: 'us',
	  lang: 'lang'
	})
	.then(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			let app = data[i]
			let id = app["id"]
			let appid = app["appId"]
			let title = app["title"]
			console.log(id, appid, title)
			let json = JSON.stringify(app, null, 4);
			fs.writeFileSync(dir + '/app-' + id + '-' + appid + '.json', json, 'utf8');
		}
		if (data.length > 0) {
			crawl(name, index + 1)
		} else {
			appListIndex += 1
			if (appListIndex < appList.length) {
				crawl(appList[appListIndex], 1)				
			} else {
				console.log("done!")
			}
		}
	})
	.catch(console.log);
}
crawl(appList[0], 1)

// Pixel Nodes 1313351782
// Clean OSC 1235192209

// store.app({id: 1313351782, ratings: true}).then(console.log).catch(console.log);

// store.list({
//   collection: store.collection.TOP_FREE_IPAD,
//   category: store.category.GAMES_ACTION,
//   num: 10
// })
// .then(console.log)
// .catch(console.log);

// store.suggest({term: 'camera'}).then(console.log).catch(console.log);

// store.similar({id: 1235192209}).then(console.log).catch(console.log);

// store.reviews({
//   appId: 'com.midasplayer.apps.candycrushsaga',
//   sort: store.sort.HELPFUL,
//   page: 2
// })
// .then(console.log)
// .catch(console.log);

// store.ratings({
//   appId: 'com.midasplayer.apps.candycrushsaga',
// })
// .then(console.log)
// .catch(console.log);