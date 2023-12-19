// For SamToki.github.io

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
				Anim: {
					Speed: 250
				}
			},
			Sound: {
				PlaySound: true
			},
			I18n: {
				Language: "Unset"
			},
			Dev: {
				ShowAllBorders: false,
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
		function ChangeShowAllBorders(Value) {
			Elements = document.getElementsByTagName("*");
			if(Value == true) {
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].style.border = "1px solid #FF0000";
				}
			} else {
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].style.border = "";
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
			document.getElementById(Name).style.backgroundImage = Value;
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

		// Display (Layout)
		function ChangeDisplay(Name, Value) {
			document.getElementById(Name).style.display = Value;
		}
		function Hide(Name) {
			AddClass(Name, "Hidden");
		}
		function HideByClass(Name) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Hidden");
			}
		}
		function HideHorizontally(Name) {
			AddClass(Name, "Hidden-Horizontal");
		}
		function HideToCorner(Name) {
			AddClass(Name, "Hidden-Corner");
		}
		function Fade(Name) {
			AddClass(Name, "Faded");
		}
		function Show(Name) {
			setTimeout(function() { // Set a delay to prevent dropmenus (DropctrlGroup) from hiding right after showing.
				RemoveClass(Name, "Hidden");
				RemoveClass(Name, "Hidden-Horizontal");
				RemoveClass(Name, "Hidden-Corner");
				RemoveClass(Name, "Faded");
			}, 0);
		}
		function ShowByClass(Name) {
			Elements = document.getElementsByClassName(Name);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.remove("Hidden");
				Elements[Looper].classList.remove("Hidden-Horizontal");
				Elements[Looper].classList.remove("Hidden-Corner");
				Elements[Looper].classList.remove("Faded");
			}
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

		// Animation
		function ChangeAnim(Name, Value) {
			document.getElementById(Name).style.transition = Value;
		}
		function ChangeAnimSpeedOverall(Value) {
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
		function ChangeAudio(Name, Value) { // Example: If the file path is "audio/sounds/PopupDialogShow.mp3", then Value should be "sounds/PopupDialogShow".
			document.getElementById(Name).pause();
			document.getElementById(Name).currentTime = 0;
			document.getElementById(Name).innerHTML = "<source src=\"audio/" + Value + ".mp3\" type=\"audio/mpeg\" />";
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
			Elements[Looper].classList.add("Hidden");
		}
	}

	// Hotkey Indicator
	function ShowHotkeyIndicator() {
		Elements = document.getElementsByClassName("HotkeyIndicator");
		for(Looper = 0; Looper < Elements.length; Looper++) {
			Elements[Looper].classList.remove("Faded");
		}
		switch(System.Display.HotkeyIndicator) {
			case "ShowOnWrongKeyPress":
			case "ShowOnAnyKeyPress":
				clearTimeout(Automation.FadeHotkeyIndicator);
				Automation.FadeHotkeyIndicator = setTimeout(FadeHotkeyIndicator, System.Display.Anim.Speed + 15000);
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
		clearTimeout(Automation.FadeHotkeyIndicator);
		if(System.Display.HotkeyIndicator != "AlwaysShow") {
			Elements = document.getElementsByClassName("HotkeyIndicator");
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Faded");
			}
		}
	}

	// Toast Message
	function ShowToastMessage(Value) {
		ChangeText("Label_ToastMessage", Value);
		Show("Ctnr_ToastMessage");
		clearTimeout(Automation.HideToastMessage);
		Automation.HideToastMessage = setTimeout(HideToastMessage, System.Display.Anim.Speed + 1000);
	}
	function HideToastMessage() {
		clearTimeout(Automation.HideToastMessage);
		Hide("Ctnr_ToastMessage"); Fade("Ctnr_ToastMessage");
	}

	// Popup Dialog
	function ShowPopupDialog(Event, PromptIcon, PromptText, Option1, Option2, Option3) {
		// Event Name
		Interaction.PopupDialogEvent = Event;

		// Icon
		switch(PromptIcon) {
			case "Completion":
				Show("Ctrl_PopupDialogPromptIconCompletion");
				HideHorizontally("Ctrl_PopupDialogPromptIconQuestion");
				HideHorizontally("Ctrl_PopupDialogPromptIconCaution");
				HideHorizontally("Ctrl_PopupDialogPromptIconTermination");
				break;
			case "Question":
				HideHorizontally("Ctrl_PopupDialogPromptIconCompletion");
				Show("Ctrl_PopupDialogPromptIconQuestion");
				HideHorizontally("Ctrl_PopupDialogPromptIconCaution");
				HideHorizontally("Ctrl_PopupDialogPromptIconTermination");
				break;
			case "Caution":
				HideHorizontally("Ctrl_PopupDialogPromptIconCompletion");
				HideHorizontally("Ctrl_PopupDialogPromptIconQuestion");
				Show("Ctrl_PopupDialogPromptIconCaution");
				HideHorizontally("Ctrl_PopupDialogPromptIconTermination");
				break;
			case "Termination":
				HideHorizontally("Ctrl_PopupDialogPromptIconCompletion");
				HideHorizontally("Ctrl_PopupDialogPromptIconQuestion");
				HideHorizontally("Ctrl_PopupDialogPromptIconCaution");
				Show("Ctrl_PopupDialogPromptIconTermination");
				break;
			default:
				alert("Error: The value of Icon in function ShowPopupDialog is out of expectation.");
				break;
		}

		// Text
		ChangeText("Ctrl_PopupDialogPromptText", PromptText);
		ChangeText("Cmdbtn_PopupDialogOption1", Option1);
		ChangeText("Cmdbtn_PopupDialogOption2", Option2);
		ChangeText("Cmdbtn_PopupDialogOption3", Option3); // Option 3 is the default option, will be selected when pressing Esc key. Therefore: When there is a single "OK", put it here. When there are multiple options, put "Cancel" here.

		// Functionality
		if(Option1 == "") {
			ChangeDisabled("Cmdbtn_PopupDialogOption1", true);
			Fade("Ctrl_PopupDialogOption1");
		} else {
			ChangeDisabled("Cmdbtn_PopupDialogOption1", false);
			Show("Ctrl_PopupDialogOption1");
		}
		if(Option2 == "") {
			ChangeDisabled("Cmdbtn_PopupDialogOption2", true);
			Fade("Ctrl_PopupDialogOption2");
		} else {
			ChangeDisabled("Cmdbtn_PopupDialogOption2", false);
			Show("Ctrl_PopupDialogOption2");
		}
		ChangeDisabled("Cmdbtn_PopupDialogOption3", false);

		// Show & Focus
		Show("ScreenFilter_PopupDialog");
		Show("Window_PopupDialog");
		Focus("Window_PopupDialog");
	}
	function HidePopupDialog() {
		// Event Name
		Interaction.PopupDialogEvent = "";

		// Functionality
		ChangeDisabled("Cmdbtn_PopupDialogOption1", true);
		ChangeDisabled("Cmdbtn_PopupDialogOption2", true);
		ChangeDisabled("Cmdbtn_PopupDialogOption3", true);

		// Hide
		Fade("ScreenFilter_PopupDialog");
		Hide("Window_PopupDialog"); Fade("Window_PopupDialog");
	}

// Cmd
	// Settings
		// Display
		function SetDisplayTheme() {
			System.Display.Theme = ReadValue("Combobox_SettingsDisplayTheme");
			RefreshSystem();
		}
		function SetDisplayCursor() {
			System.Display.Cursor = ReadValue("Combobox_SettingsDisplayCursor");
			RefreshSystem();
		}
		function SetDisplayShowTopbar() {
			if(document.getElementById("Checkbox_SettingsDisplayShowTopbar").checked) {
				System.Display.ShowTopbar = true;
			} else {
				System.Display.ShowTopbar = false;
			}
			RefreshSystem();
		}
		function SetDisplayHotkeyIndicator() {
			System.Display.HotkeyIndicator = ReadValue("Combobox_SettingsDisplayHotkeyIndicator");
			RefreshSystem();
		}
		function SetDisplayAnimSpeed() {
			System.Display.Anim.Speed = parseInt(Number(ReadValue("Combobox_SettingsDisplayAnimSpeed")));
			RefreshSystem();
		}

		// Sound
		function SetSoundPlaySound() {
			if(document.getElementById("Checkbox_SettingsSoundPlaySound").checked) {
				System.Sound.PlaySound = true;
			} else {
				System.Sound.PlaySound = false;
			}
			RefreshSystem();
		}

		// Dev
		function SetDevShowAllBorders() {
			if(document.getElementById("Checkbox_SettingsDevShowAllBorders").checked) {
				System.Dev.ShowAllBorders = true;
			} else {
				System.Dev.ShowAllBorders = false;
			}
			RefreshSystem();
		}
		function SetDevUseOldTypeface() {
			if(document.getElementById("Checkbox_SettingsDevUseOldTypeface").checked) {
				System.Dev.UseOldTypeface = true;
			} else {
				System.Dev.UseOldTypeface = false;
			}
			RefreshSystem();
		}
		function SetDevFont() {
			System.Dev.Font = ReadValue("Textbox_SettingsDevFont");
			RefreshSystem();
		}

// Listeners
	// On Scroll
	document.addEventListener("scroll", HighlightActiveSectionInTopbar);

	// On Click (Mouse Left Button or Enter Key)
	document.addEventListener("click", HideDropctrlGroups);

	// On Mouse Button
	document.addEventListener("mousedown", FadeHotkeyIndicator);

	// On Esc Key
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "Escape") {
			HideDropctrlGroups();
			AnswerPopupDialog(3);
		}
	});
