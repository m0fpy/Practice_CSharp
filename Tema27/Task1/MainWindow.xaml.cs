using Microsoft.Extensions.Logging;
using Microsoft.Win32;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
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

        private void ButtonFindFlowerType_Click(object sender, RoutedEventArgs e)
        {
            if (IsFileOpened)
            {
                if (!string.IsNullOrEmpty(textBoxFlowerType.Text) || !string.IsNullOrWhiteSpace(textBoxFlowerType.Text))
                {
                    var flower = _worker.FindBy(textBoxFlowerType.Text);

                    if (radioButtonTextBox.IsChecked == true)
                    {
                        PrintFlower(flower);
                    }
                    else if (radioButtonTreeView.IsChecked == true)
                    {
                        PrintFlowerToTreeView(flower);
                    }
                    else if (radioButtonListBox.IsChecked == true)
                    {
                        PrintFlowerToListBox(flower);
                    }
                    textBoxFlowerType.Text = string.Empty;
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

        private void ButtonDelete_Click(object sender, RoutedEventArgs e)
        {
            if (IsFileOpened)
            {
                if (!string.IsNullOrEmpty(textBoxDeleteFlowerType.Text) || !string.IsNullOrWhiteSpace(textBoxDeleteFlowerType.Text))
                {
                    _worker.Delete(textBoxDeleteFlowerType.Text);
                    if (radioButtonTextBox.IsChecked == true)
                    {
                        PrintFlowers(_worker.GetAll());
                    }
                    else if (radioButtonTreeView.IsChecked == true)
                    {
                        PrintFlowersToTreeView(_worker.GetAll());
                    }
                    else if (radioButtonListBox.IsChecked == true)
                    {
                        PrintFlowersToListBox(_worker.GetAll());
                    }
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

        private void ButtonAdd_Click(object sender, RoutedEventArgs e)
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

                    if (radioButtonTextBox.IsChecked == true)
                    {
                        PrintFlowers(_worker.GetAll());
                    }
                    else if (radioButtonTreeView.IsChecked == true)
                    {
                        PrintFlowersToTreeView(_worker.GetAll());
                    }
                    else if (radioButtonListBox.IsChecked == true)
                    {
                        PrintFlowersToListBox(_worker.GetAll());
                    }
                }
            }
            else
            {
                MessageBox.Show("Для начала откройте файл!!!");
            }
        }

        private void ButtonExit_Click(object sender, RoutedEventArgs e)
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
            foreach (var flower in flowers)
            {
                textBlockXMLFileContent.Text += flower.ToString();
            }
        }
        private void PrintFlowerToTreeView(Flower flower)
        {
            treeViewXMLFileContent.Items.Clear();

            if (flower != null)
            {
                TreeViewItem flowerNode = new TreeViewItem();
                flowerNode.Header = "Flower: " + flower.Type;

                TreeViewItem priceNode = new TreeViewItem();
                priceNode.Header = "Price: " + flower.Price;
                flowerNode.Items.Add(priceNode);

                treeViewXMLFileContent.Items.Add(flowerNode);
                flowerNode.IsExpanded = true;
            }
        }

        private void PrintFlowersToTreeView(List<Flower> flowers)
        {
            treeViewXMLFileContent.Items.Clear();

            foreach (var flower in flowers)
            {
                TreeViewItem flowerNode = new TreeViewItem();
                flowerNode.Header = "Flower: " + flower.Type;

                TreeViewItem priceNode = new TreeViewItem();
                priceNode.Header = "Price: " + flower.Price;
                flowerNode.Items.Add(priceNode);

                treeViewXMLFileContent.Items.Add(flowerNode);
                flowerNode.IsExpanded = true;

            }
        }

        private void PrintFlowerToListBox(Flower flower)
        {
            listBoxXMLFileContent.Items.Clear();

            if (flower != null)
            {
                listBoxXMLFileContent.Items.Add("Flower: " + flower.Type + ", Price: " + flower.Price);
            }
        }

        private void PrintFlowersToListBox(List<Flower> flowers)
        {
            listBoxXMLFileContent.Items.Clear();

            foreach (var flower in flowers)
            {
                listBoxXMLFileContent.Items.Add("Flower: " + flower.Type + ", Price: " + flower.Price);
            }
        }



        private void ButtonOpenFile_Click(object sender, RoutedEventArgs e)
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
                if (radioButtonTextBox.IsChecked == true)
                {
                    PrintFlowers(_worker.GetAll());
                }
                else if (radioButtonTreeView.IsChecked == true)
                {
                    PrintFlowersToTreeView(_worker.GetAll());
                }
                else if (radioButtonListBox.IsChecked == true)
                {
                    PrintFlowersToListBox(_worker.GetAll());
                }
            }
        }

        private void RadioButtonChangeViewType(object sender, RoutedEventArgs e)
        {
            if (IsFileOpened)
            {
                if (radioButtonTextBox.IsChecked == true)
                {
                    PrintFlowers(_worker.GetAll());
                }
                else if (radioButtonTreeView.IsChecked == true)
                {
                    PrintFlowersToTreeView(_worker.GetAll());
                }
                else if (radioButtonListBox.IsChecked == true)
                {
                    PrintFlowersToListBox(_worker.GetAll());
                }
            }

            if (radioButtonTextBox.IsChecked == true)
            {
                textBlockXMLFileContent.Visibility = Visibility.Visible;
                treeViewXMLFileContent.Visibility = Visibility.Collapsed;
                listBoxXMLFileContent.Visibility = Visibility.Collapsed;
            }
            else if (radioButtonTreeView.IsChecked == true)
            {
                textBlockXMLFileContent.Visibility = Visibility.Collapsed;
                treeViewXMLFileContent.Visibility = Visibility.Visible;
                listBoxXMLFileContent.Visibility = Visibility.Collapsed;
            }
            else if (radioButtonListBox.IsChecked == true)
            {
                textBlockXMLFileContent.Visibility = Visibility.Collapsed;
                treeViewXMLFileContent.Visibility = Visibility.Collapsed;
                listBoxXMLFileContent.Visibility = Visibility.Visible;
            }
        }
    }
}