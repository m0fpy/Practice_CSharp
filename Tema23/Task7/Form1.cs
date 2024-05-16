namespace Task7
{
    public partial class Form1 : Form
    {
        int[] numbers = new int[23];

        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            listBox1.Items.Clear();

            Random rand = new Random();

            for (int i = 0; i < numbers.Length; i++)

            {
                numbers[i] = rand.Next(-50, 50);
                listBox1.Items.Add("Mas[" + i.ToString() +
                "] = " + numbers[i].ToString());
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            int count = 0;
            int sum = 0;
            double result = 0;

            for (int i = 0; i < numbers.Length; i++)
            {
                if (numbers[i] > 3.5)
                {
                    sum += numbers[i];
                    count++;
                }
            }

            result = sum / count;
            textBox1.Text = result.ToString();
        }
    }
}
