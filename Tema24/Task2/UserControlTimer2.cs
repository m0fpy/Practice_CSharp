namespace Task2
{
    public partial class UserControlTimer2 : UserControl
    {
        public UserControlTimer2()
        {
            InitializeComponent();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            Refresh();
        }

        protected override void OnPaint(PaintEventArgs pe)
        {
            base.OnPaint(pe);
            Graphics g = pe.Graphics;
            g.FillRectangle(Brushes.Blue, 0, 0, Width, Height);
            pe.Graphics.DrawString(DateTime.Now.ToLongTimeString(), Font, new SolidBrush(ForeColor), 0, 0);
        }
    }
}
