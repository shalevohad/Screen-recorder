using System;
using System.Collections.Generic;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using ITB_SCREEN_RECORDER.Player.ViewModels;

namespace ITB_SCREEN_RECORDER.Player.Views;

public partial class MainWindow : Window
{
    private readonly HashSet<MediaElement> _activeMediaElements = new();

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
        Closing += MainWindow_Closing;

        ViewModel.PropertyChanged += ViewModel_PropertyChanged;
        ViewModel.SeekRequested += ViewModel_SeekRequested;
        ViewModel.PlaybackStateChanged += ViewModel_PlaybackStateChanged;
        ViewModel.PlaybackRateChanged += ViewModel_PlaybackRateChanged;
        ViewModel.StopRequested += ViewModel_StopRequested;
    }

    private void ViewModel_PropertyChanged(object? sender, System.ComponentModel.PropertyChangedEventArgs e)
    {
        if (e.PropertyName == nameof(MainViewModel.IsCanvasFullscreen))
        {
            if (ViewModel.IsCanvasFullscreen)
            {
                WindowStyle = WindowStyle.None;
                WindowState = WindowState.Maximized;
            }
            else
            {
                WindowStyle = WindowStyle.SingleBorderWindow;
                WindowState = WindowState.Normal;
            }
        }
    }

    private void ViewModel_SeekRequested(TimeSpan time)
    {
        Dispatcher.InvokeAsync(() =>
        {
            foreach (var me in _activeMediaElements)
            {
                try
                {
                    me.Position = time;
                }
                catch { }
            }
        });
    }

    private void ViewModel_PlaybackStateChanged(bool isPlaying)
    {
        Dispatcher.InvokeAsync(() =>
        {
            foreach (var me in _activeMediaElements)
            {
                try
                {
                    if (isPlaying)
                    {
                        me.Play();
                    }
                    else
                    {
                        me.Pause();
                    }
                }
                catch { }
            }
        });
    }

    private void ViewModel_PlaybackRateChanged(double rate)
    {
        Dispatcher.InvokeAsync(() =>
        {
            foreach (var me in _activeMediaElements)
            {
                try
                {
                    me.SpeedRatio = rate;
                }
                catch { }
            }
        });
    }

    private void ViewModel_StopRequested()
    {
        Dispatcher.InvokeAsync(() =>
        {
            foreach (var me in _activeMediaElements)
            {
                try
                {
                    me.Stop();
                }
                catch { }
            }
        });
    }

    private void MediaElement_Loaded(object sender, RoutedEventArgs e)
    {
        if (sender is MediaElement me)
        {
            me.LoadedBehavior = MediaState.Manual;
            me.UnloadedBehavior = MediaState.Manual;
            _activeMediaElements.Add(me);

            try
            {
                me.Position = TimeSpan.FromSeconds(ViewModel.CurrentTimelineSeconds);
                me.SpeedRatio = ViewModel.PlaybackRate;
                if (ViewModel.IsPlaying)
                {
                    me.Play();
                }
                else
                {
                    me.Pause();
                }
            }
            catch { }
        }
    }

    private void MediaElement_Unloaded(object sender, RoutedEventArgs e)
    {
        if (sender is MediaElement me)
        {
            _activeMediaElements.Remove(me);
            try
            {
                me.Stop();
            }
            catch { }
        }
    }

    private void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        // Parse command line arguments if a file was passed as argument (e.g. double click .itbp / .tar)
        string[] args = System.Environment.GetCommandLineArgs();
        if (args.Length > 1 && File.Exists(args[1]))
        {
            _ = ViewModel.LoadPackageAsync(args[1]);
        }
    }

    private void MainWindow_Closing(object? sender, System.ComponentModel.CancelEventArgs e)
    {
        ViewModel.Dispose();
    }

    private void Window_DragOver(object sender, DragEventArgs e)
    {
        if (e.Data.GetDataPresent(DataFormats.FileDrop))
        {
            e.Effects = DragDropEffects.Copy;
        }
        else
        {
            e.Effects = DragDropEffects.None;
        }
        e.Handled = true;
    }

    private void Window_Drop(object sender, DragEventArgs e)
    {
        if (e.Data.GetDataPresent(DataFormats.FileDrop))
        {
            string[]? files = (string[]?)e.Data.GetData(DataFormats.FileDrop);
            if (files != null && files.Length > 0 && File.Exists(files[0]))
            {
                _ = ViewModel.LoadPackageAsync(files[0]);
            }
        }
    }

    private void Window_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.OriginalSource is TextBox) return;

        if (e.Key == Key.Space)
        {
            ViewModel.PlayPauseCommand.Execute(null);
            e.Handled = true;
        }
        else if (e.Key == Key.F || e.Key == Key.F11)
        {
            ViewModel.ToggleFullscreenCanvasCommand.Execute(null);
            e.Handled = true;
        }
        else if (e.Key == Key.Escape)
        {
            if (ViewModel.IsCanvasFullscreen)
            {
                ViewModel.IsCanvasFullscreen = false;
                e.Handled = true;
            }
            else if (ViewModel.IsSoloMode)
            {
                ViewModel.ReturnToCanvas();
                e.Handled = true;
            }
        }
        else if (e.Key == Key.C || e.Key == Key.D0 || e.Key == Key.NumPad0)
        {
            ViewModel.ReturnToCanvas();
            e.Handled = true;
        }
        else if (e.Key == Key.S)
        {
            ViewModel.SetViewModeCommand.Execute("Split");
            e.Handled = true;
        }
        else if (e.Key == Key.P)
        {
            ViewModel.SetViewModeCommand.Execute("Pip");
            e.Handled = true;
        }
        else if (e.Key == Key.X)
        {
            if (ViewModel.IsPipMode)
            {
                ViewModel.SwapPipCommand.Execute(null);
                e.Handled = true;
            }
        }
        else if (e.Key == Key.D)
        {
            ViewModel.ToggleDirectorModeCommand.Execute(null);
            e.Handled = true;
        }
        else if (e.Key == Key.R)
        {
            ViewModel.ToggleDirectorRecordingCommand.Execute(null);
            e.Handled = true;
        }
        else if (e.Key >= Key.D1 && e.Key <= Key.D9)
        {
            int digit = e.Key - Key.D1 + 1;
            ViewModel.SelectMonitorByIndex(digit);
            e.Handled = true;
        }
        else if (e.Key >= Key.NumPad1 && e.Key <= Key.NumPad9)
        {
            int digit = e.Key - Key.NumPad1 + 1;
            ViewModel.SelectMonitorByIndex(digit);
            e.Handled = true;
        }
        else if (e.Key == Key.Left)
        {
            double target = Math.Max(0, ViewModel.CurrentTimelineSeconds - 5.0);
            ViewModel.CurrentTimelineSeconds = target;
            e.Handled = true;
        }
        else if (e.Key == Key.Right)
        {
            double target = Math.Min(ViewModel.TotalDurationSeconds, ViewModel.CurrentTimelineSeconds + 5.0);
            ViewModel.CurrentTimelineSeconds = target;
            e.Handled = true;
        }
    }
}
