namespace Task1
{
    public partial class Form1 : Form
    {
        Point[] points = new Point[50];
        Pen pen = new Pen(Color.Black, 2);

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            for (int i = 0; i < 20; i++)
            {
                int xPos;
                if(i % 2 == 0)
                {
                    xPos = 10;
                }
                else
                {
                    xPos = 400;
                }
                points[i] = new Point(xPos, 10 * i); 
            }
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.DrawLines(pen, points);

            Point[] trianglePoints = { new Point(100, 250), new Point(50, 350), new Point(150, 350) };
            g.DrawPolygon(Pens.Black, trianglePoints);

            g.DrawEllipse(Pens.Black, 200, 250, 150, 100);

            g.FillEllipse(Brushes.Blue, 400, 250, 100, 100);

            g.FillRectangle(Brushes.Red, 550, 250, 150, 100);

            g.FillPie(Brushes.Green, 700, 250, 100, 100, 0, 45);

            int[] radii = { 40, 30, 20, 10 };
            foreach (int radius in radii)
            {
                g.DrawEllipse(Pens.Black, 100 - radius, 420 - radius, 2 * radius, 2 * radius);
            }

            int size = 30;
            int offset = 20;
            for (int i = 0; i < 5; i++)
            {
                g.DrawRectangle(Pens.Black, 100 + i * offset, 500 + i * offset * 2, size, size * 2);
            }

            int tileSize = 20;
            int rows = 8;
            int cols = 8;
            for (int row = 0; row < rows; row++)
            {
                for (int col = 0; col < cols; col++)
                {
                    if ((row + col) % 2 == 0)
                    {
                        g.FillRectangle(Brushes.Black, 300 + col * tileSize, 500 + row * tileSize, tileSize, tileSize);
                    }
                }
            }
        }
    }
}
