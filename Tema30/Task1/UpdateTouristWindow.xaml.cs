using System.Windows;

namespace Task1
{
    public partial class UpdateTouristWindow : Window
    {
        public int TouristCode { get; private set; }
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public string MiddleName { get; private set; }

        public UpdateTouristWindow()
        {
            InitializeComponent();
        }

        private void OkButton_Click(object sender, RoutedEventArgs e)
        {
            if (int.TryParse(touristCodeTextBlock.Text, out int id) &&
                !string.IsNullOrEmpty(nameTextBlock.Text) &&
                !string.IsNullOrEmpty(surnameTextBlock.Text) &&
                !string.IsNullOrEmpty(middleNameTextBlock.Text))
            {
                TouristCode = id;
                Name = nameTextBlock.Text;
                Surname = surnameTextBlock.Text;
                MiddleName = middleNameTextBlock.Text;
                DialogResult = true;
            }
            else
            {
                MessageBox.Show("Пожалуйста, введите правильные данные.");
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
        }
    }
}
