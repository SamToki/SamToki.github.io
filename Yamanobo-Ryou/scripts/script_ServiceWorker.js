// For SamToki.github.io/Yamanobo-Ryou
// Released under GNU GPL v3 open source license.
// (C) 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CacheName = "Yamanobo-Ryou_v0.04";

// Listeners
	// Service worker
	self.addEventListener("install", function(Event) {
		Event.waitUntil(caches.open(CacheName).then(function(CacheContent) {
			CacheContent.addAll([
				"index.html",
				"icons/favicon.ico",
				"../styles/common.css",
				"../styles/common_Dark.css",
				"../styles/common_Genshin.css",
				"../styles/common_HighContrast.css",
				"styles/style.css",
				"styles/style_Dark.css",
				"styles/style_Genshin.css",
				"styles/style_HighContrast.css",
				"../scripts/common.js",
				"../scripts/common_UserDataRepairer.js",
				"scripts/script.js",
				"manifests/manifest.json",
				"images/Icon.png",
				"images/Icon_Large.png",
				"images/Icon_Maskable.png",
				"images/Preview.jpg",
				"images/Background.jpg",
				"images/YamadaRyou.png",
				"images/GotouHitori.png",
				"docs/山田凉上山 快速入门.pdf",
				"docs/山田凉上山 说明文档.pdf"
			]);
		}));
		self.skipWaiting();
	});
	self.addEventListener("fetch", function(Event) {
		Event.respondWith(caches.match(Event.request).then(function(Response) {
			if(Response) {
				return Response;
			} else {
				return fetch(Event.request);
			}
		}));
	});
