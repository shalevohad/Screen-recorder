using System.IO;
using System.Windows;
using ITB_SCREEN_RECORDER.Player.ViewModels;

namespace ITB_SCREEN_RECORDER.Player.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
        Closing += MainWindow_Closing;
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
}
