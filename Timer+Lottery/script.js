// For SamToki.github.io/Timer+Lottery
// Released under GNU GPL v3 open source license.
// (C) 2023 SAM TOKI STUDIO

// Initialization
	// Declare Variables
	"use strict";
		// Unsaved
		var Timer0 = {
			Stats: {
				Display: [0, 0, 0, 5, 0, 0, 0]
			}
		},
		Lottery0 = {
			Status: {
				Progress: 0
			}
		};
		Automation.ClockTimer = 0; Automation.BlinkTimeSeparator = 0; Automation.RollLottery = 0;
		
		// Saved
		var Timer = {
			Options: {
				Duration: 300000,
				UseCountdown: true
			},
			Preset: [0, 300000, 900000, 3600000],
			Status: {
				IsRunning: false, IsPaused: false
			},
			Stats: {
				ClockTime: 0, StartTime: 0, EndTime: 0,
				CurrentTime: 300000,
				Lap: {
					Sequence: 1, PreviousCurrentTime: 300000
				}
			}
		},
		Lottery = {
			Options: {
				Mode: "Normal",
				Range: {
					Min: 1, Max: 50
				},
				PreventDuplication: true
			},
			Stats: {
				Number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}
		};

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
		RefreshSystem();
		if(typeof(localStorage.TimerPlusLottery_Timer) != "undefined") {
			Timer = JSON.parse(localStorage.getItem("TimerPlusLottery_Timer"));
		}
		RefreshTimer();
		if(typeof(localStorage.TimerPlusLottery_Lottery) != "undefined") {
			Lottery = JSON.parse(localStorage.getItem("TimerPlusLottery_Lottery"));
		}
		RefreshLottery();
		setTimeout(HideToast, 0);
	}

	// Pause Before Quitting
	window.onbeforeunload = Quit();
	function Quit() {
		if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == false) {
			Timer.Status.IsPaused = true;
			RefreshTimer();
		}
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
					document.getElementById("ThemeVariant_Style").href = "style-Dark.css";
					document.getElementById("ThemeVariant_Style").media = "(prefers-color-scheme: dark)";
					break;
				case "Default":
					document.getElementById("ThemeVariant_Common").href = "";
					document.getElementById("ThemeVariant_Common").media = "";
					document.getElementById("ThemeVariant_Style").href = "";
					document.getElementById("ThemeVariant_Style").media = "";
					break;
				case "Dark":
					document.getElementById("ThemeVariant_Common").href = "../common-Dark.css";
					document.getElementById("ThemeVariant_Common").media = "";
					document.getElementById("ThemeVariant_Style").href = "style-Dark.css";
					document.getElementById("ThemeVariant_Style").media = "";
					break;
				case "Genshin":
					document.getElementById("ThemeVariant_Common").href = "../common-Genshin.css";
					document.getElementById("ThemeVariant_Common").media = "";
					document.getElementById("ThemeVariant_Style").href = "style-Genshin.css";
					document.getElementById("ThemeVariant_Style").media = "";
					break;
				case "HighContrast":
					document.getElementById("ThemeVariant_Common").href = "../common-HighContrast.css";
					document.getElementById("ThemeVariant_Common").media = "";
					document.getElementById("ThemeVariant_Style").href = "style-HighContrast.css";
					document.getElementById("ThemeVariant_Style").media = "";
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

			// Audio
			ChangeChecked("Checkbox_SettingsPlayAudio", System.Audio.PlayAudio);
			if(System.Audio.PlayAudio == false) {
				StopAllAudio();
			}

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
		// Change Self Update Freq
		clearInterval(Automation.ClockTimer);
		if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == false) {
			Automation.ClockTimer = setInterval(ClockTimer, 20);
		} else {
			Automation.ClockTimer = setInterval(ClockTimer, 500);
		}

		// Core
			// Update Current Time First
			if(Timer.Options.UseCountdown == true) {
				Timer.Stats.CurrentTime = Timer.Stats.EndTime - Timer.Stats.ClockTime;
			} else {
				Timer.Stats.CurrentTime = Timer.Options.Duration - (Timer.Stats.EndTime - Timer.Stats.ClockTime);
			}

			// Clock Time & Start Time & End Time
			Timer.Stats.ClockTime = Date.now() - new Date().getTimezoneOffset() * 60000;
			if(Timer.Status.IsRunning == false && Timer.Status.IsPaused == false) {
				Timer.Stats.StartTime = Timer.Stats.ClockTime;
				Timer.Stats.EndTime = Timer.Stats.ClockTime + Timer.Options.Duration;
			}
			if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == true) {
				if(Timer.Options.UseCountdown == true) {
					Timer.Stats.EndTime = Timer.Stats.ClockTime + Timer.Stats.CurrentTime;
				} else {
					Timer.Stats.EndTime = Timer.Stats.ClockTime + (Timer.Options.Duration - Timer.Stats.CurrentTime);
				}
			}

			// Update Current Time Again
			if(Timer.Options.UseCountdown == true) {
				Timer.Stats.CurrentTime = Timer.Stats.EndTime - Timer.Stats.ClockTime;
			} else {
				Timer.Stats.CurrentTime = Timer.Options.Duration - (Timer.Stats.EndTime - Timer.Stats.ClockTime);
			}

		// Dashboard
			// Start Time & End Time
			ChangeText("Label_TimerStartTime", Math.floor(Timer.Stats.StartTime % 86400000 / 3600000).toString().padStart(2, "0") + ":" + Math.floor(Timer.Stats.StartTime % 3600000 / 60000).toString().padStart(2, "0") + ":" + Math.floor(Timer.Stats.StartTime % 60000 / 1000).toString().padStart(2, "0"));
			ChangeText("Label_TimerEndTime", Math.floor(Timer.Stats.EndTime % 86400000 / 3600000).toString().padStart(2, "0") + ":" + Math.floor(Timer.Stats.EndTime % 3600000 / 60000).toString().padStart(2, "0") + ":" + Math.floor(Timer.Stats.EndTime % 60000 / 1000).toString().padStart(2, "0"));

			// Progring & Needle
			if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == false && System.Display.Anim != 0) {
				ChangeAnim("ProgringFg_Timer", "100ms");
				ChangeAnim("Needle_Timer", "100ms");
			} else {
				ChangeAnim("ProgringFg_Timer", "");
				ChangeAnim("Needle_Timer", "");
			}
			ChangeProgring("ProgringFg_Timer", 917.35, Timer.Stats.CurrentTime / Timer.Options.Duration * 100);
			ChangeRotate("Needle_Timer", Timer.Stats.CurrentTime / 60000 * 360);

			// Scrolling Numbers
			Timer0.Stats.Display[1] = Math.floor(Timer.Stats.CurrentTime / 6000000);
			Timer0.Stats.Display[2] = Math.floor(Timer.Stats.CurrentTime % 6000000 / 600000);
			Timer0.Stats.Display[3] = Math.floor(Timer.Stats.CurrentTime % 600000 / 60000);
			Timer0.Stats.Display[4] = Math.floor(Timer.Stats.CurrentTime % 60000 / 10000);
			Timer0.Stats.Display[5] = Timer.Stats.CurrentTime % 10000 / 1000;
			Timer0.Stats.Display[6] = Math.floor(Timer.Stats.CurrentTime % 1000 / 10);
			if(System.Display.Anim == 0) {
				Timer0.Stats.Display[5] = Math.floor(Timer0.Stats.Display[5]);
			} else {
				if(Timer0.Stats.Display[5] > 9) {Timer0.Stats.Display[4] += (Timer0.Stats.Display[5] - 9);} // Imitating the cockpit PFD number scrolling effect.
				if(Timer0.Stats.Display[4] > 5) {Timer0.Stats.Display[3] += (Timer0.Stats.Display[4] - 5);}
				if(Timer0.Stats.Display[3] > 9) {Timer0.Stats.Display[2] += (Timer0.Stats.Display[3] - 9);}
				if(Timer0.Stats.Display[2] > 9) {Timer0.Stats.Display[1] += (Timer0.Stats.Display[2] - 9);}
			}
			ChangeTop("ScrollingNumber_Timer1", -60 * (9 - Timer0.Stats.Display[1]) + "px");
			ChangeTop("ScrollingNumber_Timer2", -60 * (11 - Timer0.Stats.Display[2]) + "px");
			ChangeTop("ScrollingNumber_Timer3", -60 * (11 - Timer0.Stats.Display[3]) + "px");
			ChangeTop("ScrollingNumber_Timer4", -60 * (7 - Timer0.Stats.Display[4]) + "px");
			ChangeTop("ScrollingNumber_Timer5", 20 - 40 * (11 - Timer0.Stats.Display[5]) + "px");
			ChangeText("Label_TimerMillisec", "." + Timer0.Stats.Display[6].toString().padStart(2, "0"));
		
		// Time Up
		if(Timer.Stats.ClockTime >= Timer.Stats.EndTime) {
			ShowDialog("Timer_TimeUp",
				"Info",
				"计时完成！<br />" +
				"从 " + ReadText("Label_TimerStartTime") + " 至 " + ReadText("Label_TimerEndTime") + "。<br />" +
				"设定时长" + Math.floor(Timer.Options.Duration / 60000) + "分" + Math.floor(Timer.Options.Duration % 60000 / 1000).toString().padStart(2, "0") + "秒，实际时长" + Math.floor((Timer.Stats.EndTime - Timer.Stats.StartTime) / 60000) + "分" + Math.floor((Timer.Stats.EndTime - Timer.Stats.StartTime) % 60000 / 1000).toString().padStart(2, "0") + "秒。",
				"", "", "确定");
			PlayAudio("Audio_Sound");
			ResetTimer();
		}
	}
	function RefreshTimer() {
		// Call
		ClockTimer();

		// Ctrls
		if(Timer.Status.IsRunning == false) {
			ChangeText("Cmdbtn_TimerStart", "开始");
			ChangeDisabled("Textbox_TimerMin", false); ChangeDisabled("Textbox_TimerSec", false);
		} else {
			if(Timer.Status.IsPaused == false) {
				ChangeText("Cmdbtn_TimerStart", "暂停");
			} else {
				ChangeText("Cmdbtn_TimerStart", "继续");
			}
			ChangeDisabled("Textbox_TimerMin", true); ChangeDisabled("Textbox_TimerSec", true);
		}

		// Options
		ChangeValue("Textbox_TimerMin", Math.floor(Timer.Options.Duration / 60000));
		ChangeValue("Textbox_TimerSec", Math.floor(Timer.Options.Duration % 60000 / 1000));
		ChangeChecked("Checkbox_TimerCountdown", Timer.Options.UseCountdown);

		// Presets
		ChangeText("Label_TimerPreset1", Math.floor(Timer.Preset[1] / 60000) + ":" + Math.floor(Timer.Preset[1] % 60000 / 1000).toString().padStart(2, "0"));
		ChangeText("Label_TimerPreset2", Math.floor(Timer.Preset[2] / 60000) + ":" + Math.floor(Timer.Preset[2] % 60000 / 1000).toString().padStart(2, "0"));
		ChangeText("Label_TimerPreset3", Math.floor(Timer.Preset[3] / 60000) + ":" + Math.floor(Timer.Preset[3] % 60000 / 1000).toString().padStart(2, "0"));

		// Save User Data
		localStorage.setItem("TimerPlusLottery_Timer", JSON.stringify(Timer));
	}
	function BlinkTimeSeparator() {
		Elements = document.getElementsByClassName("TimeSeparator");
		if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == false && Elements[0].classList.contains("Transparent") == false) {
			AddClassByClass("TimeSeparator", "Transparent");
		} else {
			RemoveClassByClass("TimeSeparator", "Transparent");
		}
	}

	// Lottery
	function RefreshLottery() {
		// Dashboard
		for(Looper = 1; Looper <= 10; Looper++) {
			ChangeText("Label_LotteryNumber" + Looper, Lottery.Stats.Number[Looper]);
		}

		// Ctrls
		if(Lottery0.Status.Progress != 0) {
			ChangeDisabled("Cmdbtn_LotteryRoll", true);
		} else {
			ChangeDisabled("Cmdbtn_LotteryRoll", false);
		}

		// Options
		ChangeValue("Combobox_LotteryMode", Lottery.Options.Mode);
		switch(Lottery.Options.Mode) {
			case "Normal":
				ChangeDisabled("Textbox_LotteryRangeMin", false);
				ChangeDisabled("Textbox_LotteryRangeMax", false);
				break;
			case "Dice":
				ChangeDisabled("Textbox_LotteryRangeMin", true);
				ChangeDisabled("Textbox_LotteryRangeMax", true);
				Lottery.Options.Range.Min = 1;
				Lottery.Options.Range.Max = 6;
				break;
			case "Poker":
				ChangeDisabled("Textbox_LotteryRangeMin", true);
				ChangeDisabled("Textbox_LotteryRangeMax", true);
				Lottery.Options.Range.Min = 1;
				Lottery.Options.Range.Max = 13;
				break;
			default:
				AlertError("The value of Lottery.Options.Mode \"" + Lottery.Options.Mode + "\" in function RefreshLottery is out of expectation.");
				break;
		}
		ChangeValue("Textbox_LotteryRangeMin", Lottery.Options.Range.Min);
		ChangeValue("Textbox_LotteryRangeMax", Lottery.Options.Range.Max);
		ChangeChecked("Checkbox_LotteryPreventDuplication", Lottery.Options.PreventDuplication);

		// Save User Data
		localStorage.setItem("TimerPlusLottery_Lottery", JSON.stringify(Lottery));
	}

// Cmds
	// Timer
		// Ctrls
		function StartTimer() {
			if(Timer.Status.IsRunning == false) {
				Timer.Status.IsRunning = true; Timer.Status.IsPaused = false;
			} else {
				if(Timer.Status.IsPaused == false) {
					Timer.Status.IsPaused = true;
				} else {
					Timer.Status.IsPaused = false;
				}
			}
			RefreshTimer();
		}
		function LapTimer() {
			if(Timer.Options.UseCountdown == true) {
				ChangeText("Label_TimerLapRecorder",
					"#" + Timer.Stats.Lap.Sequence +
					"　+" + Math.floor((Timer.Stats.Lap.PreviousCurrentTime - Timer.Stats.CurrentTime) / 60000) + ":" + Math.floor((Timer.Stats.Lap.PreviousCurrentTime - Timer.Stats.CurrentTime) % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor((Timer.Stats.Lap.PreviousCurrentTime - Timer.Stats.CurrentTime) % 1000 / 10).toString().padStart(2, "0") +
					"　" + Math.floor((Timer.Options.Duration - Timer.Stats.CurrentTime) / 60000) + ":" + Math.floor((Timer.Options.Duration - Timer.Stats.CurrentTime) % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor((Timer.Options.Duration - Timer.Stats.CurrentTime) % 1000 / 10).toString().padStart(2, "0") + "<br />" +
					ReadText("Label_TimerLapRecorder"));
			} else {
				ChangeText("Label_TimerLapRecorder",
					"#" + Timer.Stats.Lap.Sequence +
					"　+" + Math.floor((Timer.Stats.CurrentTime - Timer.Stats.Lap.PreviousCurrentTime) / 60000) + ":" + Math.floor((Timer.Stats.CurrentTime - Timer.Stats.Lap.PreviousCurrentTime) % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor((Timer.Stats.CurrentTime - Timer.Stats.Lap.PreviousCurrentTime) % 1000 / 10).toString().padStart(2, "0") +
					"　" + Math.floor(Timer.Stats.CurrentTime / 60000) + ":" + Math.floor(Timer.Stats.CurrentTime % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor(Timer.Stats.CurrentTime % 1000 / 10).toString().padStart(2, "0") + "<br />" +
					ReadText("Label_TimerLapRecorder"));
			}
			Timer.Stats.Lap.Sequence++;
			Timer.Stats.Lap.PreviousCurrentTime = Timer.Stats.CurrentTime;
		}
		function ResetTimer() {
			Timer.Status.IsRunning = false; Timer.Status.IsPaused = false;
			Timer.Stats.Lap.Sequence = 1;
			if(Timer.Options.UseCountdown == true) {
				Timer.Stats.Lap.PreviousCurrentTime = Timer.Options.Duration;
			} else {
				Timer.Stats.Lap.PreviousCurrentTime = 0;
			}
			RefreshTimer();
			ChangeText("Label_TimerLapRecorder", "");
		}

		// Options
		function SetTimerDuration() {
			Timer.Options.Duration = parseInt(Number(ReadValue("Textbox_TimerMin"))) * 60000 + parseInt(Number(ReadValue("Textbox_TimerSec"))) * 1000; // Use parseInt(Number()) to force convert value to integer.
			if(Timer.Options.Duration < 1000) {
				Timer.Options.Duration = 1000;
			}
			if(Timer.Options.Duration > 59999000) {
				Timer.Options.Duration = 59999000;
			}
			RefreshTimer();
		}
		function SetTimerCountdown() {
			Timer.Options.UseCountdown = ReadChecked("Checkbox_TimerCountdown");
			Timer.Stats.Lap.PreviousCurrentTime = Timer.Options.Duration - Timer.Stats.Lap.PreviousCurrentTime;
			RefreshTimer();
		}

		// Presets
		function StartPresetTimer(Selector) {
			Timer.Options.Duration = Timer.Preset[Selector];
			ResetTimer();
			StartTimer();
		}
		function ReplacePresetTimer(Selector) {
			Timer.Preset[Selector] = Timer.Options.Duration;
			RefreshTimer();
		}
	
	// Lottery
		// Ctrls
		function StartLottery() {
			Lottery0.Status.Progress = 1;
			clearInterval(Automation.RollLottery);
			Automation.RollLottery = setInterval(RollLottery, 100);
			RefreshLottery();
		}
		function ResetLottery() {
			Lottery0.Status.Progress = 0;
			Lottery.Stats.Number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			clearInterval(Automation.RollLottery);
			RefreshLottery();
		}

		// Options
		function SetLotteryMode() {
			Lottery.Options.Mode = ReadValue("Combobox_LotteryMode");
			RefreshLottery();
		}
		function SetLotteryRangeMin() {
			Lottery.Options.Range.Min = parseInt(Number(ReadValue("Textbox_LotteryRangeMin")));
			if(Lottery.Options.Range.Min < 1) {
				Lottery.Options.Range.Min = 1;
			}
			if(Lottery.Options.Range.Min > 9999) {
				Lottery.Options.Range.Min = 9999;
			}
			if(Lottery.Options.Range.Min > Lottery.Options.Range.Max) {
				Lottery.Options.Range.Max = Lottery.Options.Range.Min;
			}
			RefreshLottery();
		}
		function SetLotteryRangeMax() {
			Lottery.Options.Range.Max = parseInt(Number(ReadValue("Textbox_LotteryRangeMax")));
			if(Lottery.Options.Range.Max < 1) {
				Lottery.Options.Range.Max = 1;
			}
			if(Lottery.Options.Range.Max > 9999) {
				Lottery.Options.Range.Max = 9999;
			}
			if(Lottery.Options.Range.Max < Lottery.Options.Range.Min) {
				Lottery.Options.Range.Min = Lottery.Options.Range.Max;
			}
			RefreshLottery();
		}
		function SetLotteryPreventDuplication() {
			Lottery.Options.PreventDuplication = ReadChecked("Checkbox_LotteryPreventDuplication");
			RefreshLottery();
		}

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
				"\"System\":" + JSON.stringify(System) + "," +
				"\"TimerPlusLottery_Timer\":" + JSON.stringify(Timer) + "," +
				"\"TimerPlusLottery_Lottery\":" + JSON.stringify(Lottery) +
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
			case "Timer_TimeUp":
				switch(Selector) {
					case 3:
						StopAudio("Audio_Sound");
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
Automation.BlinkTimeSeparator = setInterval(BlinkTimeSeparator, 500);

// Features
	// Lottery
	function RollLottery() {
		// Move the Lottery Queue
		for(Looper = 10; Looper >= 2; Looper--) {
			Lottery.Stats.Number[Looper] = Lottery.Stats.Number[Looper - 1];
		}

		// Roll A New Number
		do { // Prevent rolling a number that already exists in the lottery queue.
			Lottery.Stats.Number[1] = Randomize(Lottery.Options.Range.Min, Lottery.Options.Range.Max);
			if(Lottery.Options.Mode == "Poker") {
				if(Lottery.Stats.Number[1] == 1) {
					Lottery.Stats.Number[1] = "A";
				}
				if(Lottery.Stats.Number[1] == 11) {
					Lottery.Stats.Number[1] = "J";
				}
				if(Lottery.Stats.Number[1] == 12) {
					Lottery.Stats.Number[1] = "Q";
				}
				if(Lottery.Stats.Number[1] == 13) {
					Lottery.Stats.Number[1] = "K";
				}
			}
		} while(
			Lottery.Options.PreventDuplication == true &&
			Lottery.Options.Range.Max - Lottery.Options.Range.Min >= 9 &&
			IsDuplicationInLotteryQueue() == true
		);

		// Make Progress
		Lottery0.Status.Progress++;

		// Finish Rolling
		if(Lottery0.Status.Progress > 10) {
			Lottery0.Status.Progress = 0;
			clearInterval(Automation.RollLottery);
		}

		// Refresh
		RefreshLottery();
	}
	function IsDuplicationInLotteryQueue() {
		for(Looper = 2; Looper <= 10; Looper++) {
			if(Lottery.Stats.Number[Looper] == Lottery.Stats.Number[1]) {
				return true;
			}
		}
		return false;
	}

// Error Handling
function AlertError(Message) {
	LogConsole("● 错误\n" +
		Message);
	ShowDialog("System_Error",
		"Error",
		"抱歉，发生了程序错误。您可在浏览器控制台查看错误信息，或尝试清空用户数据以解决问题。是否前往用户数据？",
		"", "前往", "取消");
}
