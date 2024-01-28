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
			Sections: document.querySelectorAll("section"),
			ActiveSection: 0,
			TopbarLinkbtns: document.querySelectorAll(".TopbarLinkbtn")
		},
		Interaction = {
			PopupDialogEvent: ""
		},
		Automation = {
			FadeHotkeyIndicator: 0, HideToastMessage: 0
		};

		// Saved
		var System = {
			Display: {
				Theme: "Auto", Cursor: "Default",
				ShowTopbar: true,
				HotkeyIndicator: "ShowOnAnyKeyPress",
				Anim: 250
			},
			Sound: {
				PlaySound: true
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

	// Write
		// Class
		function AddClass(Name, Value) {
			document.getElementById(Name).classList.add(Value);
		}
		function RemoveClass(Name, Value) {
			document.getElementById(Name).classList.remove(Value);
		}

		// Text & Value
		function ChangeText(Name, Value) {
			document.getElementById(Name).innerHTML = Value;
		}
		function ChangeValue(Name, Value) {
			document.getElementById(Name).value = Value;
		}

		// Position
		function ChangePosition(Name, Value) {
			document.getElementById(Name).style.position = Value;
		}
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
		function ChangeZIndex(Name, Value) {
			document.getElementById(Name).style.zIndex = Value;
		}
		function ChangeOffsetX(Name, Value) {
			document.getElementById(Name).style.transform = "translateX(" + Value + ")";
		}
		function ChangeOffsetY(Name, Value) {
			document.getElementById(Name).style.transform = "translateY(" + Value + ")";
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
		function ChangeHeightByClass(Name, Value) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) { // Looper must start from zero here.
				Elements[Looper].style.height = Value;
			}
		}
		/* function ChangeBorder(Name, Value) {
			document.getElementById(Name).style.border = Value;
		} */
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
		function ChangeOutline(Name, Value) {
			document.getElementById(Name).style.outline = Value;
		}
		function ChangePadding(Name, Value) {
			document.getElementById(Name).style.padding = Value;
		}
		function ChangeMargin(Name, Value) {
			document.getElementById(Name).style.margin = Value;
		}
		function ChangeScale(Name, Value) {
			document.getElementById(Name).style.transform = "scale(" + Value + ")";
		}

		// Background
		function ChangeBgColor(Name, Value) {
			document.getElementById(Name).style.backgroundColor = Value;
		}
		function ChangeBgImage(Name, Value) {
			document.getElementById(Name).style.backgroundImage = "url(" + Value + ")";
		}
		function ChangeImage(Name, Value) {
			document.getElementById(Name).src = Value;
		}
		function ChangeOpacity(Name, Value) {
			document.getElementById(Name).style.opacity = Value;
		}

		// Foreground
		function ChangeFgColor(Name, Value) {
			document.getElementById(Name).style.color = Value;
		}
		function ChangeFont(Name, Value) {
			document.getElementById(Name).style.fontFamily = Value;
		}
		function ChangeFontOverall(Value) {
			Elements = document.getElementsByTagName("html");
			Elements[0].style.fontFamily = Value;
		}
		function ChangeFontSize(Name, Value) {
			document.getElementById(Name).style.fontSize = Value;
		}
		function ChangeProgring(Name, Value) {
			document.getElementById(Name).style.strokeDashoffset = Value;
		}
		function ChangeFilter(Name, Value) {
			document.getElementById(Name).style.filter = Value;
		}

		// Layout
		function ChangeDisplay(Name, Value) {
			document.getElementById(Name).style.display = Value;
		}
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
			Elements = document.getElementsByTagName("html");
			if(Value == 0) {
				Elements[0].style.transition = "none";
				Elements[0].style.scrollBehavior = "auto";
			} else {
				Elements[0].style.transition = Value + "ms";
				Elements[0].style.scrollBehavior = "";
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

		// Audio
		function PlayAudio(Name) {
			if(System.Sound.PlaySound == true) {
				document.getElementById(Name).currentTime = 0;
				document.getElementById(Name).play();
			}
		}
		function StopAudio(Name) {
			document.getElementById(Name).pause();
		}
		function ChangeAudio(Name, Value) { // Value example: "audio/sounds/PopupDialogShow.mp3"
			document.getElementById(Name).pause();
			document.getElementById(Name).currentTime = 0;
			document.getElementById(Name).innerHTML = "<source src=\"" + Value + "\" />";
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
	// Randomize
	function Randomize(Min, Max) { // Return an integer between two integers.
		return Min + Math.floor(Math.random() * (Max + 1 - Min));
	}

	// Highlight Active Section in Topbar
	function HighlightActiveSectionInTopbar() {
		for(Looper = 0; Looper < Document.Sections.length; Looper++) {
			if(scrollY >= Document.Sections[Looper].offsetTop - 200) {
				Document.ActiveSection = Document.Sections[Looper].getAttribute("id");
			}
		}
		for(Looper = 0; Looper < Document.TopbarLinkbtns.length; Looper++) {
			Document.TopbarLinkbtns[Looper].classList.remove("TopbarLinkbtnActiveSectionHighlight");
			if(Document.TopbarLinkbtns[Looper].getAttribute("id") == "TopbarLinkbtn_" + Document.ActiveSection) {
				Document.TopbarLinkbtns[Looper].classList.add("TopbarLinkbtnActiveSectionHighlight");
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

	// Hotkey Indicator
	function ShowHotkeyIndicator() {
		Elements = document.getElementsByClassName("HotkeyIndicator");
		for(Looper = 0; Looper < Elements.length; Looper++) {
			Elements[Looper].classList.remove("Faded");
			Elements[Looper].inert = false;
		}
		switch(System.Display.HotkeyIndicator) {
			case "ShowOnWrongKeyPress":
			case "ShowOnAnyKeyPress":
				clearTimeout(Automation.FadeHotkeyIndicator);
				Automation.FadeHotkeyIndicator = setTimeout(FadeHotkeyIndicator, System.Display.Anim + 15000);
				break;
			case "AlwaysShow":
				clearTimeout(Automation.FadeHotkeyIndicator);
				break;
			default:
				alert("Error: The value of System.Display.HotkeyIndicator in function ShowHotkeyIndicator is out of expectation.");
				break;
		}
	}
	function FadeHotkeyIndicator() {
		if(System.Display.HotkeyIndicator != "AlwaysShow") {
			Elements = document.getElementsByClassName("HotkeyIndicator");
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Faded");
				Elements[Looper].inert = true;
			}
		}
		clearTimeout(Automation.FadeHotkeyIndicator);
	}

	// Toast Message
	function ShowToastMessage(Value) {
		ChangeText("Label_ToastMessage", Value);
		Show("ToastMessage");
		clearTimeout(Automation.HideToastMessage);
		Automation.HideToastMessage = setTimeout(HideToastMessage, System.Display.Anim + 1000);
	}
	function HideToastMessage() {
		Hide("ToastMessage");
		clearTimeout(Automation.HideToastMessage);
	}

	// Popup Dialog
	function ShowPopupDialog(Event, Icon, Text, Option1, Option2, Option3) {
		// Event Name
		Interaction.PopupDialogEvent = Event;

		// Icon
		switch(Icon) {
			case "Completion":
				Show("Ctrl_PopupDialogIconCompletion");
				HideHorizontally("Ctrl_PopupDialogIconQuestion");
				HideHorizontally("Ctrl_PopupDialogIconCaution");
				HideHorizontally("Ctrl_PopupDialogIconTermination");
				break;
			case "Question":
				HideHorizontally("Ctrl_PopupDialogIconCompletion");
				Show("Ctrl_PopupDialogIconQuestion");
				HideHorizontally("Ctrl_PopupDialogIconCaution");
				HideHorizontally("Ctrl_PopupDialogIconTermination");
				break;
			case "Caution":
				HideHorizontally("Ctrl_PopupDialogIconCompletion");
				HideHorizontally("Ctrl_PopupDialogIconQuestion");
				Show("Ctrl_PopupDialogIconCaution");
				HideHorizontally("Ctrl_PopupDialogIconTermination");
				break;
			case "Termination":
				HideHorizontally("Ctrl_PopupDialogIconCompletion");
				HideHorizontally("Ctrl_PopupDialogIconQuestion");
				HideHorizontally("Ctrl_PopupDialogIconCaution");
				Show("Ctrl_PopupDialogIconTermination");
				break;
			default:
				alert("Error: The value of Icon in function ShowPopupDialog is out of expectation.");
				break;
		}

		// Text
		ChangeText("Label_PopupDialogText", Text);
		ChangeText("Cmdbtn_PopupDialogOption1", Option1);
		ChangeText("Cmdbtn_PopupDialogOption2", Option2);
		ChangeText("Cmdbtn_PopupDialogOption3", Option3); // Option 3 is the default option, will be selected when pressing Esc key. Therefore: When there is a single "OK", put it here. When there are multiple options, put "Cancel" here.

		// Functionality
		if(Option1 == "") {
			Fade("Ctrl_PopupDialogOption1");
		} else {
			Show("Ctrl_PopupDialogOption1");
		}
		if(Option2 == "") {
			Fade("Ctrl_PopupDialogOption2");
		} else {
			Show("Ctrl_PopupDialogOption2");
		}

		// Show
		Show("ScreenFilter_PopupDialog");
		Show("Window_PopupDialog");

		// Disable Other Ctrls
		Elements = document.getElementsByTagName("header");
		Elements[0].inert = true;
		Elements = document.getElementsByTagName("main");
		Elements[0].inert = true;
	}
	function HidePopupDialog() {
		// Event Name
		Interaction.PopupDialogEvent = "";

		// Hide
		Fade("ScreenFilter_PopupDialog");
		Hide("Window_PopupDialog");

		// Enable Other Ctrls
		Elements = document.getElementsByTagName("header");
		Elements[0].inert = false;
		Elements = document.getElementsByTagName("main");
		Elements[0].inert = false;
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
		function SetShowTopbar() {
			if(document.getElementById("Checkbox_SettingsShowTopbar").checked) {
				System.Display.ShowTopbar = true;
			} else {
				System.Display.ShowTopbar = false;
			}
			RefreshSystem();
		}
		function SetHotkeyIndicator() {
			System.Display.HotkeyIndicator = ReadValue("Combobox_SettingsHotkeyIndicator");
			RefreshSystem();
		}
		function SetAnim() {
			System.Display.Anim = parseInt(Number(ReadValue("Combobox_SettingsAnim")));
			RefreshSystem();
		}

		// Sound
		function SetPlaySound() {
			if(document.getElementById("Checkbox_SettingsPlaySound").checked) {
				System.Sound.PlaySound = true;
			} else {
				System.Sound.PlaySound = false;
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
	document.addEventListener("scroll", HighlightActiveSectionInTopbar);

	// On Click (Mouse Left Button, Enter Key or Space Key)
	document.addEventListener("click", HideDropctrlGroups);

	// On Mouse Button
	document.addEventListener("mousedown", FadeHotkeyIndicator);

	// On Esc Key
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "Escape") {
			HideDropctrlGroups();
			if(Interaction.PopupDialogEvent != "") {
				Click("Cmdbtn_PopupDialogOption3");
			}
		}
	});
