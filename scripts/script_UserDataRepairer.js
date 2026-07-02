// For SamToki.github.io
// Released under GNU GPL v3 open source license.
// © 2023 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";

	// Repair user data: Solves incompatibility after version updates. A repairer may get removed if older than 24 months.
	function RepairUserData() {
		// System
			// v9.00 (2025/12/14)
			// Rename value (Mouse cursor)
			if(localStorage.System != undefined) {
				let System = JSON.parse(localStorage.getItem("System"));
				if(System.Display.Cursor == "Default") {
					System.Display.Cursor = "None";
					localStorage.setItem("System", JSON.stringify(System));
				}
			}

			// v10.00 (2026/02/08)
			// New feature (Fieldset collapsing)
			if(localStorage.System != undefined) {
				let System = JSON.parse(localStorage.getItem("System"));
				if(System.CollapsedFieldset == undefined) {
					System.CollapsedFieldset = [0];
					localStorage.setItem("System", JSON.stringify(System));
				}
			}
	}
