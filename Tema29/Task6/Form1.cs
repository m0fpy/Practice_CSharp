namespace Task6
{
    public partial class Form1 : Form
    {
        float angle = 0;
        float speed = 2f;
        float amplitude = 100;
        float frequency = 0.05f;
        int circleRadius = 20;

        public Form1()
        {
            InitializeComponent();

            ClientSize = new Size(800, 400);
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            angle += speed;

            Invalidate();
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;

            float x = angle;
            float y = (float)(Math.Sin(angle * frequency) * amplitude + ClientSize.Height / 2);

            g.Clear(BackColor);
            g.FillEllipse(Brushes.Blue, x - circleRadius, y - circleRadius, circleRadius * 2, circleRadius * 2);
        }
    }
}
