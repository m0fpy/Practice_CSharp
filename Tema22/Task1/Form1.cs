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
            try
            {
                double argX = double.Parse(textBox1.Text);
                double argY = double.Parse(textBox2.Text);
                double argZ = double.Parse(textBox3.Text);

                double result = Math.Abs(Math.Pow(argX, argY / argX) - Math.Pow(argY / argX, 1.0 / 3)) + (argY - argX) * ((Math.Cos(argY) - (argZ / (argY - argX))) / (1 + Math.Pow(argY - argX, 2)));

                textBox4.Text = result.ToString();
            }
            catch
            {
                MessageBox.Show("Неправильный формат аргументов!");
                return;
            }
        }
    }
}
