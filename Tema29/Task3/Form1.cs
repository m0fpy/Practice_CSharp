namespace Task3
{
    public partial class Form1 : Form
    {
        private int x1, y1, x2, y2;
        private double a, t, fi;
        private Pen pen = new Pen(Color.DarkBlue, 2);

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            x1 = ClientSize.Width / 2;
            y1 = ClientSize.Height / 2;
            a = 150;
            fi = -0.5;
            t = Math.Tan(fi);
            x2 = x1 + (int)((3 * a * t) / (1 + Math.Pow(t, 3)));
            y2 = y1 + (int)(3 * a * t * t / (1 + Math.Pow(t, 3)));
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            Graphics graphics = e.Graphics;
            graphics.DrawEllipse(pen, x2, y2, 20, 20);
        }

        private void timer1_tick(object sender, EventArgs e)
        {
            fi += 0.1;
            t = Math.Tan(fi);

            x2 = x1 + (int)((3 * a * t) / (1 + Math.Pow(t, 3)));
            y2 = y1 + (int)(3 * a * t * t / (1 + Math.Pow(t, 3)));
            Invalidate();
        }
    }
}
