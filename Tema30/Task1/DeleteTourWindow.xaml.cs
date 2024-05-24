using System.Windows;

namespace Task1
{
    public partial class DeleteTouristWindow : Window
    {
        public int TourCode { get; private set; }

        public DeleteTouristWindow()
        {
            InitializeComponent();
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (int.TryParse(codeTextBlock.Text, out int id))
            {
                TourCode = id;
                DialogResult = true;
            }
            else
            {
                MessageBox.Show("Пожалуйста, введите правильный код тура.");
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
        }
    }
}
