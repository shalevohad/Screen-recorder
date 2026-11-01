using System.Windows;
using ITB_SCREEN_RECORDER.Player.CallerShowcase.ViewModels;

namespace ITB_SCREEN_RECORDER.Player.CallerShowcase.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    protected override void OnClosed(System.EventArgs e)
    {
        if (DataContext is ShowcaseMainViewModel vm)
        {
            vm.Dispose();
        }
        base.OnClosed(e);
    }
}
