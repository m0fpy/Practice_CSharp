using System.Windows;

namespace Task1
{
    /// <summary>
    /// Логика взаимодействия для About.xaml
    /// </summary>
    public partial class About : Window
    {
        public About()
        {
            InitializeComponent();
            buttonClose.Click += ButtonClose_Click;
        }

        public About(string appInfo) : this()
        {
            textBlockInfo.Text = appInfo;
        }

        private void ButtonClose_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
