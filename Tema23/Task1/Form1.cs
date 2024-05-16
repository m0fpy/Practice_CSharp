namespace Task1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            int index = listBox1.SelectedIndex;
            string str = (string)listBox1.Items[index];
            int len = str.Length;


            int count = 0;
            int i = 0;
            while (i < len)
            {
                if (str[i] == ' ')
                    count++;
                i++;
            }
            label1.Text = "Количество пробелов = " +
            count.ToString();
        }
    }
}
