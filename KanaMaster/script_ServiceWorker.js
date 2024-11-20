// For SamToki.github.io/KanaMaster
// Released under GNU GPL v3 open source license.
// (C) 2024 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CacheName = "KanaMaster_v3.08";

// Listeners
	// Service worker (https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/#step-5---add-a-service-worker)
	self.addEventListener("install", Event => {
		Event.waitUntil((async() => {
			const CacheContent = await caches.open(CacheName);
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
				"../cursors/BTRAhoge.cur",
				"../cursors/Genshin.cur",
				"../cursors/GenshinFurina.cur",
				"../cursors/GenshinNahida.cur",
				"images/Icon.png",
				"images/Icon_Large.png",
				"images/Icon_Maskable.png",
				"images/Preview.jpg",
				"../images/Background.jpg",
				"../audio/Beep.mp3",
				"audio/Kana_a.mp3",
				"audio/Kana_ba.mp3",
				"audio/Kana_be.mp3",
				"audio/Kana_bi.mp3",
				"audio/Kana_bo.mp3",
				"audio/Kana_bu.mp3",
				"audio/Kana_bya.mp3",
				"audio/Kana_byo.mp3",
				"audio/Kana_byu.mp3",
				"audio/Kana_cha.mp3",
				"audio/Kana_che.mp3",
				"audio/Kana_chi.mp3",
				"audio/Kana_cho.mp3",
				"audio/Kana_chu.mp3",
				"audio/Kana_da.mp3",
				"audio/Kana_de.mp3",
				"audio/Kana_di.mp3",
				"audio/Kana_do.mp3",
				"audio/Kana_dyu.mp3",
				"audio/Kana_e.mp3",
				"audio/Kana_fa.mp3",
				"audio/Kana_fe.mp3",
				"audio/Kana_fi.mp3",
				"audio/Kana_fo.mp3",
				"audio/Kana_fu.mp3",
				"audio/Kana_ga.mp3",
				"audio/Kana_ge.mp3",
				"audio/Kana_gi.mp3",
				"audio/Kana_go.mp3",
				"audio/Kana_gu.mp3",
				"audio/Kana_gya.mp3",
				"audio/Kana_gyo.mp3",
				"audio/Kana_gyu.mp3",
				"audio/Kana_ha.mp3",
				"audio/Kana_he.mp3",
				"audio/Kana_hi.mp3",
				"audio/Kana_ho.mp3",
				"audio/Kana_hya.mp3",
				"audio/Kana_hyo.mp3",
				"audio/Kana_hyu.mp3",
				"audio/Kana_i.mp3",
				"audio/Kana_ja.mp3",
				"audio/Kana_je.mp3",
				"audio/Kana_ji.mp3",
				"audio/Kana_jo.mp3",
				"audio/Kana_ju.mp3",
				"audio/Kana_ka.mp3",
				"audio/Kana_ke.mp3",
				"audio/Kana_ki.mp3",
				"audio/Kana_ko.mp3",
				"audio/Kana_ku.mp3",
				"audio/Kana_kwa.mp3",
				"audio/Kana_kwi.mp3",
				"audio/Kana_kwo.mp3",
				"audio/Kana_kya.mp3",
				"audio/Kana_kyo.mp3",
				"audio/Kana_kyu.mp3",
				"audio/Kana_ma.mp3",
				"audio/Kana_me.mp3",
				"audio/Kana_mi.mp3",
				"audio/Kana_mo.mp3",
				"audio/Kana_mu.mp3",
				"audio/Kana_mya.mp3",
				"audio/Kana_myo.mp3",
				"audio/Kana_myu.mp3",
				"audio/Kana_n.mp3",
				"audio/Kana_na.mp3",
				"audio/Kana_ne.mp3",
				"audio/Kana_ni.mp3",
				"audio/Kana_no.mp3",
				"audio/Kana_nu.mp3",
				"audio/Kana_nya.mp3",
				"audio/Kana_nyo.mp3",
				"audio/Kana_nyu.mp3",
				"audio/Kana_o.mp3",
				"audio/Kana_pa.mp3",
				"audio/Kana_pe.mp3",
				"audio/Kana_pi.mp3",
				"audio/Kana_po.mp3",
				"audio/Kana_pu.mp3",
				"audio/Kana_pya.mp3",
				"audio/Kana_pyo.mp3",
				"audio/Kana_pyu.mp3",
				"audio/Kana_ra.mp3",
				"audio/Kana_re.mp3",
				"audio/Kana_ri.mp3",
				"audio/Kana_ro.mp3",
				"audio/Kana_ru.mp3",
				"audio/Kana_rya.mp3",
				"audio/Kana_ryo.mp3",
				"audio/Kana_ryu.mp3",
				"audio/Kana_sa.mp3",
				"audio/Kana_se.mp3",
				"audio/Kana_sha.mp3",
				"audio/Kana_she.mp3",
				"audio/Kana_shi.mp3",
				"audio/Kana_sho.mp3",
				"audio/Kana_shu.mp3",
				"audio/Kana_so.mp3",
				"audio/Kana_su.mp3",
				"audio/Kana_ta.mp3",
				"audio/Kana_te.mp3",
				"audio/Kana_ti.mp3",
				"audio/Kana_to.mp3",
				"audio/Kana_tsu.mp3",
				"audio/Kana_tyu.mp3",
				"audio/Kana_u.mp3",
				"audio/Kana_va.mp3",
				"audio/Kana_ve.mp3",
				"audio/Kana_vi.mp3",
				"audio/Kana_vo.mp3",
				"audio/Kana_vu.mp3",
				"audio/Kana_wa.mp3",
				"audio/Kana_we.mp3",
				"audio/Kana_wi.mp3",
				"audio/Kana_wo.mp3",
				"audio/Kana_ya.mp3",
				"audio/Kana_ye.mp3",
				"audio/Kana_yo.mp3",
				"audio/Kana_yu.mp3",
				"audio/Kana_za.mp3",
				"audio/Kana_ze.mp3",
				"audio/Kana_zo.mp3",
				"audio/Kana_zu.mp3",
				"docs/假名征服者 快速入门.pdf",
				"docs/假名征服者 说明文档.pdf"
			]);
		})());
	});
	self.addEventListener("fetch", Event => {
		Event.respondWith((async() => {
			const CacheContent = await caches.open(CacheName);
			const CachedResponse = await CacheContent.match(Event.request);
			if(CachedResponse) {
				return CachedResponse;
			} else {
				const FetchResponse = await fetch(Event.request);
				CacheContent.put(Event.request, FetchResponse.clone());
				return FetchResponse;
			}
		})());
	});
