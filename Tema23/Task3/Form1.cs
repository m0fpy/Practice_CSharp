namespace Task3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.BackColor = Color.LightBlue;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            Graphics g = e.Graphics;

            Pen pen = new Pen(Color.Black, 2f);
            Brush brush = new SolidBrush(Color.Orange);

            g.FillEllipse(brush, new Rectangle(100, 100, 150, 80));

            Point[] tailPoints = { new Point(240, 140), new Point(300, 100), new Point(300, 180) };
            g.FillPolygon(brush, tailPoints);

            Point[] fin1Point = { new Point(130, 160), new Point(230, 160), new Point(180, 210) };
            g.FillPolygon(brush, fin1Point);

            Point[] fin2Point = { new Point(130, 120), new Point(230, 120), new Point(180, 70) };
            g.FillPolygon(brush, fin2Point);

            g.FillEllipse(Brushes.Black, new Rectangle(120, 130, 20, 20));

            pen.Dispose();
            brush.Dispose();
        }
    }
}
