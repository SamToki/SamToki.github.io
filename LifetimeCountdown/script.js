// For SamToki.github.io/LifetimeCountdown
// Released under GNU GPL v3 open source license.
// (C) 2023 SAM TOKI STUDIO

// Initialization
	// Declare Variables
	"use strict";
		// Unsaved
		const CurrentVersion = 2.00;
		var Timer = {
			Stats: {
				ClockTime: 0, EndTime: 2840111999000, // Timestamp 2840111999000 stands for 2059/12/31 23:59:59 (UTC+8).
				CurrentTime: 0, Display: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}
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
			case "en-US":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang='en-US'>Sorry, this page currently does not support English (US).</span>",
					"", "", "<span lang='en-US'>OK</span>");
				break;
			case "ja-JP":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang='ja-JP'>すみません。このページは日本語にまだサポートしていません。</span>",
					"", "", "<span lang='ja-JP'>OK</span>");
				break;
			case "zh-CN":
				/* ChangeCursorOverall("wait");
				window.location.replace("index.html"); */
				break;
			case "zh-TW":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang='zh-TW'>抱歉，本頁面暫不支援繁體中文。</span>",
					"", "", "<span lang='zh-TW'>確定</span>");
				break;
			default:
				AlertError("The value of System.I18n.Language \"" + System.I18n.Language + "\" in function Load is out of expectation.");
				break;
		}
		if(typeof(System.Version.LifetimeCountdown) != "undefined") {
			if(Math.floor(CurrentVersion) - Math.floor(System.Version.LifetimeCountdown) >= 1) {
				ShowDialog("System_MajorUpdateDetected",
					"Info",
					"检测到大版本更新。若您继续使用旧版本的用户数据，则有可能发生兼容性问题。敬请留意。",
					"", "", "确定");
				System.Version.LifetimeCountdown = CurrentVersion;
			}
		} else {
			System.Version.LifetimeCountdown = CurrentVersion;
		}
		RefreshSystem();
		setTimeout(HideToast, 0);
	}

// Refresh
	// System
	function RefreshSystem() {
		// Settings
			// Display
			ChangeValue("Combobox_SettingsTheme", System.Display.Theme);
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
					AlertError("The value of System.Display.Theme \"" + System.Display.Theme + "\" in function RefreshSystem is out of expectation.");
					break;
			}
			ChangeValue("Combobox_SettingsCursor", System.Display.Cursor);
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
					AlertError("The value of System.Display.Cursor \"" + System.Display.Cursor + "\" in function RefreshSystem is out of expectation.");
					break;
			}
			ChangeChecked("Checkbox_SettingsBlurBackground", System.Display.BlurBackground);
			if(System.Display.BlurBackground == true) {
				document.getElementById("Ctnr_BackgroundImage").style.filter = "blur(20px)";
			} else {
				document.getElementById("Ctnr_BackgroundImage").style.filter = "";
			}
			ChangeChecked("Checkbox_SettingsShowTopbar", System.Display.ShowTopbar);
			if(System.Display.ShowTopbar == true && document.fullscreenElement == null) {
				Show("Topbar");
			} else {
				Hide("Topbar");
			}
			ChangeValue("Combobox_SettingsAnim", System.Display.Anim);
			ChangeAnimOverall(System.Display.Anim);
			
			// Dev
			ChangeChecked("Checkbox_SettingsShowDebugOutlines", System.Dev.ShowDebugOutlines);
			ChangeShowDebugOutlines(System.Dev.ShowDebugOutlines);
			ChangeChecked("Checkbox_SettingsUseOldTypeface", System.Dev.UseOldTypeface);
			if(System.Dev.UseOldTypeface == true) {
				ChangeLanguage("Html", "ja-JP");
			} else {
				ChangeLanguage("Html", "zh-CN");
			}
			ChangeValue("Textbox_SettingsFont", System.Dev.Font);
			ChangeFont("Html", System.Dev.Font);

			// User Data
			ChangeValue("Textbox_SettingsUserDataImport", "");

		// Save User Data
		localStorage.setItem("System", JSON.stringify(System));
	}

	// Timer
	function ClockTimer() {
		// Core
			// Clock Time
			Timer.Stats.ClockTime = Date.now(); // Here do not take the time zone into account.

			// Update Current Time
			Timer.Stats.CurrentTime = Timer.Stats.EndTime - Timer.Stats.ClockTime;
			if(Timer.Stats.ClockTime >= Timer.Stats.EndTime) {
				Timer.Stats.CurrentTime = 0;
			}

		// Dashboard
			// Scrolling Numbers
			Timer.Stats.Display[1] = Math.floor(Timer.Stats.CurrentTime / 864000000000);
			Timer.Stats.Display[2] = Math.floor(Timer.Stats.CurrentTime % 864000000000 / 86400000000);
			Timer.Stats.Display[3] = Math.floor(Timer.Stats.CurrentTime % 86400000000 / 8640000000);
			Timer.Stats.Display[4] = Math.floor(Timer.Stats.CurrentTime % 8640000000 / 864000000);
			Timer.Stats.Display[5] = Math.floor(Timer.Stats.CurrentTime % 864000000 / 86400000);
			Timer.Stats.Display[6] = Math.floor(Timer.Stats.CurrentTime % 86400000 / 36000000);
			Timer.Stats.Display[7] = Math.floor(Timer.Stats.CurrentTime % 86400000 % 36000000 / 3600000);
			Timer.Stats.Display[8] = Math.floor(Timer.Stats.CurrentTime % 3600000 / 600000);
			Timer.Stats.Display[9] = Math.floor(Timer.Stats.CurrentTime % 600000 / 60000);
			Timer.Stats.Display[10] = Math.floor(Timer.Stats.CurrentTime % 60000 / 10000);
			Timer.Stats.Display[11] = Timer.Stats.CurrentTime % 10000 / 1000;
			if(System.Display.Anim == 0) {
				Timer.Stats.Display[11] = Math.floor(Timer.Stats.Display[11]);
			} else {
				if(Timer.Stats.Display[11] > 9) {Timer.Stats.Display[10] += (Timer.Stats.Display[11] - 9);} // Imitating the cockpit PFD number scrolling effect.
				if(Timer.Stats.Display[10] > 5) {Timer.Stats.Display[9] += (Timer.Stats.Display[10] - 5);}
				if(Timer.Stats.Display[9] > 9) {Timer.Stats.Display[8] += (Timer.Stats.Display[9] - 9);}
				if(Timer.Stats.Display[8] > 5) {Timer.Stats.Display[7] += (Timer.Stats.Display[8] - 5);}
				if(Timer.Stats.Display[6] * 10 + Timer.Stats.Display[7] > 23) {Timer.Stats.Display[6] += (Timer.Stats.Display[7] - 3);} if(Timer.Stats.Display[7] > 9) {Timer.Stats.Display[6] += (Timer.Stats.Display[7] - 9);}
				if(Timer.Stats.Display[6] > 2) {Timer.Stats.Display[5] += (Timer.Stats.Display[6] - 2);}
				if(Timer.Stats.Display[5] > 9) {Timer.Stats.Display[4] += (Timer.Stats.Display[5] - 9);}
				if(Timer.Stats.Display[4] > 9) {Timer.Stats.Display[3] += (Timer.Stats.Display[4] - 9);}
				if(Timer.Stats.Display[3] > 9) {Timer.Stats.Display[2] += (Timer.Stats.Display[3] - 9);}
				if(Timer.Stats.Display[2] > 9) {Timer.Stats.Display[1] += (Timer.Stats.Display[2] - 9);}
			}
			ChangeTop("ScrollingNumber_Timer1", -60 * (9 - Timer.Stats.Display[1]) + "px");
			ChangeTop("ScrollingNumber_Timer2", -60 * (11 - Timer.Stats.Display[2]) + "px");
			ChangeTop("ScrollingNumber_Timer3", -60 * (11 - Timer.Stats.Display[3]) + "px");
			ChangeTop("ScrollingNumber_Timer4", -60 * (11 - Timer.Stats.Display[4]) + "px");
			ChangeTop("ScrollingNumber_Timer5", -60 * (11 - Timer.Stats.Display[5]) + "px");
			ChangeTop("ScrollingNumber_Timer6", -60 * (4 - Timer.Stats.Display[6]) + "px");
			ChangeTop("ScrollingNumber_Timer7", -60 * (11 - Timer.Stats.Display[7]) + "px");
			ChangeTop("ScrollingNumber_Timer8", -60 * (7 - Timer.Stats.Display[8]) + "px");
			ChangeTop("ScrollingNumber_Timer9", -60 * (11 - Timer.Stats.Display[9]) + "px");
			ChangeTop("ScrollingNumber_Timer10", -60 * (7 - Timer.Stats.Display[10]) + "px");
			ChangeTop("ScrollingNumber_Timer11", 20 - 40 * (11 - Timer.Stats.Display[11]) + "px");
	}

// Cmds
	// Settings
		// User Data
		function ImportUserData() {
			if(ReadValue("Textbox_SettingsUserDataImport") != null) {
				if(ReadValue("Textbox_SettingsUserDataImport").startsWith("{\"System\"") == true) {
					ChangeCursorOverall("wait");
					Elements = JSON.parse(ReadValue("Textbox_SettingsUserDataImport"));
					Object.keys(Elements).forEach(function(Looper) {
						localStorage.setItem(Looper, JSON.stringify(Elements[Looper]));
					});
					window.location.reload();
				} else {
					ShowDialog("System_JSONStringFormatMismatch",
						"Error",
						"JSON 字符串格式不匹配。请检查您粘贴的文本。",
						"", "", "确定");
					RefreshSystem();
				}
			}
		}
		function ExportUserData() {
			navigator.clipboard.writeText("{" +
				"\"System\":" + JSON.stringify(System) +
				"}");
			ShowDialog("System_UserDataExported",
				"Info",
				"已将用户数据导出至剪贴板。若要分享，请注意其中是否包含个人信息。",
				"", "", "确定");
		}
		function ConfirmClearUserData() {
			ShowDialog("System_ConfirmClearUserData",
				"Caution",
				"您确认要清空用户数据？",
				"", "清空", "取消");
		}
	
	// Dialog
	function AnswerDialog(Selector) {
		switch(Interaction.DialogEvent) {
			case "System_LanguageUnsupported":
			case "System_MajorUpdateDetected":
			case "System_JSONStringFormatMismatch":
			case "System_UserDataExported":
				switch(Selector) {
					case 3:
						break;
					default:
						AlertError("The value of Selector \"" + Selector + "\" in function AnswerDialog is out of expectation.");
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
						AlertError("The value of Selector \"" + Selector + "\" in function AnswerDialog is out of expectation.");
						break;
				}
				break;
			case "System_Error":
				switch(Selector) {
					case 2:
						window.location.replace("#Item_SettingsUserData");
						break;
					case 3:
						break;
					default:
						AlertError("The value of Selector \"" + Selector + "\" in function AnswerDialog is out of expectation.");
						break;
				}
				break;
			default:
				AlertError("The value of Interaction.DialogEvent \"" + Interaction.DialogEvent + "\" in function AnswerDialog is out of expectation.");
				break;
		}
		HideDialog();
	}

// Automations
Automation.ClockTimer = setInterval(ClockTimer, 20);

// Error Handling
function AlertError(Message) {
	console.log("● 错误\n" +
		Message);
	ShowDialog("System_Error",
		"Error",
		"抱歉，发生了程序错误。您可在浏览器控制台查看错误信息，或尝试清空用户数据以解决问题。是否前往用户数据？",
		"", "前往", "取消");
}
