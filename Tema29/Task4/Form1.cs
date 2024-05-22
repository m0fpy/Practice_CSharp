namespace Task4
{
    public partial class Form1 : Form
    {
        Bitmap sky, plane;
        Graphics g;
        int dx;

        Rectangle rct;

        bool demo = true;

        Random rnd;

        public Form1()
        {
            InitializeComponent();

            try
            {
                sky = new Bitmap("sky.bmp");
                plane = new Bitmap("plane.bmp");
                BackgroundImage = new Bitmap("sky.bmp");
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.ToString(), "Полет",  MessageBoxButtons.OK, MessageBoxIcon.Error);
                Close();
                return;
            }

            plane.MakeTransparent();

            ClientSize = new Size(new Point(BackgroundImage.Width, BackgroundImage.Height));

            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;

            g = Graphics.FromImage(BackgroundImage);

            rnd = new Random();

            rct.X = -40;
            rct.Y = 20 + rnd.Next(20);

            rct.Width = plane.Width;
            rct.Height = plane.Height;

            dx = 2;

            timer2.Interval = 20;
            timer2.Enabled = true;
        }

        private void timer2_Tick(object sender, EventArgs e)
        {

            g.DrawImage(sky, new Point(0, 0));

            if (rct.X < ClientRectangle.Width)
                rct.X += dx;
            else
            {
                rct.X = -40;
                rct.Y = 20 + rnd.Next(ClientSize.Height - 40 - plane.Height);

                dx = 2 + rnd.Next(4);
            }

            g.DrawImage(plane, rct.X, rct.Y);

            if (!demo)
            {
                Invalidate(rct);
            }
            else
            {
                Rectangle reg = new Rectangle(0, 0, sky.Width, sky.Height);
                g.DrawRectangle(Pens.Black, reg.X, reg.Y, reg.Width - 1, reg.Height - 1);
                Invalidate(reg);
            }
        }
    }
}

