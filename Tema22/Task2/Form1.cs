namespace Task2
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
                double argP = double.Parse(textBox1.Text);
                double argX = double.Parse(textBox3.Text);

                double functionResult;

                if (radioButton1.Checked)
                {
                    functionResult = Math.Sin(argX);
                }
                else if (radioButton2.Checked)
                {
                    functionResult = Math.Pow(argX, 2);
                }
                else if (radioButton3.Checked)
                {
                    functionResult = Math.Pow(Math.E, argX);
                }
                else
                {
                    MessageBox.Show("Выберите функцию");
                    return;
                }

                double result = 0;

                if (argX > Math.Abs(argP))
                {
                    result = 2 * Math.Pow(functionResult, 3) + 3 * Math.Pow(argP, 2);
                }
                else if (argX > 3 && argX < Math.Abs(argP))
                {
                    result = Math.Abs(functionResult - argP);
                }
                else if (argX == Math.Abs(argP))
                {
                    result = Math.Pow(Math.Abs(functionResult - argP), 2);
                }

                richTextBox1.Text += Convert.ToString(result) + Environment.NewLine;
            }
            catch
            {
                MessageBox.Show("Некорректные данные");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            richTextBox1.Clear();
        }
    }
}
