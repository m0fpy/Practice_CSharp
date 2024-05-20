using System.Windows;


namespace Task1
{
    /// <summary>
    /// Логика взаимодействия для AddFlowerWindow.xaml
    /// </summary>
    public partial class AddFlowerWindow : Window
    {
        public string FlowerType { get; private set; }
        public double FlowerPrice { get; private set; }

        public AddFlowerWindow()
        {
            InitializeComponent();
        }

        private void buttonAdd_Click(object sender, RoutedEventArgs e)
        {
            FlowerType = textBoxFlowerType.Text;
            FlowerPrice = double.Parse(textBoxFlowerPrice.Text);
            DialogResult = true;
            Close();
        }
    }
}
