// For SamToki.github.io/Timer+Lottery
// Released under GNU GPL v3 open source license.
// (C) 2023 SAM TOKI STUDIO

// Initialization
	// Declare variables
	"use strict";
		// Unsaved
		const CurrentVersion = 2.09;
		var Timer0 = {
			Stats: {
				Display: [0, 0, 0, 5, 0, 0, 0]
			}
		},
		Lottery0 = {
			Status: {
				IsRolling: false,
				Progress: 0
			}
		};
		Automation.ClockTimer = null;
		Automation.RollLottery = null;

		// Saved
		var Subsystem = {
			Audio: {
				SoundVolume: 100
			}
		},
		Timer = {
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
					Log: "", Sequence: 1, PreviousCurrentTime: 300000
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

	// Load user data
	window.onload = Load();
	function Load() {
		if(localStorage.System != undefined) {
			System = JSON.parse(localStorage.getItem("System"));
		} else {
			System.I18n.Language = "zh-CN";
		}
		switch(System.I18n.Language) {
			case "en-US":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang=\"en-US\">Sorry, this page currently does not support English (US).</span>",
					"", "", "", "<span lang=\"en-US\">OK</span>");
				break;
			case "ja-JP":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang=\"ja-JP\">すみません。このページは日本語にまだサポートしていません。</span>",
					"", "", "", "<span lang=\"ja-JP\">OK</span>");
				break;
			case "zh-CN":
				/* ChangeCursorOverall("wait");
				window.location.replace("index.html"); */
				break;
			case "zh-TW":
				ShowDialog("System_LanguageUnsupported",
					"Error",
					"<span lang=\"zh-TW\">抱歉，本頁面暫不支援繁體中文。</span>",
					"", "", "", "<span lang=\"zh-TW\">確定</span>");
				break;
			default:
				AlertSystemError("The value of System.I18n.Language \"" + System.I18n.Language + "\" in function Load is invalid.");
				break;
		}
		if(System.Version.TimerPlusLottery != undefined) {
			if(Math.floor(CurrentVersion) - Math.floor(System.Version.TimerPlusLottery) >= 1) {
				ShowDialog("System_MajorUpdateDetected",
					"Info",
					"检测到大版本更新。若您继续使用旧版本的用户数据，则有可能发生兼容性问题。敬请留意。",
					"", "", "", "确定");
				System.Version.TimerPlusLottery = CurrentVersion;
			}
		} else {
			System.Version.TimerPlusLottery = CurrentVersion;
		}
		if(localStorage.TimerPlusLottery_Subsystem != undefined) {
			Subsystem = JSON.parse(localStorage.getItem("TimerPlusLottery_Subsystem"));
		}
		if(localStorage.TimerPlusLottery_Timer != undefined) {
			Timer = JSON.parse(localStorage.getItem("TimerPlusLottery_Timer"));
		}
		if(localStorage.TimerPlusLottery_Lottery != undefined) {
			Lottery = JSON.parse(localStorage.getItem("TimerPlusLottery_Lottery"));
		}
		RefreshSystem();
		RefreshSubsystem();
		RefreshTimer();
		RefreshLottery();
		setTimeout(HideToast, 0);
	}

	// Pause the timer before exiting
	window.onbeforeunload = Exit();
	function Exit() {
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
					ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "(prefers-color-scheme: dark)");
					break;
				case "Light":
					ChangeLink("ThemeVariant_Common", "");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "Dark":
					ChangeLink("ThemeVariant_Common", "../styles/common_Dark.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_Dark.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "Genshin":
					ChangeLink("ThemeVariant_Common", "../styles/common_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_Genshin.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
					break;
				case "HighContrast":
					ChangeLink("ThemeVariant_Common", "../styles/common_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Common", "");
					ChangeLink("ThemeVariant_Style", "styles/style_HighContrast.css");
					ChangeMediaCondition("ThemeVariant_Style", "");
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
				ChangeFilter("Ctnr_BgImage", "blur(20px)");
			} else {
				ChangeFilter("Ctnr_BgImage", "");
			}
			ChangeChecked("Checkbox_SettingsShowTopbar", System.Display.ShowTopbar);
			if(System.Display.ShowTopbar == true && IsFullscreen() == false) {
				Show("Topbar");
			} else {
				Hide("Topbar");
			}
			if(window.matchMedia("(prefers-reduced-motion: reduce)").matches == false) {
				ChangeDisabled("Combobox_SettingsAnim", false);
			} else {
				System.Display.Anim = 0;
				ChangeDisabled("Combobox_SettingsAnim", true);
			}
			ChangeValue("Combobox_SettingsAnim", System.Display.Anim);
			ChangeAnimOverall(System.Display.Anim);

			// Audio
			ChangeChecked("Checkbox_SettingsPlayAudio", System.Audio.PlayAudio);
			if(System.Audio.PlayAudio == true) {
				Show("Ctrl_SettingsSoundVolume");
			} else {
				StopAllAudio();
				Hide("Ctrl_SettingsSoundVolume");
			}

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
	function RefreshSubsystem() {
		// Settings
			// Audio
			ChangeValue("Slider_SettingsSoundVolume", Subsystem.Audio.SoundVolume);
			if(Subsystem.Audio.SoundVolume > 0) {
				ChangeText("Label_SettingsSoundVolume", Subsystem.Audio.SoundVolume + "%");
			} else {
				ChangeText("Label_SettingsSoundVolume", "禁用");
			}
			ChangeVolume("Audio_Sound", Subsystem.Audio.SoundVolume);

		// Save user data
		localStorage.setItem("TimerPlusLottery_Subsystem", JSON.stringify(Subsystem));
	}

	// Timer
	function ClockTimer() {
		// Change self update freq
		clearInterval(Automation.ClockTimer);
		if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == false) {
			Automation.ClockTimer = setInterval(ClockTimer, 20);
		} else {
			Automation.ClockTimer = setInterval(ClockTimer, 500);
		}

		// Core
			// Update current time first
			if(Timer.Options.UseCountdown == true) {
				Timer.Stats.CurrentTime = Timer.Stats.EndTime - Timer.Stats.ClockTime;
			} else {
				Timer.Stats.CurrentTime = Timer.Options.Duration - (Timer.Stats.EndTime - Timer.Stats.ClockTime);
			}

			// Clock time & start time & end time
			Timer.Stats.ClockTime = Date.now();
			if(Timer.Status.IsRunning == false) {
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

			// Update current time again
			if(Timer.Options.UseCountdown == true) {
				Timer.Stats.CurrentTime = Timer.Stats.EndTime - Timer.Stats.ClockTime;
			} else {
				Timer.Stats.CurrentTime = Timer.Options.Duration - (Timer.Stats.EndTime - Timer.Stats.ClockTime);
			}

		// Dashboard
			// Progring & needle
			if(Timer.Status.IsRunning == true && Timer.Status.IsPaused == false && System.Display.Anim > 0) {
				ChangeAnim("ProgringFg_Timer", "100ms");
				ChangeAnim("Needle_Timer", "100ms");
			} else {
				ChangeAnim("ProgringFg_Timer", "");
				ChangeAnim("Needle_Timer", "");
			}
			ChangeProgring("ProgringFg_Timer", 917.35, Timer.Stats.CurrentTime / Timer.Options.Duration * 100);
			ChangeRotate("Needle_Timer", Timer.Stats.CurrentTime / 60000 * 360);

			// Start time & end time
			ChangeText("Label_TimerStartTime", new Date(Timer.Stats.StartTime).toLocaleTimeString(System.I18n.Language));
			ChangeText("Label_TimerEndTime", new Date(Timer.Stats.EndTime).toLocaleTimeString(System.I18n.Language));

			// Scrolling numbers
			Timer0.Stats.Display[1] = Math.floor(Timer.Stats.CurrentTime / 6000000);
			Timer0.Stats.Display[2] = Math.floor(Timer.Stats.CurrentTime % 6000000 / 600000);
			Timer0.Stats.Display[3] = Math.floor(Timer.Stats.CurrentTime % 600000 / 60000);
			Timer0.Stats.Display[4] = Math.floor(Timer.Stats.CurrentTime % 60000 / 10000);
			Timer0.Stats.Display[5] = Timer.Stats.CurrentTime % 10000 / 1000;
			Timer0.Stats.Display[6] = Math.floor(Timer.Stats.CurrentTime % 1000 / 10);
			if(System.Display.Anim > 0) {
				if(Timer0.Stats.Display[5] > 9) {Timer0.Stats.Display[4] += (Timer0.Stats.Display[5] - 9);} // Imitating the cockpit PFD number scrolling effect.
				if(Timer0.Stats.Display[4] > 5) {Timer0.Stats.Display[3] += (Timer0.Stats.Display[4] - 5);}
				if(Timer0.Stats.Display[3] > 9) {Timer0.Stats.Display[2] += (Timer0.Stats.Display[3] - 9);}
				if(Timer0.Stats.Display[2] > 9) {Timer0.Stats.Display[1] += (Timer0.Stats.Display[2] - 9);}
			} else {
				Timer0.Stats.Display[5] = Math.floor(Timer0.Stats.Display[5]);
			}
			if(IsMobileLayout() == false) {
				ChangeTop("ScrollingNumber_Timer1", -60 * (9 - Timer0.Stats.Display[1]) + "px");
				ChangeTop("ScrollingNumber_Timer2", -60 * (10 - Timer0.Stats.Display[2]) + "px");
				ChangeTop("ScrollingNumber_Timer3", -60 * (10 - Timer0.Stats.Display[3]) + "px");
				ChangeTop("ScrollingNumber_Timer4", -60 * (6 - Timer0.Stats.Display[4]) + "px");
				ChangeTop("ScrollingNumber_Timer5", 20 - 40 * (11 - Timer0.Stats.Display[5]) + "px");
			} else {
				ChangeTop("ScrollingNumber_Timer1", -45 * (9 - Timer0.Stats.Display[1]) + "px");
				ChangeTop("ScrollingNumber_Timer2", -45 * (10 - Timer0.Stats.Display[2]) + "px");
				ChangeTop("ScrollingNumber_Timer3", -45 * (10 - Timer0.Stats.Display[3]) + "px");
				ChangeTop("ScrollingNumber_Timer4", -45 * (6 - Timer0.Stats.Display[4]) + "px");
				ChangeTop("ScrollingNumber_Timer5", 15 - 30 * (11 - Timer0.Stats.Display[5]) + "px");
			}
			ChangeText("Label_TimerMillisec", "." + Timer0.Stats.Display[6].toString().padStart(2, "0"));
		
		// Time up
		if(Timer.Stats.ClockTime >= Timer.Stats.EndTime) {
			ShowDialog("Timer_TimeUp",
				"Info",
				"计时完成！<br />" +
				"从 " + ReadText("Label_TimerStartTime") + " 至 " + ReadText("Label_TimerEndTime") + "。<br />" +
				"设定时长" + Math.floor(Timer.Options.Duration / 60000) + "分" + Math.floor(Timer.Options.Duration % 60000 / 1000).toString().padStart(2, "0") + "秒，实际时长" + Math.floor((Timer.Stats.EndTime - Timer.Stats.StartTime) / 60000) + "分" + Math.floor((Timer.Stats.EndTime - Timer.Stats.StartTime) % 60000 / 1000).toString().padStart(2, "0") + "秒。",
				"", "", "", "确定");
			ChangeAudioLoop("Audio_Sound", true);
			PlayAudio("Audio_Sound", "audio/sounds/TimeUp.mp3");
			ResetTimer();
		}
	}
	function RefreshTimer() {
		// Call
		ClockTimer();

		// Ctrls
		if(Timer.Status.IsRunning == false) {
			RemoveClassByClass("TimeSeparator", "Blink");
			ChangeText("Cmdbtn_TimerStart", "开始");
			ChangeDisabled("Cmdbtn_TimerLap", true);
			ChangeDisabled("Cmdbtn_TimerReset", true);
			ChangeDisabled("Textbox_TimerMin", false);
			ChangeDisabled("Textbox_TimerSec", false);
		} else {
			if(Timer.Status.IsPaused == false) {
				AddClassByClass("TimeSeparator", "Blink");
				ChangeText("Cmdbtn_TimerStart", "暂停");
				ChangeDisabled("Cmdbtn_TimerLap", false);
			} else {
				RemoveClassByClass("TimeSeparator", "Blink");
				ChangeText("Cmdbtn_TimerStart", "继续");
				ChangeDisabled("Cmdbtn_TimerLap", true);
			}
			ChangeDisabled("Cmdbtn_TimerReset", false);
			ChangeDisabled("Textbox_TimerMin", true);
			ChangeDisabled("Textbox_TimerSec", true);
		}
		if(Timer.Stats.Lap.Log != "") {
			ChangeText("Label_TimerLap", Timer.Stats.Lap.Log);
		} else {
			ChangeText("Label_TimerLap", "(无记录)");
		}
		ScrollToBottom("Ctrl_TimerLap");

		// Options
		ChangeValue("Textbox_TimerMin", Math.floor(Timer.Options.Duration / 60000));
		ChangeValue("Textbox_TimerSec", Math.floor(Timer.Options.Duration % 60000 / 1000));
		ChangeChecked("Checkbox_TimerCountdown", Timer.Options.UseCountdown);

		// Presets
		ChangeText("Label_TimerPreset1", Math.floor(Timer.Preset[1] / 60000) + ":" + Math.floor(Timer.Preset[1] % 60000 / 1000).toString().padStart(2, "0"));
		ChangeText("Label_TimerPreset2", Math.floor(Timer.Preset[2] / 60000) + ":" + Math.floor(Timer.Preset[2] % 60000 / 1000).toString().padStart(2, "0"));
		ChangeText("Label_TimerPreset3", Math.floor(Timer.Preset[3] / 60000) + ":" + Math.floor(Timer.Preset[3] % 60000 / 1000).toString().padStart(2, "0"));

		// Save user data
		localStorage.setItem("TimerPlusLottery_Timer", JSON.stringify(Timer));
	}

	// Lottery
	function RefreshLottery() {
		// Dashboard
		for(let Looper = 1; Looper <= 10; Looper++) {
			ChangeText("Label_LotteryNumber" + Looper, Lottery.Stats.Number[Looper]);
		}

		// Ctrls
		if(Lottery0.Status.IsRolling == true) {
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
				AlertSystemError("The value of Lottery.Options.Mode \"" + Lottery.Options.Mode + "\" in function RefreshLottery is invalid.");
				break;
		}
		ChangeValue("Textbox_LotteryRangeMin", Lottery.Options.Range.Min);
		ChangeValue("Textbox_LotteryRangeMax", Lottery.Options.Range.Max);
		ChangeChecked("Checkbox_LotteryPreventDuplication", Lottery.Options.PreventDuplication);

		// Save user data
		localStorage.setItem("TimerPlusLottery_Lottery", JSON.stringify(Lottery));
	}

// Cmds
	// Timer
		// Ctrls
		function StartTimer() {
			if(Timer.Status.IsRunning == false) {
				Timer.Status.IsRunning = true;
				Timer.Status.IsPaused = false;
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
				Timer.Stats.Lap.Log += "#" + Timer.Stats.Lap.Sequence + "　" +
					"+" + Math.floor((Timer.Stats.Lap.PreviousCurrentTime - Timer.Stats.CurrentTime) / 60000) + ":" + Math.floor((Timer.Stats.Lap.PreviousCurrentTime - Timer.Stats.CurrentTime) % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor((Timer.Stats.Lap.PreviousCurrentTime - Timer.Stats.CurrentTime) % 1000 / 10).toString().padStart(2, "0") + "　" +
					Math.floor((Timer.Options.Duration - Timer.Stats.CurrentTime) / 60000) + ":" + Math.floor((Timer.Options.Duration - Timer.Stats.CurrentTime) % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor((Timer.Options.Duration - Timer.Stats.CurrentTime) % 1000 / 10).toString().padStart(2, "0") + "<br />";
			} else {
				Timer.Stats.Lap.Log += "#" + Timer.Stats.Lap.Sequence + "　" +
					"+" + Math.floor((Timer.Stats.CurrentTime - Timer.Stats.Lap.PreviousCurrentTime) / 60000) + ":" + Math.floor((Timer.Stats.CurrentTime - Timer.Stats.Lap.PreviousCurrentTime) % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor((Timer.Stats.CurrentTime - Timer.Stats.Lap.PreviousCurrentTime) % 1000 / 10).toString().padStart(2, "0") + "　" +
					Math.floor(Timer.Stats.CurrentTime / 60000) + ":" + Math.floor(Timer.Stats.CurrentTime % 60000 / 1000).toString().padStart(2, "0") + "." + Math.floor(Timer.Stats.CurrentTime % 1000 / 10).toString().padStart(2, "0") + "<br />";
			}
			Timer.Stats.Lap.Sequence++;
			Timer.Stats.Lap.PreviousCurrentTime = Timer.Stats.CurrentTime;
			RefreshTimer();
		}
		function ResetTimer() {
			Timer.Status = {
				IsRunning: false, IsPaused: false
			};
			Timer.Stats.Lap.Log = "";
			Timer.Stats.Lap.Sequence = 1;
			if(Timer.Options.UseCountdown == true) {
				Timer.Stats.Lap.PreviousCurrentTime = Timer.Options.Duration;
			} else {
				Timer.Stats.Lap.PreviousCurrentTime = 0;
			}
			RefreshTimer();
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
			Timer.Options.UseCountdown = IsChecked("Checkbox_TimerCountdown");
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
			Lottery0.Status.IsRolling = true;
			Lottery0.Status.Progress = 0;
			clearInterval(Automation.RollLottery);
			Automation.RollLottery = setInterval(RollLottery, 100);
			RefreshLottery();
		}
		function ResetLottery() {
			Lottery0.Status.IsRolling = false;
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
			Lottery.Options.PreventDuplication = IsChecked("Checkbox_LotteryPreventDuplication");
			RefreshLottery();
		}

	// Settings
		// Audio
		function SetSoundVolume() {
			Subsystem.Audio.SoundVolume = ReadValue("Slider_SettingsSoundVolume");
			RefreshSubsystem();
		}
		function PreviewSoundVolume() {
			ChangeAudioLoop("Audio_Sound", false);
			PlayAudio("Audio_Sound", "../audio/sounds/Beep.mp3");
		}

		// User data
		function ImportUserData() {
			if(ReadValue("Textbox_SettingsUserDataImport") != "") {
				if(ReadValue("Textbox_SettingsUserDataImport").startsWith("{\"System\":{\"Display\":{\"Theme\":") == true) {
					let Objects = JSON.parse(ReadValue("Textbox_SettingsUserDataImport"));
					Object.keys(Objects).forEach(function(ObjectName) {
						localStorage.setItem(ObjectName, JSON.stringify(Objects[ObjectName]));
					});
					ChangeCursorOverall("wait");
					window.location.reload();
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
				"\"System\":" + JSON.stringify(System) + "," +
				"\"TimerPlusLottery_Timer\":" + JSON.stringify(Timer) + "," +
				"\"TimerPlusLottery_Lottery\":" + JSON.stringify(Lottery) +
				"}");
			ShowDialog("System_UserDataExported",
				"Info",
				"已导出用户数据至剪贴板。",
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
		switch(Interaction.DialogEvent) {
			case "System_LanguageUnsupported":
			case "System_MajorUpdateDetected":
			case "System_JSONStringInvalid":
			case "System_UserDataExported":
				switch(Selector) {
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "System_ConfirmClearUserData":
				switch(Selector) {
					case 2:
						localStorage.clear();
						ChangeCursorOverall("wait");
						window.location.reload();
						break;
					case 3:
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
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
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			case "Timer_TimeUp":
				switch(Selector) {
					case 3:
						StopAudio("Audio_Sound");
						break;
					default:
						setTimeout(function() {
							AlertSystemError("The value of Selector \"" + Selector + "\" in function AnswerDialog is invalid.");
						}, 0);
						break;
				}
				break;
			default:
				setTimeout(function() {
					AlertSystemError("The value of Interaction.DialogEvent \"" + Interaction.DialogEvent + "\" in function AnswerDialog is invalid.");
				}, 0);
				return;
		}
		HideDialog();
	}

// Listeners
	// On resizing window
	window.addEventListener("resize", ClockTimer);

// Features
	// Lottery
	function RollLottery() {
		if(Lottery0.Status.IsRolling == true) {
			// Move the lottery queue
			for(let Looper = 10; Looper >= 2; Looper--) {
				Lottery.Stats.Number[Looper] = Lottery.Stats.Number[Looper - 1];
			}

			// Roll a new number
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

			// Make progress
			Lottery0.Status.Progress++;

			// Finish rolling
			if(Lottery0.Status.Progress >= 10) {
				Lottery0.Status.IsRolling = false;
				clearInterval(Automation.RollLottery);
			}

			// Refresh
			RefreshLottery();
		} else {
			AlertSystemError("Function RollLottery was called when the value of Lottery0.Status.IsRolling is not \"true\".");
		}
	}
	function IsDuplicationInLotteryQueue() {
		for(let Looper = 2; Looper <= 10; Looper++) {
			if(Lottery.Stats.Number[Looper] == Lottery.Stats.Number[1]) {
				return true;
			}
		}
		return false;
	}

// Error handling
function AlertSystemError(Message) {
	console.error("● 系统错误\n" +
		Message);
	ShowDialog("System_Error",
		"Error",
		"抱歉，发生了系统错误。这可能是损坏了的用户数据导致的。是否前往用户数据？<br />" +
		"<br />" +
		"错误信息：" + Message,
		"", "", "前往", "取消");
}
