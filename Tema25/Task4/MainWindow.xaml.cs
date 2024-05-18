using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;


namespace Task4
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Random _random = new Random();
        private int _btnCount = 0;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_MouseEnter(object sender, MouseEventArgs e)
        {
            _btnCount++;
            Button newButton = new Button
            {
                Content = $"Кнопка {_btnCount}",
                Width = 100,
                Height = 50,
                HorizontalAlignment = HorizontalAlignment.Left,
                VerticalAlignment = VerticalAlignment.Top
            };

            double maxLeft = MainGrid.ActualWidth - newButton.Width - 20;
            double maxTop = MainGrid.ActualHeight - newButton.Height - 20;
            if (maxLeft < 0) maxLeft = 0;
            if (maxTop < 0) maxTop = 0;
            double left = _random.NextDouble() * maxLeft;
            double top = _random.NextDouble() * maxTop;

            newButton.Margin = new Thickness(left, top, 0, 0);

            newButton.Click += Button_Click;

            MainGrid.Children.Add(newButton);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            if (button != null)
            {
                MainGrid.Children.Remove(button);
            }
        }
    }
}