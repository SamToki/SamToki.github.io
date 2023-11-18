// For SamToki.github.io

// Reminders
	// About Abbreviations
		// Do not abuse abbreviations. Use only when a word is longer than 8 letters.
		// For example, abbreviate "Animation" into "Anim", but do not abbreviate "Language" into "Lang".
		// Exception: "Ctrl", "Cmd".

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
			HotkeyIndicatorDisappear: 0, ToastMessageDisappear: 0
		};

		// Saved
		var System = {
			Display: {
				Theme: "Auto", Cursor: "Default",
				ShowTopbar: true,
				HotkeyIndicator: "ShowOnAnyKeyPress",
				Anim: {
					Speed: 300
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
	function ConLog(Var1) {
		console.log("● " + Var1);
	}

	// Read
		// Class
		function ReadClassContain(Var1, Var2) {
			return document.getElementById(Var1).classList.contains(Var2);
		}

		// Text & Value
		function ReadText(Var1) {
			return document.getElementById(Var1).innerHTML;
		}
		function ReadValue(Var1) {
			return document.getElementById(Var1).value;
		}
		function ReadChecked(Var1) {
			return document.getElementById(Var1).checked;
		}

	// Write
		// Class
		function ChangeClassAdd(Var1, Var2) {
			document.getElementById(Var1).classList.add(Var2);
		}
		function ChangeClassRemove(Var1, Var2) {
			document.getElementById(Var1).classList.remove(Var2);
		}

		// Text & Value
		function ChangeText(Var1, Var2) {
			document.getElementById(Var1).innerHTML = Var2;
		}
		function ChangeValue(Var1, Var2) {
			document.getElementById(Var1).value = Var2;
		}

		// Position
		function ChangePosition(Var1, Var2) {
			document.getElementById(Var1).style.position = Var2;
		}
		function ChangeTop(Var1, Var2) {
			document.getElementById(Var1).style.top = Var2;
		}
		function ChangeLeft(Var1, Var2) {
			document.getElementById(Var1).style.left = Var2;
		}
		function ChangeBottom(Var1, Var2) {
			document.getElementById(Var1).style.bottom = Var2;
		}
		function ChangeRight(Var1, Var2) {
			document.getElementById(Var1).style.right = Var2;
		}
		function ChangeZIndex(Var1, Var2) {
			document.getElementById(Var1).style.zIndex = Var2;
		}
		function ChangeMoveX(Var1, Var2) {
			document.getElementById(Var1).style.transform = "translateX(" + Var2 + ")";
		}
		function ChangeMoveY(Var1, Var2) {
			document.getElementById(Var1).style.transform = "translateY(" + Var2 + ")";
		}
		function ChangeRotate(Var1, Var2) {
			document.getElementById(Var1).style.transform = "rotate(" + Var2 + "deg)";
		}

		// Size
		function ChangeWidth(Var1, Var2) {
			document.getElementById(Var1).style.width = Var2;
		}
		function ChangeHeight(Var1, Var2) {
			document.getElementById(Var1).style.height = Var2;
		}
		function ChangeHeightByClass(Var1, Var2) {
			Elements = document.getElementsByClassName(Var1);
			for(Looper = 0; Looper < Elements.length; Looper++) { // Looper must start from zero here.
				Elements[Looper].style.height = Var2;
			}
		}
		/* function ChangeBorder(Var1, Var2) {
			document.getElementById(Var1).style.border = Var2;
		} */
		function ChangeShowAllBorders(Var2) {
			Elements = document.getElementsByTagName("*");
			if(Var2 == true) {
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].style.border = "1px solid #FF0000";
				}
			} else {
				for(Looper = 0; Looper < Elements.length; Looper++) {
					Elements[Looper].style.border = "";
				}
			}
		}
		function ChangeOutline(Var1, Var2) {
			document.getElementById(Var1).style.outline = Var2;
		}
		function ChangePadding(Var1, Var2) {
			document.getElementById(Var1).style.padding = Var2;
		}
		function ChangeMargin(Var1, Var2) {
			document.getElementById(Var1).style.margin = Var2;
		}
		function ChangeScale(Var1, Var2) {
			document.getElementById(Var1).style.transform = "scale(" + Var2 + ")";
		}

		// Background
		function ChangeBgColor(Var1, Var2) {
			document.getElementById(Var1).style.backgroundColor = Var2;
		}
		function ChangeBgImage(Var1, Var2) {
			document.getElementById(Var1).style.backgroundImage = Var2;
		}
		function ChangeOpacity(Var1, Var2) {
			document.getElementById(Var1).style.opacity = Var2;
		}

		// Foreground
		function ChangeFgColor(Var1, Var2) {
			document.getElementById(Var1).style.color = Var2;
		}
		function ChangeFont(Var1, Var2) {
			document.getElementById(Var1).style.fontFamily = Var2;
		}
		function ChangeFontOverall(Var2) {
			Elements = document.getElementsByTagName("html");
			Elements[0].style.fontFamily = Var2;
		}
		function ChangeFontSize(Var1, Var2) {
			document.getElementById(Var1).style.fontSize = Var2;
		}
		function ChangeProgring(Var1, Var2) {
			document.getElementById(Var1).style.strokeDashoffset = Var2;
		}
		function ChangeFilter(Var1, Var2) {
			document.getElementById(Var1).style.filter = Var2;
		}

		// Display (Layout)
		function ChangeDisplay(Var1, Var2) {
			document.getElementById(Var1).style.display = Var2;
		}
		function ChangeHide(Var1) {
			ChangeClassAdd(Var1, "Hidden");
		}
		function ChangeHideByClass(Var1) {
			Elements = document.getElementsByClassName(Var1);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Hidden");
			}
		}
		function ChangeHideHorizontally(Var1) {
			ChangeClassAdd(Var1, "Hidden-Horizontal");
		}
		function ChangeHideToCorner(Var1) {
			ChangeClassAdd(Var1, "Hidden-Corner");
		}
		function ChangeFade(Var1) {
			ChangeClassAdd(Var1, "Faded");
		}
		function ChangeShow(Var1) {
			setTimeout(function() { // Set a delay to prevent dropmenus (DropctrlGroup) from hiding right after showing.
				ChangeClassRemove(Var1, "Hidden");
				ChangeClassRemove(Var1, "Hidden-Horizontal");
				ChangeClassRemove(Var1, "Hidden-Corner");
				ChangeClassRemove(Var1, "Faded");
			}, 0);
		}
		function ChangeShowByClass(Var1) {
			Elements = document.getElementsByClassName(Var1);
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.remove("Hidden");
				Elements[Looper].classList.remove("Hidden-Horizontal");
				Elements[Looper].classList.remove("Hidden-Corner");
				Elements[Looper].classList.remove("Faded");
			}
		}
		function ChangeCursor(Var1, Var2) {
			document.getElementById(Var1).style.cursor = Var2;
		}
		function ChangeCursorOverall(Var2) {
			Elements = document.getElementsByTagName("*");
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].style.cursor = Var2;
			}
		}

		// Animation
		function ChangeAnim(Var1, Var2) {
			document.getElementById(Var1).style.transition = Var2;
		}
		function ChangeAnimSpeedOverall(Var2) {
			Elements = document.getElementsByTagName("html");
			if(Var2 == 0) {
				Elements[0].style.transition = "none";
				Elements[0].style.animation = "none";
				Elements[0].style.scrollBehavior = "auto";
			} else {
				Elements[0].style.transition = Var2 + "ms";
				Elements[0].style.animation = "";
				Elements[0].style.scrollBehavior = "";
			}
		}

		// Functionality
		function ChangeDisabled(Var1, Var2) {
			document.getElementById(Var1).disabled = Var2;
		}
		function ChangeChecked(Var1, Var2) {
			document.getElementById(Var1).checked = Var2;
		}

		// Audio
		function AudioPlay(Var1) {
			if(System.Sound.PlaySound == true) {
				document.getElementById(Var1).currentTime = 0;
				document.getElementById(Var1).play();
			}
		}
		function AudioStop(Var1) {
			document.getElementById(Var1).pause();
		}
		function AudioChangeFile(Var1, Var2) { // Example: If the file path is "audio/sounds/PopupDialogAppear.mp3", then Var2 should be "sounds/PopupDialogAppear".
			document.getElementById(Var1).innerHTML = "<source src=\"audio/" + Var2 + ".mp3\" type=\"audio/mpeg\" />";
		}
	
	// Interact
	function Focus(Var1) {
		document.getElementById(Var1).focus();
	}
	function Click(Var1) {
		document.getElementById(Var1).click();
	}

// Features
	// Randomize
	function Randomize(Var1, Var2) { // Return an integer between two integers.
		return Var1 + Math.floor(Math.random() * (Var2 + 1 - Var1));
	}

	// Highlight Active Section in Topbar
	function HighlightActiveSectionInTopbar() {
		for(Looper = 0; Looper < Document.Sections.length; Looper++) {
			if(scrollY >= Document.Sections[Looper].offsetTop - 100) {
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
	function HotkeyIndicatorAppear() {
		Elements = document.getElementsByClassName("HotkeyIndicator");
		for(Looper = 0; Looper < Elements.length; Looper++) {
			Elements[Looper].classList.remove("Faded");
		}
		switch(System.Display.HotkeyIndicator) {
			case "ShowOnWrongKeyPress":
			case "ShowOnAnyKeyPress":
				clearTimeout(Automation.HotkeyIndicatorDisappear);
				Automation.HotkeyIndicatorDisappear = setTimeout(HotkeyIndicatorDisappear, System.Display.Anim.Speed + 15000);
				break;
			case "AlwaysShow":
				clearTimeout(Automation.HotkeyIndicatorDisappear);
				break;
			default:
				alert("Error: The value of System.Display.HotkeyIndicator in function HotkeyIndicatorAppear is out of expectation.");
				break;
		}
	}
	function HotkeyIndicatorDisappear() {
		clearTimeout(Automation.HotkeyIndicatorDisappear);
		if(System.Display.HotkeyIndicator != "AlwaysShow") {
			Elements = document.getElementsByClassName("HotkeyIndicator");
			for(Looper = 0; Looper < Elements.length; Looper++) {
				Elements[Looper].classList.add("Faded");
			}
		}
	}

	// Toast Message
	function ToastMessageAppear(Var1) {
		ChangeText("Label_ToastMessage", Var1);
		ChangeTop("Ctnr_ToastMessage", "calc(50vh - 30px)");
		ChangeShow("Ctnr_ToastMessage");
		clearTimeout(Automation.ToastMessageDisappear);
		Automation.ToastMessageDisappear = setTimeout(ToastMessageDisappear, System.Display.Anim.Speed + 1000);
	}
	function ToastMessageDisappear() {
		clearTimeout(Automation.ToastMessageDisappear);
		ChangeTop("Ctnr_ToastMessage", "50vh");
		ChangeHide("Ctnr_ToastMessage"); ChangeFade("Ctnr_ToastMessage");
	}

	// Popup Dialog
	function PopupDialogAppear(Var1, Var2, Var3, Var4, Var5, Var6) {
		// Event Name
		Interaction.PopupDialogEvent = Var1;

		// Icon
		switch(Var2) {
			case "Completion":
				ChangeShow("Ctrl_PopupDialogIconCompletion");
				ChangeHideHorizontally("Ctrl_PopupDialogIconQuestion");
				ChangeHideHorizontally("Ctrl_PopupDialogIconCaution");
				ChangeHideHorizontally("Ctrl_PopupDialogIconTermination");
				break;
			case "Question":
				ChangeHideHorizontally("Ctrl_PopupDialogIconCompletion");
				ChangeShow("Ctrl_PopupDialogIconQuestion");
				ChangeHideHorizontally("Ctrl_PopupDialogIconCaution");
				ChangeHideHorizontally("Ctrl_PopupDialogIconTermination");
				break;
			case "Caution":
				ChangeHideHorizontally("Ctrl_PopupDialogIconCompletion");
				ChangeHideHorizontally("Ctrl_PopupDialogIconQuestion");
				ChangeShow("Ctrl_PopupDialogIconCaution");
				ChangeHideHorizontally("Ctrl_PopupDialogIconTermination");
				break;
			case "Termination":
				ChangeHideHorizontally("Ctrl_PopupDialogIconCompletion");
				ChangeHideHorizontally("Ctrl_PopupDialogIconQuestion");
				ChangeHideHorizontally("Ctrl_PopupDialogIconCaution");
				ChangeShow("Ctrl_PopupDialogIconTermination");
				break;
			default:
				alert("Error: The value of Var2 in function PopupDialogAppear is out of expectation.");
				break;
		}

		// Text
		ChangeText("Ctrl_PopupDialogText", Var3);
		ChangeText("Cmdbtn_PopupDialogOption1", Var4);
		ChangeText("Cmdbtn_PopupDialogOption2", Var5);
		ChangeText("Cmdbtn_PopupDialogOption3", Var6); // Option 3 is the default option, will be selected when pressing Esc key. Therefore: When there is a single "OK", put it here. When there are multiple options, put "Cancel" here.

		// Functionality
		if(Var4 == "") {
			ChangeDisabled("Cmdbtn_PopupDialogOption1", true);
			ChangeFade("Ctrl_PopupDialogOption1");
		} else {
			ChangeDisabled("Cmdbtn_PopupDialogOption1", false);
			ChangeShow("Ctrl_PopupDialogOption1");
		}
		if(Var5 == "") {
			ChangeDisabled("Cmdbtn_PopupDialogOption2", true);
			ChangeFade("Ctrl_PopupDialogOption2");
		} else {
			ChangeDisabled("Cmdbtn_PopupDialogOption2", false);
			ChangeShow("Ctrl_PopupDialogOption2");
		}
		ChangeDisabled("Cmdbtn_PopupDialogOption3", false);

		// Show & Focus
		ChangeShow("Ctnr_PopupDialog");
		ChangeShow("Window_PopupDialog");
		Focus("Window_PopupDialog");
	}
	function PopupDialogDisappear() {
		// Event Name
		Interaction.PopupDialogEvent = "";

		// Functionality
		ChangeDisabled("Cmdbtn_PopupDialogOption1", true);
		ChangeDisabled("Cmdbtn_PopupDialogOption2", true);
		ChangeDisabled("Cmdbtn_PopupDialogOption3", true);

		// Hide
		ChangeFade("Ctnr_PopupDialog");
		ChangeHide("Window_PopupDialog");
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
	document.addEventListener("mousedown", HotkeyIndicatorDisappear);

	// On Esc Key
	document.addEventListener("keydown", function(Hotkey) {
		if(Hotkey.key == "Escape") {
			HideDropctrlGroups();
			PopupDialogAnswer(3);
		}
	});
