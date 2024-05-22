namespace Task2
{
    public partial class Form1 : Form
    {
        Graphics g;
        Bitmap baner;
        Rectangle rct;

        public Form1()
        {
            InitializeComponent();
            try
            {
                baner = new Bitmap("baner.png");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Ошибка загрузки файла баннера\n " + ex.ToString(), "Баннер");
                Close();
                return;
            }

            rct.X = 0;
            rct.Y = 0;
            rct.Width = baner.Width * 2;
            rct.Height = baner.Height;

            timer1.Interval = 50;
            timer1.Enabled = true;
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            g = e.Graphics;
            for (int i = 0; i < Convert.ToInt16(ClientSize.Width / rct.Width) + 1; i++)
            {
                g.DrawImage(baner, rct.X + i * rct.Width, rct.Y);
            }
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            rct.X -= 1;
            if (Math.Abs(rct.X) > rct.Width)
            {
                rct.X += rct.Width;
            }
            Invalidate();
        }

        private void Form1_MouseMove(object sender, MouseEventArgs e)
        {
            if((e.Y < rct.Y + rct.Height) && (e.Y > rct.Y)) 
            {
                if(timer1.Enabled != false)
                {
                    timer1.Enabled = false;
                }
            }
            else
            {
                if(timer1.Enabled != true)
                {
                    timer1.Enabled = true;
                }
            }
        }
    }
}
