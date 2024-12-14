// For SamToki.github.io/LifetimeCountdown
// Released under GNU GPL v3 open source license.
// © 2023 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CurrentVersion = 2.06;
		var Timer = {
			Stats: {
				ClockTime: 0, EndTime: 2840111999000, // Timestamp 2840111999000 stands for 2059/12/31 23:59:59 (UTC+8).
				CurrentTime: 0, Display: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}
		};
		Automation.ClockTimer = null;

	// Load
	window.onload = Load();
	function Load() {
		// User data
		if(localStorage.System != undefined) {
			System = JSON.parse(localStorage.getItem("System"));
		}
		switch(System.I18n.Language) {
			case "Auto":
				/* navigator.language ... */
				break;
			case "en-US":
				/* ChangeCursorOverall("wait");
				window.location.replace("index_" + System.I18n.Language + ".html"); */
				ShowDialog("System_LanguageUnsupported",
					"Caution",
					"<span lang=\"en-US\">Sorry, this webpage currently does not support English (US).</span>",
					"", "", "", "<span lang=\"en-US\">OK</span>");
				break;
			case "ja-JP":
				ShowDialog("System_LanguageUnsupported",
					"Caution",
					"<span lang=\"ja-JP\">すみません。このページは日本語にまだサポートしていません。</span>",
					"", "", "", "<span lang=\"ja-JP\">OK</span>");
				break;
			case "zh-CN":
				break;
			case "zh-TW":
				ShowDialog("System_LanguageUnsupported",
					"Caution",
					"<span lang=\"zh-TW\">抱歉，本網頁暫不支援繁體中文。</span>",
					"", "", "", "<span lang=\"zh-TW\">確定</span>");
				break;
			default:
				AlertSystemError("The value of System.I18n.Language \"" + System.I18n.Language + "\" in function Load is invalid.");
				break;
		}
		if(System.Version.LifetimeCountdown != undefined) {
			if(Math.floor(CurrentVersion) - Math.floor(System.Version.LifetimeCountdown) >= 1) {
				ShowDialog("System_MajorUpdateDetected",
					"Info",
					"检测到大版本更新。若您继续使用旧版本的用户数据，则有可能发生兼容性问题。敬请留意。",
					"", "", "", "确定");
				System.Version.LifetimeCountdown = CurrentVersion;
			}
		} else {
			System.Version.LifetimeCountdown = CurrentVersion;
		}

		// Refresh
		RefreshSystem();

		// Ready
		setTimeout(HideToast, 0);
	}

// Refresh
	// Webpage
	function RefreshWebpage() {
		ShowDialog("System_RefreshingWebpage",
			"Info",
			"正在刷新网页...",
			"", "", "", "确定");
		ChangeCursorOverall("wait");
		window.location.reload();
	}

	// System
	function RefreshSystem() {
		// Topbar
		if(IsMobileLayout() == false) {
			HideHorizontally("Button_Nav");
			ChangeInert("DropctrlGroup_Nav", false);
		} else {
			Show("Button_Nav");
			ChangeInert("DropctrlGroup_Nav", true);
		}

		// Settings
			// Display
			if(window.matchMedia("(prefers-contrast: more)").matches == false) {
				ChangeDisabled("Combobox_SettingsTheme", false);
			} else {
				System.Display.Theme = "HighContrast";
				ChangeDisabled("Combobox_SettingsTheme", true);
			}
			ChangeValue("Combobox_SettingsTheme", System.Display.Theme);
			switch(System.Display.Theme) {
				case "Auto":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "(prefers-color-scheme: dark)");
					/* ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "(prefers-color-scheme: dark)"); */
					break;
				case "Light":
					ChangeLink("ThemeVariant_Common", "");
					ChangeMediaCondition("ThemeVariant_Common", "");
					/* ChangeLink("ThemeVariant_Style", "");
					ChangeMediaCondition("ThemeVariant_Style", ""); */
					break;
				case "Dark":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					/* ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", ""); */
					break;
				case "Genshin":
					ChangeLink("ThemeVariant_Common", "../styles/common_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					/* ChangeLink("ThemeVariant_Style", "styles/style_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Style", ""); */
					break;
				case "HighContrast":
					ChangeLink("ThemeVariant_Common", "../styles/common_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					/* ChangeLink("ThemeVariant_Style", "styles/style_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Style", ""); */
					break;
				default:
					AlertSystemError("The value of System.Display.Theme \"" + System.Display.Theme + "\" in function RefreshSystem is invalid.");
					break;
			}
			ChangeValue("Combobox_SettingsCursor", System.Display.Cursor);
			switch(System.Display.Cursor) {
				case "Default":
					ChangeCursorOverall("");
					break;
				case "BTRAhoge":
				case "Genshin":
				case "GenshinFurina":
				case "GenshinNahida":
					ChangeCursorOverall("url(../cursors/" + System.Display.Cursor + ".cur), auto");
					break;
				default:
					AlertSystemError("The value of System.Display.Cursor \"" + System.Display.Cursor + "\" in function RefreshSystem is invalid.");
					break;
			}
			ChangeChecked("Checkbox_SettingsBlurBgImage", System.Display.BlurBgImage);
			if(System.Display.BlurBgImage == true) {
				AddClass("BgImage", "Blur");
			} else {
				RemoveClass("BgImage", "Blur");
			}
			if(window.matchMedia("(prefers-reduced-motion: reduce)").matches == false) {
				ChangeDisabled("Combobox_SettingsAnim", false);
			} else {
				System.Display.Anim = 0;
				ChangeDisabled("Combobox_SettingsAnim", true);
			}
			ChangeValue("Combobox_SettingsAnim", System.Display.Anim);
			ChangeAnimOverall(System.Display.Anim);
			
			// Dev
			ChangeChecked("Checkbox_SettingsTryToOptimizePerformance", System.Dev.TryToOptimizePerformance);
			if(System.Dev.TryToOptimizePerformance == true) {
				AddClass("Html", "PerformanceOptimization");
			} else {
				RemoveClass("Html", "PerformanceOptimization");
			}
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

			// User data
			ChangeValue("Textbox_SettingsUserDataImport", "");

		// Save user data
		localStorage.setItem("System", JSON.stringify(System));
	}

	// Timer
	function ClockTimer() {
		// Core
			// Clock time
			Timer.Stats.ClockTime = Date.now();

			// Update current time
			Timer.Stats.CurrentTime = Timer.Stats.EndTime - Timer.Stats.ClockTime;
			if(Timer.Stats.ClockTime >= Timer.Stats.EndTime) {
				Timer.Stats.CurrentTime = 0;
			}

		// Dashboard
			// Current time
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
			if(System.Display.Anim > 0) {
				if(Timer.Stats.Display[11] > 9) {Timer.Stats.Display[10] += (Timer.Stats.Display[11] - 9);} // Imitating the cockpit PFD rolling digits.
				if(Timer.Stats.Display[10] > 5) {Timer.Stats.Display[9] += (Timer.Stats.Display[10] - 5);}
				if(Timer.Stats.Display[9] > 9) {Timer.Stats.Display[8] += (Timer.Stats.Display[9] - 9);}
				if(Timer.Stats.Display[8] > 5) {Timer.Stats.Display[7] += (Timer.Stats.Display[8] - 5);}
				if(Timer.Stats.Display[6] * 10 + Timer.Stats.Display[7] > 23) {Timer.Stats.Display[6] += (Timer.Stats.Display[7] - 3);} if(Timer.Stats.Display[7] > 9) {Timer.Stats.Display[6] += (Timer.Stats.Display[7] - 9);}
				if(Timer.Stats.Display[6] > 2) {Timer.Stats.Display[5] += (Timer.Stats.Display[6] - 2);}
				if(Timer.Stats.Display[5] > 9) {Timer.Stats.Display[4] += (Timer.Stats.Display[5] - 9);}
				if(Timer.Stats.Display[4] > 9) {Timer.Stats.Display[3] += (Timer.Stats.Display[4] - 9);}
				if(Timer.Stats.Display[3] > 9) {Timer.Stats.Display[2] += (Timer.Stats.Display[3] - 9);}
				if(Timer.Stats.Display[2] > 9) {Timer.Stats.Display[1] += (Timer.Stats.Display[2] - 9);}
			} else {
				Timer.Stats.Display[11] = Math.floor(Timer.Stats.Display[11]);
			}
			ChangeTop("RollingDigit_HiddenPage1", -60 * (9 - Timer.Stats.Display[1]) + "px");
			ChangeTop("RollingDigit_HiddenPage2", -60 * (10 - Timer.Stats.Display[2]) + "px");
			ChangeTop("RollingDigit_HiddenPage3", -60 * (10 - Timer.Stats.Display[3]) + "px");
			ChangeTop("RollingDigit_HiddenPage4", -60 * (10 - Timer.Stats.Display[4]) + "px");
			ChangeTop("RollingDigit_HiddenPage5", -60 * (10 - Timer.Stats.Display[5]) + "px");
			ChangeTop("RollingDigit_HiddenPage6", -60 * (3 - Timer.Stats.Display[6]) + "px");
			ChangeTop("RollingDigit_HiddenPage7", -60 * (10 - Timer.Stats.Display[7]) + "px");
			ChangeTop("RollingDigit_HiddenPage8", -60 * (6 - Timer.Stats.Display[8]) + "px");
			ChangeTop("RollingDigit_HiddenPage9", -60 * (10 - Timer.Stats.Display[9]) + "px");
			ChangeTop("RollingDigit_HiddenPage10", -60 * (6 - Timer.Stats.Display[10]) + "px");
			switch(true) {
				case Timer.Stats.CurrentTime < 1000:
					ChangeTop("RollingDigit_HiddenPage11", 20 - 40 * (18 - Timer.Stats.Display[11]) + "px");
					break;
				case Timer.Stats.CurrentTime > 8639999998000:
					ChangeTop("RollingDigit_HiddenPage11", 20 - 40 * (9 - Timer.Stats.Display[11]) + "px");
					break;
				default:
					ChangeTop("RollingDigit_HiddenPage11", 20 - 40 * (14 - Timer.Stats.Display[11]) + "px");
					break;
			}
	}

// Cmds
	// Settings
		// User data
		function ImportUserData() {
			if(ReadValue("Textbox_SettingsUserDataImport") != "") {
				if(ReadValue("Textbox_SettingsUserDataImport").startsWith("{\"System\":{\"Display\":{\"Theme\":") == true) {
					let Objects = JSON.parse(ReadValue("Textbox_SettingsUserDataImport"));
					Object.keys(Objects).forEach(function(ObjectName) {
						localStorage.setItem(ObjectName, JSON.stringify(Objects[ObjectName]));
					});
					RefreshWebpage();
				} else {
					ShowDialog("System_JSONStringInvalid",
						"Error",
						"您键入的 JSON 字符串不合法。",
						"", "", "", "确定");
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
				"已导出本网页的用户数据至剪贴板。",
				"", "", "", "确定");
		}
		function ConfirmClearUserData() {
			ShowDialog("System_ConfirmClearUserData",
				"Caution",
				"您确认要清空用户数据？",
				"", "", "清空", "取消");
		}

	// Dialog
	function AnswerDialog(Selector) {
		let DialogEvent = Interaction.Dialog[Interaction.Dialog.length - 1].Event;
		ShowDialog("Previous");
		switch(DialogEvent) {
			case "System_LanguageUnsupported":
			case "System_MajorUpdateDetected":
			case "System_RefreshingWebpage":
			case "System_JSONStringInvalid":
			case "System_UserDataExported":
				switch(Selector) {
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "System_ConfirmClearUserData":
				switch(Selector) {
					case 2:
						localStorage.clear();
						RefreshWebpage();
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			case "System_Error":
				switch(Selector) {
					case 2:
						ScrollIntoView("Item_SettingsUserData");
						ShowIAmHere("Item_SettingsUserData");
						break;
					case 3:
						break;
					default:
						AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						break;
				}
				break;
			default:
				AlertSystemError("The value of DialogEvent \"" + DialogEvent + "\" in function AnswerDialog is invalid.");
				break;
		}
	}

// Automations
Automation.ClockTimer = setInterval(ClockTimer, 20);

// Error handling
function AlertSystemError(Message) {
	console.error("● 系统错误\n" +
		Message);
	ShowDialog("System_Error",
		"Error",
		"抱歉，发生了系统错误。您可尝试清空用户数据来修复错误，或向我提供反馈。<br />" +
		"<br />" +
		"错误信息：" + Message,
		"", "", "了解更多", "关闭");
}
