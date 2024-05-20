using Microsoft.Extensions.Logging;
using Microsoft.Win32;
using System.IO;
using System.Windows;
using Task1.Interfaces;
using Task1.Models;
using Task1.Share;

namespace Task1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly IXmlWorker _worker;
        private readonly ILogger _logger;
        public bool IsFileOpened = false;
        private string _xmlFilePath;

        public MainWindow()
        {
            InitializeComponent();
            _logger = LoggerFactory.Create(builder => builder.SetMinimumLevel(LogLevel.Information)).CreateLogger<MainWindow>();
            _worker = new XmlDocumentWorker(_logger);
        }

        private void buttonFindFlowerType_Click(object sender, RoutedEventArgs e)
        {
            if(IsFileOpened)
            {
                if (!string.IsNullOrEmpty(textBoxFlowerType.Text) || !string.IsNullOrWhiteSpace(textBoxFlowerType.Text))
                {
                    var flower = _worker.FindBy(textBoxFlowerType.Text);
                    PrintFlower(flower);
                }
                else
                {
                    MessageBox.Show("Введите название цветка для поиска!!!");
                }
            }
            else
            {
                MessageBox.Show("Для начала откройте файл!!!");
            }
        }

        private void buttonDelete_Click(object sender, RoutedEventArgs e)
        {
            if (IsFileOpened)
            {
                if (!string.IsNullOrEmpty(textBoxDeleteFlowerType.Text) || !string.IsNullOrWhiteSpace(textBoxDeleteFlowerType.Text))
                {
                    _worker.Delete(textBoxDeleteFlowerType.Text);
                    PrintFlowers(_worker.GetAll());
                }
                else
                {
                    MessageBox.Show("Введите название цветка для удаления!!!");
                }
            }
            else
            {
                MessageBox.Show("Для начала откройте файл!!!");
            }
        }

        private void buttonAdd_Click(object sender, RoutedEventArgs e)
        {
            if (IsFileOpened)
            {
                var addFlowerForm = new AddFlowerWindow();

                var result = addFlowerForm.ShowDialog();

                if (result.HasValue && result.Value)
                {
                    var newFlowerType = addFlowerForm.textBoxFlowerType.Text;
                    var newFlowerPrice = double.Parse(addFlowerForm.textBoxFlowerPrice.Text);

                    var newFlower = new Flower { Type = newFlowerType, Price = newFlowerPrice };

                    _worker.Add(newFlower);

                    PrintFlowers(_worker.GetAll());
                }
            }
            else
            {
                MessageBox.Show("Для начала откройте файл!!!");
            }
        }

        private void buttonExit_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void PrintFlower(Flower flower)
        {
            textBlockXMLFileContent.Text = "======Flower======" + Environment.NewLine;
            textBlockXMLFileContent.Text += flower?.ToString() ?? "Flower not found";
        }

        private void PrintFlowers(List<Flower> flowers)
        {
            textBlockXMLFileContent.Text = "======Flowers======" + Environment.NewLine;
            foreach(var flower in flowers)
            {
                textBlockXMLFileContent.Text += flower.ToString();
            }
        }

        private void buttonOpenFile_Click(object sender, RoutedEventArgs e)
        {
            var dialog = new OpenFileDialog();

            dialog.InitialDirectory = Directory.GetParent(AppContext.BaseDirectory).Parent.Parent.FullName;
            dialog.DefaultExt = ".xml";
            dialog.Filter = "Xml documents (.xml)|*.xml";
            var result = dialog.ShowDialog();
            if (result.HasValue && result.Value)
            {
                _xmlFilePath = dialog.FileName;
                textBlockXMLPathFile.Text = _xmlFilePath;
                _worker.Load(_xmlFilePath);
                IsFileOpened = true;
                PrintFlowers(_worker.GetAll());
            }
        }
    }
}