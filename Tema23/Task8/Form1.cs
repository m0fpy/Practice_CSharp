namespace Task8
{
    public partial class Form1 : Form
    {
        int[,] numbers = new int[7, 7];


        public Form1()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            dataGridView1.RowCount = 7;
            dataGridView1.ColumnCount = 7;
            int i, j;

            Random rand = new Random();
            for (i = 0; i < 7; i++)
            {
                for (j = 0; j < 7; j++)
                {
                    numbers[i, j] = rand.Next(-100, 100);
                }
            }

            for (i = 0; i < 7; i++)
            {
                for (j = 0; j < 7; j++)
                {
                    dataGridView1.Rows[i].Cells[j].Value = numbers[i, j].ToString();
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            listBox1.Items.Clear();

            int rows = numbers.GetLength(0);
            int columns = numbers.GetLength(1);

            for (int j = 0; j < columns; j++)
            {
                int minElement = numbers[0, j];

                for (int i = 1; i < rows; i++)
                {
                    if (numbers[i, j] < minElement)
                    {
                        minElement = numbers[i, j];
                    }
                }

                listBox1.Items.Add($"Столбец {j + 1} - {minElement}");
            }
        }
    }
}
