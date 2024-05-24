using System.Windows;

namespace Task1
{
    public partial class AddTouristWindow : Window
    {
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public string MiddleName { get; private set; }

        public AddTouristWindow()
        {
            InitializeComponent();
        }

        private void OkButton_Click(object sender, RoutedEventArgs e)
        {
            Name = nameTextBlock.Text;
            Surname = surnameTextBlock.Text;
            MiddleName = middleNameTextBlock.Text;

            if (string.IsNullOrEmpty(Name) || string.IsNullOrEmpty(Surname) || string.IsNullOrEmpty(MiddleName))
            {
                MessageBox.Show("Заполните все поля");
                return;
            }

            DialogResult = true;
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
        }
    }
}
