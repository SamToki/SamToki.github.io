// For SamToki.github.io/LifetimeCountdown

// Initialization
	// Declare Variables
	"use strict";
		// Unsaved
		var Timer0 = {
			ClockTime: 0, EndTime: 2840111999000, // Timestamp 2840111999000 stands for 2059/12/31 23:59:59 (UTC+8).
			CurrentTime: 0, Display: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		};
		Automation.ClockTimer = 0;

	// Load User Data
	window.onload = Load();
	function Load() {
		if(typeof(localStorage.System) != "undefined") {
			System = JSON.parse(localStorage.getItem("System"));
		} else {
			System.I18n.Language = "zh-CN";
		}
		switch(System.I18n.Language) {
			case "zh-CN":
				/* ChangeCursorOverall("wait");
				window.location.replace("index.html"); */
				break;
			case "en-US":
				PopupDialogAppear("System_LanguageUnsupported",
					"Termination",
					"<span lang='en-US'>Sorry, this page currently does not support English (US).</span>",
					"", "", "<span lang='en-US'>OK</span>");
				break;
			case "ja-JP":
				PopupDialogAppear("System_LanguageUnsupported",
					"Termination",
					"<span lang='ja-JP'>すみません。このページは日本語にまだサポートしていません。</span>",
					"", "", "<span lang='ja-JP'>OK</span>");
				break;
			case "zh-TW":
				PopupDialogAppear("System_LanguageUnsupported",
					"Termination",
					"<span lang='zh-TW'>抱歉，本頁面暫不支援繁體中文。</span>",
					"", "", "<span lang='zh-TW'>確定</span>");
				break;
			default:
				alert("Error: The value of System.I18n.Language in function window.onload is out of expectation.");
				break;
		}
		RefreshSystem();
	}

// Refresh
	// System
	function RefreshSystem() {
		// Settings
			// Display
			ChangeValue("Combobox_SettingsDisplayTheme", System.Display.Theme);
			switch(System.Display.Theme) {
				case "Auto":
					document.getElementById("ThemeVariant_Common").href = "../common-Dark.css";
					document.getElementById("ThemeVariant_Common").media = "(prefers-color-scheme: dark)";
					/* document.getElementById("ThemeVariant_Style").href = "style-Dark.css";
					document.getElementById("ThemeVariant_Style").media = "(prefers-color-scheme: dark)"; */
					break;
				case "Default":
					document.getElementById("ThemeVariant_Common").href = "";
					document.getElementById("ThemeVariant_Common").media = "";
					/* document.getElementById("ThemeVariant_Style").href = "";
					document.getElementById("ThemeVariant_Style").media = ""; */
					break;
				case "Dark":
					document.getElementById("ThemeVariant_Common").href = "../common-Dark.css";
					document.getElementById("ThemeVariant_Common").media = "";
					/* document.getElementById("ThemeVariant_Style").href = "style-Dark.css";
					document.getElementById("ThemeVariant_Style").media = ""; */
					break;
				case "Genshin":
					document.getElementById("ThemeVariant_Common").href = "../common-Genshin.css";
					document.getElementById("ThemeVariant_Common").media = "";
					/* document.getElementById("ThemeVariant_Style").href = "style-Genshin.css";
					document.getElementById("ThemeVariant_Style").media = ""; */
					break;
				case "HighContrast":
					document.getElementById("ThemeVariant_Common").href = "../common-HighContrast.css";
					document.getElementById("ThemeVariant_Common").media = "";
					/* document.getElementById("ThemeVariant_Style").href = "style-HighContrast.css";
					document.getElementById("ThemeVariant_Style").media = ""; */
					break;
				default:
					alert("Error: The value of System.Display.Theme in function RefreshSystem is out of expectation.");
					break;
			}
			ChangeValue("Combobox_SettingsDisplayCursor", System.Display.Cursor);
			switch(System.Display.Cursor) {
				case "Default":
					ChangeCursorOverall("");
					break;
				case "BTRAhoge":
					ChangeCursorOverall("url(../cursors/BTRAhoge.cur), auto");
					break;
				case "Genshin":
					ChangeCursorOverall("url(../cursors/Genshin.cur), auto");
					break;
				case "GenshinNahida":
					ChangeCursorOverall("url(../cursors/GenshinNahida.cur), auto");
					break;
				case "GenshinFurina":
					ChangeCursorOverall("url(../cursors/GenshinFurina.cur), auto");
					break;
				default:
					alert("Error: The value of System.Display.Cursor in function RefreshSystem is out of expectation.");
					break;
			}
			ChangeChecked("Checkbox_SettingsDisplayShowTopbar", System.Display.ShowTopbar);
			if(System.Display.ShowTopbar == true) {
				ChangeShow("Topbar");
				ChangePadding("SectionTitleBelowTopbar", "");
			} else {
				ChangeHide("Topbar");
				ChangePadding("SectionTitleBelowTopbar", "40px 0 40px 0");
			}
			ChangeValue("Combobox_SettingsDisplayAnimSpeed", System.Display.Anim.Speed);
			ChangeAnimSpeedOverall(System.Display.Anim.Speed);
			
			// Dev
			ChangeChecked("Checkbox_SettingsDevShowAllBorders", System.Dev.ShowAllBorders);
			ChangeShowAllBorders(System.Dev.ShowAllBorders);
			ChangeChecked("Checkbox_SettingsDevUseOldTypeface", System.Dev.UseOldTypeface);
			Elements = document.getElementsByTagName("html");
			if(System.Dev.UseOldTypeface == true) {
				Elements[0].lang = "ja-JP";
			} else {
				Elements[0].lang = "zh-CN";
			}
			ChangeValue("Textbox_SettingsDevFont", System.Dev.Font);
			ChangeFontOverall(System.Dev.Font);

			// User Data
			ChangeValue("Textbox_SettingsUserDataImport", "");

		// Save User Data
		localStorage.setItem("System", JSON.stringify(System));
	}

	// Timer
	function ClockTimer() {
		// Core
			// Clock Time
			Timer0.ClockTime = Date.now(); // Here do not take the time zone into account.

			// Update Current Time
			Timer0.CurrentTime = Timer0.EndTime - Timer0.ClockTime;
			if(Timer0.ClockTime >= Timer0.EndTime) {
				Timer0.CurrentTime = 0;
			}

		// Dashboard
			// Scrolling Numbers
			Timer0.Display[1] = Math.floor(Timer0.CurrentTime / 864000000000);
			Timer0.Display[2] = Math.floor(Timer0.CurrentTime % 864000000000 / 86400000000);
			Timer0.Display[3] = Math.floor(Timer0.CurrentTime % 86400000000 / 8640000000);
			Timer0.Display[4] = Math.floor(Timer0.CurrentTime % 8640000000 / 864000000);
			Timer0.Display[5] = Math.floor(Timer0.CurrentTime % 864000000 / 86400000);
			Timer0.Display[6] = Math.floor(Timer0.CurrentTime % 86400000 / 36000000);
			Timer0.Display[7] = Math.floor(Timer0.CurrentTime % 86400000 % 36000000 / 3600000);
			Timer0.Display[8] = Math.floor(Timer0.CurrentTime % 3600000 / 600000);
			Timer0.Display[9] = Math.floor(Timer0.CurrentTime % 600000 / 60000);
			Timer0.Display[10] = Math.floor(Timer0.CurrentTime % 60000 / 10000);
			Timer0.Display[11] = Timer0.CurrentTime % 10000 / 1000;
			if(System.Display.Anim.Speed == 0) {
				Timer0.Display[11] = Math.floor(Timer0.Display[11]);
			} else {
				if(Timer0.Display[11] > 9) {Timer0.Display[10] = Timer0.Display[10] + (Timer0.Display[11] - 9);} // Imitating the cockpit PFD number scrolling effect.
				if(Timer0.Display[10] > 5) {Timer0.Display[9] = Timer0.Display[9] + (Timer0.Display[10] - 5);}
				if(Timer0.Display[9] > 9) {Timer0.Display[8] = Timer0.Display[8] + (Timer0.Display[9] - 9);}
				if(Timer0.Display[8] > 5) {Timer0.Display[7] = Timer0.Display[7] + (Timer0.Display[8] - 5);}
				if(Timer0.Display[6] * 10 + Timer0.Display[7] > 23) {Timer0.Display[6] = Timer0.Display[6] + (Timer0.Display[7] - 3);} if(Timer0.Display[7] > 9) {Timer0.Display[6] = Timer0.Display[6] + (Timer0.Display[7] - 9);}
				if(Timer0.Display[6] > 2) {Timer0.Display[5] = Timer0.Display[5] + (Timer0.Display[6] - 2);}
				if(Timer0.Display[5] > 9) {Timer0.Display[4] = Timer0.Display[4] + (Timer0.Display[5] - 9);}
				if(Timer0.Display[4] > 9) {Timer0.Display[3] = Timer0.Display[3] + (Timer0.Display[4] - 9);}
				if(Timer0.Display[3] > 9) {Timer0.Display[2] = Timer0.Display[2] + (Timer0.Display[3] - 9);}
				if(Timer0.Display[2] > 9) {Timer0.Display[1] = Timer0.Display[1] + (Timer0.Display[2] - 9);}
			}
			ChangeTop("ScrollingNumber_Timer1", -60 * (9 - Timer0.Display[1]) + "px");
			ChangeTop("ScrollingNumber_Timer2", -60 * (11 - Timer0.Display[2]) + "px");
			ChangeTop("ScrollingNumber_Timer3", -60 * (11 - Timer0.Display[3]) + "px");
			ChangeTop("ScrollingNumber_Timer4", -60 * (11 - Timer0.Display[4]) + "px");
			ChangeTop("ScrollingNumber_Timer5", -60 * (11 - Timer0.Display[5]) + "px");
			ChangeTop("ScrollingNumber_Timer6", -60 * (4 - Timer0.Display[6]) + "px");
			ChangeTop("ScrollingNumber_Timer7", -60 * (11 - Timer0.Display[7]) + "px");
			ChangeTop("ScrollingNumber_Timer8", -60 * (7 - Timer0.Display[8]) + "px");
			ChangeTop("ScrollingNumber_Timer9", -60 * (11 - Timer0.Display[9]) + "px");
			ChangeTop("ScrollingNumber_Timer10", -60 * (7 - Timer0.Display[10]) + "px");
			ChangeTop("ScrollingNumber_Timer11", 20 - 40 * (11 - Timer0.Display[11]) + "px");
	}

// Cmds
	// Settings
		// User Data
		function SetUserDataImport() {
			if(ReadValue("Textbox_SettingsUserDataImport") != null) {
				if(ReadValue("Textbox_SettingsUserDataImport").startsWith("{\"System\"") == true) {
					ChangeCursorOverall("wait");
					Elements = JSON.parse(ReadValue("Textbox_SettingsUserDataImport"));
					Object.keys(Elements).forEach(function(Looper) {
						localStorage.setItem(Looper, JSON.stringify(Elements[Looper]));
					});
					window.location.reload();
				} else {
					PopupDialogAppear("System_JSONStringFormatMismatch",
						"Termination",
						"JSON 字符串格式不匹配。请检查您粘贴的文本的来源。",
						"", "", "确定");
					RefreshSystem();
				}
			}
		}
		function SetUserDataExport() {
			navigator.clipboard.writeText("{" +
				"\"System\":" + JSON.stringify(System) +
				"}");
			PopupDialogAppear("System_UserDataExported",
				"Completion",
				"已将用户数据以 JSON 字符串的形式导出至剪贴板。若要分享，请注意其中是否包含个人信息。",
				"", "", "确定");
		}
		function SetUserDataClear() {
			PopupDialogAppear("System_ConfirmClearUserData",
				"Caution",
				"您确认要清空用户数据？",
				"", "清空", "取消");
		}
	
	// Popup Dialog
	function PopupDialogAnswer(Selector) {
		switch(Interaction.PopupDialogEvent) {
			case "System_LanguageUnsupported":
			case "System_JSONStringFormatMismatch":
			case "System_UserDataExported":
				switch(Selector) {
					case 3:
						break;
					default:
						alert("Error: The value of Selector in function PopupDialogAnswer is out of expectation.");
						break;
				}
				break;
			case "System_ConfirmClearUserData":
				switch(Selector) {
					case 2:
						ChangeCursorOverall("wait");
						localStorage.clear();
						window.location.reload();
						break;
					case 3:
						break;
					default:
						alert("Error: The value of Selector in function PopupDialogAnswer is out of expectation.");
						break;
				}
				break;
			case "":
				break;
			default:
				alert("Error: The value of Interaction.PopupDialogEvent in function PopupDialogAnswer is out of expectation.");
				break;
		}
		PopupDialogDisappear();
	}

// Automations
Automation.ClockTimer = setInterval(ClockTimer, 20);
