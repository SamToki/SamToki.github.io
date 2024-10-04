// For SamToki.github.io
// Released under GNU GPL v3 open source license.
// (C) 2023 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

	// Repair user data: Solves incompatibility after major version updates.
	window.onload = RepairUserData();
	function RepairUserData() {
		// KanaMaster
			// v2.00 audio feature
			if(localStorage.KanaMaster_Subsystem != undefined) {
				let Subsystem = JSON.parse(localStorage.getItem("KanaMaster_Subsystem"));
				if(Subsystem.Audio == undefined) {
					Subsystem.Audio = {
						VoiceVolume: 0,
						AlsoPlayVoiceWhenAnsweringWrongly: false
					};
					localStorage.setItem("KanaMaster_Subsystem", JSON.stringify(Subsystem));
					console.info("Repaired user data \"KanaMaster Subsystem Audio\".");
				}
			}
	}
