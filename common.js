// For SamToki.github.io
// Released under GNU GPL v3 open source license.
// (C) 2015-2023 SAM TOKI STUDIO

// Reminders
	// About Abbreviations
		// Do not abuse abbreviations. Use only when a word is longer than 8 letters.
		// For example, abbreviate "Animation" into "Anim", but do not abbreviate "Language" into "Lang".
		// Exceptions: "Ctrl", "Cmd".

// Initialization
	// Declare Variables
	"use strict";
		// Unsaved
		var Elements, Looper = 0, Counter = 0,
		Document = {
			NavCtrls: document.getElementsByClassName("Nav"),
			Sections: document.getElementsByTagName("section"),
			ActiveSectionName: ""
		},
		Interaction = {
			DialogEvent: ""
		},
		Automation = {
			HighlightActiveSectionInNav: 0,
			FadeHotkeyIndicators: 0, HideToast: 0
		};

		// Saved
		var System = {
			Display: {
				Theme: "Auto", Cursor: "Default",
				BlurBackground: false, ShowTopbar: true,
				HotkeyIndicators: "ShowOnAnyKeyPress",
				Anim: 250
			},
			Audio: {
				PlayAudio: true
			},
			I18n: {
				Language: "Unset"
			},
			Dev: {
				ShowDebugOutlines: false,
				UseOldTypeface: false,
				Font: ""
			}
		};

// Simplifications
	// Console Logging
	function LogCon(Value) {
		console.log("● " + Value);
	}

	// Read
		// Class
		function IsClassContained(Name, Value) {
			return document.getElementById(Name).classList.contains(Value);
		}

		// Text & Value
		function ReadText(Name) {
			return document.getElementById(Name).innerHTML;
		}
		function ReadValue(Name) {
			return document.getElementById(Name).value;
		}
		function ReadChecked(Name) {
			return document.getElementById(Name).checked;
		}

		// Position
		function ReadTop(Name) {
			return document.getElementById(Name).offsetTop;
		}
		function ReadLeft(Name) {
			return document.getElementById(Name).offsetLeft;
		}

		// Size
		function ReadWidth(Name) {
			return document.getElementById(Name).offsetWidth;
		}
		function ReadHeight(Name) {
			return document.getElementById(Name).offsetHeight;
		}

	// Write
		// Class
		function AddClass(Name, Value) {
			document.getElementById(Name).classList.add(Value);
		}
		function AddClassByClass(Name, Value) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add(Value);
			}
		}
		function RemoveClass(Name, Value) {
			document.getElementById(Name).classList.remove(Value);
		}
		function RemoveClassByClass(Name, Value) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.remove(Value);
			}
		}

		// Text & Value
		function ChangeText(Name, Value) {
			document.getElementById(Name).innerHTML = Value;
		}
		function ChangeValue(Name, Value) {
			document.getElementById(Name).value = Value;
		}

		// Position
		function ChangeTop(Name, Value) {
			document.getElementById(Name).style.top = Value;
		}
		function ChangeLeft(Name, Value) {
			document.getElementById(Name).style.left = Value;
		}
		function ChangeBottom(Name, Value) {
			document.getElementById(Name).style.bottom = Value;
		}
		function ChangeRight(Name, Value) {
			document.getElementById(Name).style.right = Value;
		}
		function ChangeRotate(Name, Value) {
			document.getElementById(Name).style.transform = "rotate(" + Value + "deg)";
		}

		// Size
		function ChangeWidth(Name, Value) {
			document.getElementById(Name).style.width = Value;
		}
		function ChangeHeight(Name, Value) {
			document.getElementById(Name).style.height = Value;
		}
		function ChangeScale(Name, Value) {
			document.getElementById(Name).style.transform = "scale(" + Value + ")";
		}

		// Background
		function ChangeBgImage(Name, Value) {
			document.getElementById(Name).style.backgroundImage = "url(" + Value + ")";
		}
		function ChangeImage(Name, Value) {
			document.getElementById(Name).src = Value;
		}
		function ChangeShowDebugOutlines(Value) {
			Elements = document.getElementsByTagName("*");
			if(Value == true) {
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].classList.add("DebugOutline");
				}
			} else {
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].classList.remove("DebugOutline");
				}
			}
		}

		// Foreground
		function ChangeFont(Name, Value) {
			document.getElementById(Name).style.fontFamily = Value;
		}
		function ChangeProgring(Name, Value) {
			document.getElementById(Name).style.strokeDashoffset = Value;
		}

		// Layout
		function Hide(Name) {
			AddClass(Name, "Hidden");
			ChangeInert(Name, true);
		}
		function HideByClass(Name) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Hidden");
				Elements[Looper].inert = true;
			}
		}
		function HideHorizontally(Name) {
			AddClass(Name, "HiddenHorizontally");
			ChangeInert(Name, true);
		}
		function HideToCorner(Name) {
			AddClass(Name, "HiddenToCorner");
			ChangeInert(Name, true);
		}
		function Fade(Name) {
			AddClass(Name, "Faded");
			ChangeInert(Name, true);
		}
		function FadeByClass(Name) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Faded");
				Elements[Looper].inert = true;
			}
		}
		function Show(Name) {
			setTimeout(function() { // Set a delay to prevent dropmenus (DropctrlGroup) from hiding right after showing.
				RemoveClass(Name, "Hidden");
				RemoveClass(Name, "HiddenHorizontally");
				RemoveClass(Name, "HiddenToCorner");
				RemoveClass(Name, "Faded");
				ChangeInert(Name, false);
			}, 0);
		}
		function ShowByClass(Name) {
			setTimeout(function() {
				Elements = document.getElementsByClassName(Name);
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].classList.remove("Hidden");
					Elements[Looper].classList.remove("HiddenHorizontally");
					Elements[Looper].classList.remove("HiddenToCorner");
					Elements[Looper].classList.remove("Faded");
					Elements[Looper].inert = false;
				}
			}, 0);
		}
		function ChangeCursor(Name, Value) {
			document.getElementById(Name).style.cursor = Value;
		}
		function ChangeCursorOverall(Value) {
			Elements = document.getElementsByTagName("*");
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].style.cursor = Value;
			}
		}
		function EnterFullscreen(Name) {
			document.getElementById(Name).requestFullscreen();
		}
		function ExitFullscreen() {
			document.exitFullscreen();
		}

		// Animation
		function ChangeAnim(Name, Value) {
			document.getElementById(Name).style.transition = Value;
		}
		function ChangeAnimOverall(Value) {
			if(Value == 0) {
				document.getElementById("Html").style.transition = "none";
				document.getElementById("Html").style.scrollBehavior = "auto";
			} else {
				document.getElementById("Html").style.transition = Value + "ms";
				document.getElementById("Html").style.scrollBehavior = "";
			}
		}

		// Functionality
		function ChangeDisabled(Name, Value) {
			document.getElementById(Name).disabled = Value;
		}
		function ChangeInert(Name, Value) {
			document.getElementById(Name).inert = Value;
		}
		function ChangeChecked(Name, Value) {
			document.getElementById(Name).checked = Value;
		}
		function ChangeLanguage(Name, Value) {
			document.getElementById(Name).lang = Value;
		}

		// Audio
		function PlayAudio(Name) {
			if(System.Audio.PlayAudio == true) {
				document.getElementById(Name).currentTime = 0;
				document.getElementById(Name).play();
			}
		}
		function StopAudio(Name) {
			document.getElementById(Name).pause();
		}
		function StopAllAudio() {
			Elements = document.getElementsByClassName("Audio");
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].pause();
			}
		}
		function ChangeAudio(Name, Value) { // Value example: "audio/sounds/DialogShow.mp3"
			StopAudio(Name);
			document.getElementById(Name).innerHTML = "<source src=\"" + Value + "\" />";
			PlayAudio(Name);
		}
		function ChangeVolume(Name, Percentage) {
			document.getElementById(Name).volume = Percentage / 100;
		}
	
	// Interact
	function Focus(Name) {
		document.getElementById(Name).focus();
	}
	function Click(Name) {
		document.getElementById(Name).click();
	}

// Features
	// Maths
	function Randomize(Min, Max) { // Return an integer between two integers.
		return Min + Math.floor(Math.random() * (Max + 1 - Min));
	}

	// Highlight Active Section in Nav
	function HighlightActiveSectionInNav() {
		for(Looper = 0; Looper < Document.Sections.length; Looper++) {
			if(scrollY >= Document.Sections[Looper].offsetTop - 200) {
				Document.ActiveSectionName = Document.Sections[Looper].getAttribute("id");
			}
		}
		for(Looper = 0; Looper < Document.NavCtrls.length; Looper++) {
			if(Document.NavCtrls[Looper].getAttribute("id") == "Nav_" + Document.ActiveSectionName) {
				ChangeLeft("Ctrl_NavUnderline", Document.NavCtrls[Looper].offsetLeft + 9 + "px");
				ChangeWidth("Ctrl_NavUnderline", Document.NavCtrls[Looper].offsetWidth - 18 + "px");
			}
		}
	}

	// Hide DropctrlGroups
	function HideDropctrlGroups() {
		Elements = document.getElementsByClassName("DropctrlGroup");
		for(Looper = 0; Looper < Elements.length; Looper++) {
			Elements[Looper].classList.add("HiddenToCorner");
			Elements[Looper].inert = true;
		}
	}

	// Hotkey Indicators
	function ShowHotkeyIndicators() {
		switch(System.Display.HotkeyIndicators) {
			case "ShowOnWrongKeyPress":
			case "ShowOnAnyKeyPress":
				ShowByClass("HotkeyIndicator");
				clearTimeout(Automation.FadeHotkeyIndicators);
				Automation.FadeHotkeyIndicators = setTimeout(FadeHotkeyIndicators, System.Display.Anim + 15000);
				break;
			case "AlwaysShow":
				ShowByClass("HotkeyIndicator");
				clearTimeout(Automation.FadeHotkeyIndicators);
				break;
			default:
				AlertError("The value of System.Display.HotkeyIndicators in function ShowHotkeyIndicators is out of expectation.");
				break;
		}
	}
	function FadeHotkeyIndicators() {
		if(System.Display.HotkeyIndicators != "AlwaysShow") {
			FadeByClass("HotkeyIndicator");
		}
		clearTimeout(Automation.FadeHotkeyIndicators);
	}

	// Toast
	function ShowToast(Value) {
		ChangeText("Label_Toast", Value);
		Show("Toast");
		clearTimeout(Automation.HideToast);
		Automation.HideToast = setTimeout(HideToast, System.Display.Anim + 1000);
	}
	function HideToast() {
		Hide("Toast");
		clearTimeout(Automation.HideToast);
	}

	// Dialog
	function ShowDialog(Event, Icon, Text, Option1, Option2, Option3) {
		// Event Name
		Interaction.DialogEvent = Event;

		// Icon
		switch(Icon) {
			case "Completion":
				Show("Ctrl_DialogIconCompletion");
				HideHorizontally("Ctrl_DialogIconQuestion");
				HideHorizontally("Ctrl_DialogIconCaution");
				HideHorizontally("Ctrl_DialogIconTermination");
				break;
			case "Question":
				HideHorizontally("Ctrl_DialogIconCompletion");
				Show("Ctrl_DialogIconQuestion");
				HideHorizontally("Ctrl_DialogIconCaution");
				HideHorizontally("Ctrl_DialogIconTermination");
				break;
			case "Caution":
				HideHorizontally("Ctrl_DialogIconCompletion");
				HideHorizontally("Ctrl_DialogIconQuestion");
				Show("Ctrl_DialogIconCaution");
				HideHorizontally("Ctrl_DialogIconTermination");
				break;
			case "Termination":
				HideHorizontally("Ctrl_DialogIconCompletion");
				HideHorizontally("Ctrl_DialogIconQuestion");
				HideHorizontally("Ctrl_DialogIconCaution");
				Show("Ctrl_DialogIconTermination");
				break;
			default:
				AlertError("The value of Icon in function ShowDialog is out of expectation.");
				break;
		}

		// Text
		ChangeText("Label_DialogText", Text);
		ChangeText("Cmdbtn_DialogOption1", Option1);
		ChangeText("Cmdbtn_DialogOption2", Option2);
		ChangeText("Cmdbtn_DialogOption3", Option3); // Option 3 is the default option, will be selected when pressing Esc key. Therefore: When there is a single "OK", put it here. When there are multiple options, put "Cancel" here.

		// Functionality
		if(Option1 == "") {
			Fade("Ctrl_DialogOption1");
		} else {
			Show("Ctrl_DialogOption1");
		}
		if(Option2 == "") {
			Fade("Ctrl_DialogOption2");
		} else {
			Show("Ctrl_DialogOption2");
		}

		// Show
		Show("ScreenFilter_Dialog");
		Show("Window_Dialog");

		// Disable Other Ctrls
		ChangeInert("Topbar", true);
		ChangeInert("Main", true);
	}
	function HideDialog() {
		// Event Name
		Interaction.DialogEvent = "";

		// Hide
		Fade("ScreenFilter_Dialog");
		Hide("Window_Dialog");

		// Enable Other Ctrls
		ChangeInert("Topbar", false);
		ChangeInert("Main", false);
	}

// Cmd
	// Settings
		// Display
		function SetTheme() {
			System.Display.Theme = ReadValue("Combobox_SettingsTheme");
			RefreshSystem();
		}
		function SetCursor() {
			System.Display.Cursor = ReadValue("Combobox_SettingsCursor");
			RefreshSystem();
		}
		function SetBlurBackground() {
			if(document.getElementById("Checkbox_SettingsBlurBackground").checked) {
				System.Display.BlurBackground = true;
			} else {
				System.Display.BlurBackground = false;
			}
			RefreshSystem();
		}
		function SetShowTopbar() {
			if(document.getElementById("Checkbox_SettingsShowTopbar").checked) {
				System.Display.ShowTopbar = true;
			} else {
				System.Display.ShowTopbar = false;
			}
			RefreshSystem();
		}
		function SetHotkeyIndicators() {
			System.Display.HotkeyIndicators = ReadValue("Combobox_SettingsHotkeyIndicators");
			RefreshSystem();
		}
		function SetAnim() {
			System.Display.Anim = parseInt(Number(ReadValue("Combobox_SettingsAnim")));
			RefreshSystem();
		}

		// Audio
		function SetPlayAudio() {
			if(document.getElementById("Checkbox_SettingsPlayAudio").checked) {
				System.Audio.PlayAudio = true;
			} else {
				System.Audio.PlayAudio = false;
			}
			RefreshSystem();
		}

		// Dev
		function SetShowDebugOutlines() {
			if(document.getElementById("Checkbox_SettingsShowDebugOutlines").checked) {
				System.Dev.ShowDebugOutlines = true;
			} else {
				System.Dev.ShowDebugOutlines = false;
			}
			RefreshSystem();
		}
		function SetUseOldTypeface() {
			if(document.getElementById("Checkbox_SettingsUseOldTypeface").checked) {
				System.Dev.UseOldTypeface = true;
			} else {
				System.Dev.UseOldTypeface = false;
			}
			RefreshSystem();
		}
		function SetFont() {
			System.Dev.Font = ReadValue("Textbox_SettingsFont");
			RefreshSystem();
		}

// Listeners
	// On Scroll
	document.addEventListener("scroll", HighlightActiveSectionInNav);

	// On Click (Mouse Left Button, Enter Key or Space Key)
	document.addEventListener("click", HideDropctrlGroups);

	// On Mouse Button
	document.addEventListener("mousedown", FadeHotkeyIndicators);

	// On Esc Key
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "Escape") {
			HideDropctrlGroups();
			if(Interaction.DialogEvent != "") {
				Click("Cmdbtn_DialogOption3");
			}
		}
	});

// Automations
Automation.HighlightActiveSectionInNav = setInterval(HighlightActiveSectionInNav, 500);
