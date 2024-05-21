using System.Windows;

namespace Task3
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            int clickCount = int.Parse(ClickCount.Text);
            clickCount++;
            ClickCount.Text = clickCount.ToString();
        }
    }
}