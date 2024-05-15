namespace Task3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                double argX0 = double.Parse(textBox1.Text);
                double argXk = double.Parse(textBox2.Text);
                double argDx = double.Parse(textBox3.Text);
                double argA = double.Parse(textBox4.Text);

                richTextBox1.Text = "";

                double x = argX0;

                while (x <= (argXk + argDx / 2))
                {
                    double result = 0.0025 * argA * Math.Pow(x, 3) + Math.Sqrt(x + Math.Pow(Math.E, 0.82));

                    richTextBox1.Text += "x=" + Convert.ToString(x) + "; y=" + Convert.ToString(result) + Environment.NewLine;
                    x += argDx;
                }
            }
            catch 
            {
                MessageBox.Show("Неправильный формат данных!");
            }
        }
    }
}
