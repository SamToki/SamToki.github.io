// For SamToki.github.io
// Released under GNU GPL v3 open source license.
// (C) 2023 SAM TOKI STUDIO

// Reminders
	// About Abbreviations
		// Do not abuse abbreviations. Use only when a word is longer than 8 letters.
		// For example, abbreviate "Animation" into "Anim", but do not abbreviate "Language" into "Lang".
		// Exceptions: "Ctrl", "Cmd".

// Initialization
	// Declare Variables
	"use strict";
		// Unsaved
		var Document = {
			NavCtrls: document.getElementsByClassName("Nav"),
			Sections: document.getElementsByTagName("section"),
			ActiveSectionID: ""
		},
		Interaction = {
			DialogEvent: ""
		},
		Automation = {
			HighlightActiveSectionInNav: null,
			FadeHotkeyIndicators: null, HideToast: null
		};

		// Saved
		var System = {
			Display: {
				Theme: "Auto", Cursor: "Default",
				BlurBgImage: false, ShowTopbar: true,
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
				TryToOptimizePerformance: false,
				ShowDebugOutlines: false,
				UseOldTypeface: false,
				Font: ""
			},
			DontShowAgain: [0],
			Version: {}
		};

// Simplifications
	// Read
		// Class
		function IsClassContained(ID, Class) {
			return document.getElementById(ID).classList.contains(Class);
		}

		// Text & Value
		function ReadText(ID) {
			return document.getElementById(ID).innerHTML;
		}
		function ReadValue(ID) {
			return document.getElementById(ID).value;
		}

		// Position
		function ReadTop(ID) {
			return document.getElementById(ID).offsetTop;
		}
		function ReadLeft(ID) {
			return document.getElementById(ID).offsetLeft;
		}

		// Size
		function ReadWidth(ID) {
			return document.getElementById(ID).offsetWidth;
		}
		function ReadHeight(ID) {
			return document.getElementById(ID).offsetHeight;
		}

		// Layout
		function IsFullscreen() {
			return document.fullscreenElement != null;
		}

		// Functionality
		function IsChecked(ID) {
			return document.getElementById(ID).checked;
		}
		function IsImageLoaded(ID) {
			return document.getElementById(ID).complete;
		}
		function IsAudioLoaded(ID) {
			return document.getElementById(ID).readyState == 4;
		}

	// Write
		// Class
		function AddClass(ID, Class) {
			document.getElementById(ID).classList.add(Class);
		}
		function AddClassByClass(ID, Class) {
			let Elements = document.getElementsByClassName(ID);
			for(let Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add(Class);
			}
		}
		function RemoveClass(ID, Class) {
			document.getElementById(ID).classList.remove(Class);
		}
		function RemoveClassByClass(ID, Class) {
			let Elements = document.getElementsByClassName(ID);
			for(let Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.remove(Class);
			}
		}
		function ChangeIndicatorLight(ID, Value) {
			if(IsClassContained(ID, "IndicatorLight") == true) {
				RemoveClass(ID, "Off");
				RemoveClass(ID, "Red");
				RemoveClass(ID, "Orange");
				RemoveClass(ID, "Green");
				RemoveClass(ID, "Blue");
				AddClass(ID, Value);
			} else {
				AlertSystemError("Function ChangeIndicatorLight received an element \"" + ID + "\" without class IndicatorLight.");
			}
		}

		// Text & Value
		function ChangeText(ID, Text) {
			document.getElementById(ID).innerHTML = Text;
		}
		function AddText(ID, Text) {
			document.getElementById(ID).innerHTML += Text;
		}
		function ChangeValue(ID, Value) {
			document.getElementById(ID).value = Value;
		}

		// Position
		function ChangeTop(ID, Value) {
			document.getElementById(ID).style.top = Value;
		}
		function ChangeLeft(ID, Value) {
			document.getElementById(ID).style.left = Value;
		}
		function ChangeBottom(ID, Value) {
			document.getElementById(ID).style.bottom = Value;
		}
		function ChangeRight(ID, Value) {
			document.getElementById(ID).style.right = Value;
		}
		function ChangeRotate(ID, Value) {
			if(Value != "") {
				document.getElementById(ID).style.transform = "rotate(" + Value + "deg)";
			} else {
				document.getElementById(ID).style.transform = "";
			}
		}

		// Size
		function ChangeWidth(ID, Value) {
			document.getElementById(ID).style.width = Value;
		}
		function ChangeHeight(ID, Value) {
			document.getElementById(ID).style.height = Value;
		}
		function ChangeScale(ID, Value) {
			if(Value != "") {
				document.getElementById(ID).style.transform = "scale(" + Value + ")";
			} else {
				document.getElementById(ID).style.transform = "";
			}
		}

		// Background
		function ChangeBgImage(Value) {
			if(Value != "") {
				document.getElementById("Ctnr_BgImage").style.backgroundImage = "url(" + Value + ")";
			} else {
				document.getElementById("Ctnr_BgImage").style.backgroundImage = "";
			}
		}
		function ChangeImage(ID, Value) {
			document.getElementById(ID).src = Value;
		}
		function ChangeShowDebugOutlines(Value) {
			let Elements = document.getElementsByTagName("*");
			if(Value == true) {
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].classList.add("DebugOutline");
				}
			} else {
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].classList.remove("DebugOutline");
				}
			}
		}
		function ChangeFilter(ID, Value) {
			document.getElementById(ID).style.filter = Value;
		}

		// Foreground
		function ChangeFont(ID, Value) {
			document.getElementById(ID).style.fontFamily = Value;
		}
		function ChangeProgbar(ID, HorizontalOrVertical, Percentage) {
			switch(HorizontalOrVertical) {
				case "Horizontal":
					ChangeWidth(ID, "calc(10px + (100% - 10px) * " + (Percentage / 100) + ")");
					break;
				case "Vertical":
					ChangeHeight(ID, "calc(10px + (100% - 10px) * " + (Percentage / 100) + ")");
					break;
				default:
					AlertSystemError("The value of HorizontalOrVertical \"" + HorizontalOrVertical + "\" in function ChangeProgbar is invalid.");
					break;
			}
		}
		function ChangeShapedProgbar(ID, HorizontalOrVertical, Percentage) {
			switch(HorizontalOrVertical) {
				case "Horizontal":
					document.getElementById(ID).style.clipPath = "inset(0 " + (100 - Percentage) + "% 0 0)";
					break;
				case "Vertical":
					document.getElementById(ID).style.clipPath = "inset(" + (100 - Percentage) + "% 0 0 0)";
					break;
				default:
					AlertSystemError("The value of HorizontalOrVertical \"" + HorizontalOrVertical + "\" in function ChangeShapedProgbar is invalid.");
					break;
			}
		}
		function ChangeProgring(ID, Circumference, Percentage) {
			document.getElementById(ID).style.strokeDashoffset = Circumference * (1 - Percentage / 100);
		}

		// Layout
		function Hide(ID) {
			AddClass(ID, "Hidden");
			ChangeInert(ID, true);
		}
		function HideByClass(Class) {
			let Elements = document.getElementsByClassName(Class);
			for(let Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Hidden");
				Elements[Looper].inert = true;
			}
		}
		function HideHorizontally(ID) {
			AddClass(ID, "HiddenHorizontally");
			ChangeInert(ID, true);
		}
		function HideToCorner(ID) {
			AddClass(ID, "HiddenToCorner");
			ChangeInert(ID, true);
		}
		function Fade(ID) {
			AddClass(ID, "Faded");
			ChangeInert(ID, true);
		}
		function FadeByClass(Class) {
			let Elements = document.getElementsByClassName(Class);
			for(let Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Faded");
				Elements[Looper].inert = true;
			}
		}
		function Show(ID) {
			setTimeout(function() { // Set a delay to prevent dropmenus (DropctrlGroup) etc. from hiding right after showing.
				RemoveClass(ID, "Hidden");
				RemoveClass(ID, "HiddenHorizontally");
				RemoveClass(ID, "HiddenToCorner");
				RemoveClass(ID, "Faded");
				ChangeInert(ID, false);
			}, 0);
		}
		function ShowByClass(Class) {
			setTimeout(function() {
				let Elements = document.getElementsByClassName(Class);
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].classList.remove("Hidden");
					Elements[Looper].classList.remove("HiddenHorizontally");
					Elements[Looper].classList.remove("HiddenToCorner");
					Elements[Looper].classList.remove("Faded");
					Elements[Looper].inert = false;
				}
			}, 0);
		}
		function ScrollIntoView(ID) {
			document.getElementById(ID).scrollIntoView();
		}
		function ChangeCursor(ID, Value) {
			document.getElementById(ID).style.cursor = Value;
		}
		function ChangeCursorOverall(Value) {
			let Elements = document.getElementsByTagName("*");
			for(let Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].style.cursor = Value;
			}
		}
		function ToggleFullscreen() {
			if(IsFullscreen() == false) {
				document.body.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}

		// Animation
		function ChangeAnim(ID, Value) {
			document.getElementById(ID).style.transition = Value;
		}
		function ChangeAnimOverall(Value) {
			if(Value > 0) {
				document.getElementById("Html").style.transition = Value + "ms";
				let Elements = document.getElementsByTagName("*");
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].style.animation = "";
				}
				document.getElementById("Html").style.scrollBehavior = "";
			} else {
				document.getElementById("Html").style.transition = "none";
				let Elements = document.getElementsByTagName("*");
				for(let Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].style.animation = "none";
				}
				document.getElementById("Html").style.scrollBehavior = "auto";
			}
		}

		// Functionality
		function ChangeLanguage(ID, Value) {
			document.getElementById(ID).lang = Value;
		}
		function ChangeLink(ID, Value) {
			document.getElementById(ID).href = Value;
		}
		function ChangeMediaCondition(ID, Value) {
			document.getElementById(ID).media = Value;
		}
		function ChangeChecked(ID, Value) {
			document.getElementById(ID).checked = Value;
		}
		function ChangeDisabled(ID, Value) {
			document.getElementById(ID).disabled = Value;
		}
		function ChangeInert(ID, Value) {
			document.getElementById(ID).inert = Value;
		}

		// Audio
		function LoadAudio(ID, Value) { // Value example: "audio/sounds/Beep.mp3"
			StopAudio(ID);
			if(System.Audio.PlayAudio == true && document.getElementById(ID).volume > 0 && Value != "") {
				ChangeText(ID, "<source src=\"" + Value + "\" />");
				document.getElementById(ID).load();
			}
		}
		function PlayAudio(ID, Value) {
			StopAudio(ID);
			if(System.Audio.PlayAudio == true && document.getElementById(ID).volume > 0) {
				if(Value != null && Value != "") { // Here "null" means do not change audio file. Can be seen on audio elements dedicated to play a single audio.
					ChangeText(ID, "<source src=\"" + Value + "\" />");
					document.getElementById(ID).load();
				}
				document.getElementById(ID).currentTime = 0;
				document.getElementById(ID).play();
			}
		}
		function StopAudio(ID) {
			document.getElementById(ID).pause();
		}
		function StopAllAudio() {
			let Elements = document.getElementsByClassName("Audio");
			for(let Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].pause();
			}
		}
		function ChangeVolume(ID, Percentage) {
			document.getElementById(ID).volume = Percentage / 100;
		}

	// Interact
	function Focus(ID) {
		document.getElementById(ID).focus();
	}
	function Click(ID) {
		document.getElementById(ID).click();
	}
	function SelectText(ID) {
		document.getElementById(ID).select();
	}

// Cmd
	// General
	function ShowIAmHere(ID) {
		if(System.Display.Anim > 0) {
			setTimeout(function() {
				AddClass(ID, "IAmHere");
			}, 500);
			setTimeout(function() {
				RemoveClass(ID, "IAmHere");
			}, 520 + System.Display.Anim);
			setTimeout(function() {
				AddClass(ID, "IAmHere");
			}, 540 + System.Display.Anim * 2);
			setTimeout(function() {
				RemoveClass(ID, "IAmHere");
			}, 560 + System.Display.Anim * 3);
		} else {
			setTimeout(function() {
				AddClass(ID, "IAmHere");
			}, 250);
			setTimeout(function() {
				RemoveClass(ID, "IAmHere");
			}, 500);
			setTimeout(function() {
				AddClass(ID, "IAmHere");
			}, 750);
			setTimeout(function() {
				RemoveClass(ID, "IAmHere");
			}, 1000);
		}
	}

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
		function SetBlurBgImage() {
			System.Display.BlurBgImage = IsChecked("Checkbox_SettingsBlurBgImage");
			RefreshSystem();
		}
		function SetShowTopbar() {
			System.Display.ShowTopbar = IsChecked("Checkbox_SettingsShowTopbar");
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
			System.Audio.PlayAudio = IsChecked("Checkbox_SettingsPlayAudio");
			RefreshSystem();
		}

		// Dev
		function SetTryToOptimizePerformance() {
			System.Dev.TryToOptimizePerformance = IsChecked("Checkbox_SettingsTryToOptimizePerformance");
			RefreshSystem();
		}
		function SetShowDebugOutlines() {
			System.Dev.ShowDebugOutlines = IsChecked("Checkbox_SettingsShowDebugOutlines");
			RefreshSystem();
		}
		function SetUseOldTypeface() {
			System.Dev.UseOldTypeface = IsChecked("Checkbox_SettingsUseOldTypeface");
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
	document.addEventListener("pointerdown", FadeHotkeyIndicators);

	// On Esc Key
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "Escape") {
			if(Interaction.DialogEvent == "") {
				HideDropctrlGroups();
			} else {
				setTimeout(function() { // Set a delay for the Esc key event listener in script.js to respond first, knowing whether a dialog event is present.
					AnswerDialog(3);
				}, 0);
			}
		}
	});

	// On Toggling Fullscreen
	document.addEventListener("fullscreenchange", function() {
		RefreshSystem();
	});

// Automations
Automation.HighlightActiveSectionInNav = setInterval(HighlightActiveSectionInNav, 500);

// Features
	// Maths
	function Randomize(Min, Max) { // Return an integer between two integers.
		return Min + Math.floor(Math.random() * (Max + 1 - Min));
	}

	// Highlight Active Section in Nav
	function HighlightActiveSectionInNav() {
		for(let Looper = 0; Looper < Document.Sections.length; Looper++) {
			if(scrollY >= Document.Sections[Looper].offsetTop - 200) {
				Document.ActiveSectionID = Document.Sections[Looper].getAttribute("id");
			}
		}
		for(let Looper = 0; Looper < Document.NavCtrls.length; Looper++) {
			if(Document.NavCtrls[Looper].getAttribute("id") == "Nav_" + Document.ActiveSectionID) {
				ChangeLeft("Ctrl_NavUnderline", Document.NavCtrls[Looper].offsetLeft + 4 + "px");
				ChangeWidth("Ctrl_NavUnderline", Document.NavCtrls[Looper].offsetWidth - 8 + "px");
			}
		}
	}

	// Hide DropctrlGroups
	function HideDropctrlGroups() {
		let Elements = document.getElementsByClassName("DropctrlGroup");
		for(let Looper = 0; Looper < Elements.length; Looper++) {
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
				AlertSystemError("The value of System.Display.HotkeyIndicators \"" + System.Display.HotkeyIndicators + "\" in function ShowHotkeyIndicators is invalid.");
				break;
		}
	}
	function FadeHotkeyIndicators() {
		if(System.Display.HotkeyIndicators != "AlwaysShow") {
			FadeByClass("HotkeyIndicator");
		}
		clearTimeout(Automation.FadeHotkeyIndicators);
	}
	function IsWrongKeyNegligible(HotkeyName) {
		switch(HotkeyName) {
			case "Control":
			case "Shift":
			case "Alt":
			case "Meta": // Windows key, Linux Super key, macOS Command key.
			case "ContextMenu":
			case "Escape":
			case "Tab":
			case "Enter":
			case " ":
			case "ArrowUp":
			case "ArrowDown":
			case "ArrowLeft":
			case "ArrowRight":
			case "Home":
			case "End":
			case "PageUp":
			case "PageDown":
			case "NumLock":
			case "CapsLock":
			case "ScrollLock":
				return true;
			default:
				return false;
		}
	}

	// Toast
	function ShowToast(Text) {
		ChangeText("Label_Toast", Text);
		Show("Toast");
		clearTimeout(Automation.HideToast);
		Automation.HideToast = setTimeout(HideToast, System.Display.Anim + 1000);
	}
	function HideToast() {
		Hide("Toast");
		clearTimeout(Automation.HideToast);
	}

	// Dialog
	function ShowDialog(Event, Icon, Text, CheckboxOption, Option1, Option2, Option3) {
		// Event Name
		Interaction.DialogEvent = Event;

		// Icon
		switch(Icon) {
			case "Info":
				Show("Ctrl_DialogIconInfo");
				HideHorizontally("Ctrl_DialogIconQuestion");
				HideHorizontally("Ctrl_DialogIconCaution");
				HideHorizontally("Ctrl_DialogIconError");
				break;
			case "Question":
				HideHorizontally("Ctrl_DialogIconInfo");
				Show("Ctrl_DialogIconQuestion");
				HideHorizontally("Ctrl_DialogIconCaution");
				HideHorizontally("Ctrl_DialogIconError");
				break;
			case "Caution":
				HideHorizontally("Ctrl_DialogIconInfo");
				HideHorizontally("Ctrl_DialogIconQuestion");
				Show("Ctrl_DialogIconCaution");
				HideHorizontally("Ctrl_DialogIconError");
				break;
			case "Error":
				HideHorizontally("Ctrl_DialogIconInfo");
				HideHorizontally("Ctrl_DialogIconQuestion");
				HideHorizontally("Ctrl_DialogIconCaution");
				Show("Ctrl_DialogIconError");
				break;
			default:
				AlertSystemError("The value of Icon \"" + Icon + "\" in function ShowDialog is invalid.");
				break;
		}

		// Text
		ChangeText("Label_DialogText", Text);
		ChangeText("Label_DialogCheckboxOption", CheckboxOption);
		ChangeText("Cmdbtn_DialogOption1", Option1);
		ChangeText("Cmdbtn_DialogOption2", Option2);
		ChangeText("Cmdbtn_DialogOption3", Option3); // Option 3 is the default option, will be selected when pressing Esc key. Therefore: When there is a single "OK", put it here. When there are multiple options, put "Cancel" here.

		// Functionality
		if(CheckboxOption != "") {
			Show("Ctrl_DialogCheckboxOption");
			ChangeChecked("Checkbox_DialogCheckboxOption", false);
		} else {
			Fade("Ctrl_DialogCheckboxOption");
		}
		if(Option1 != "") {
			Show("Ctrl_DialogOption1");
		} else {
			Fade("Ctrl_DialogOption1");
		}
		if(Option2 != "") {
			Show("Ctrl_DialogOption2");
		} else {
			Fade("Ctrl_DialogOption2");
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

// Error Handling
window.addEventListener("error", function() {
	AlertSystemError("(See above or below)");
});
