using System.Windows;

namespace Task2
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            buttonEnter.Click += ButtonEnter_Click;
            buttonAbout.Click += ButtonAbout_Click;
            buttonClose.Click += ButtonClose_Click;
        }

        private void ButtonEnter_Click(object sender, RoutedEventArgs e)
        {
            string hello = "Hello";
            string input = string.Empty;
            if (string.IsNullOrEmpty(textBoxEnterName.Text) || string.IsNullOrWhiteSpace(textBoxEnterName.Text))
            {
                input = "World!";
            }
            else
            {
                input = textBoxEnterName.Text;
            }
            
            textBlockHello.Text = hello + " " + input;
        }

        private void ButtonAbout_Click(object sender, RoutedEventArgs e)
        {
            string info = $"О программе {this.Title}";
            About about = new About(info);
            about.ShowDialog();
        }

        private void ButtonClose_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}