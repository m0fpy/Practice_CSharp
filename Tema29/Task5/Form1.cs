namespace Task5
{
    public partial class Form1 : Form
    {
        const int DY = -30;

        Bitmap rocket;
        Rectangle rocketRect;

        public Form1()
        {
            InitializeComponent();

            try
            {
                rocket = new Bitmap("rocket.png");
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.ToString(), "Ошибка загрузки изображения", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Close();
                return;
            }
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;

            rocketRect = new Rectangle((ClientSize.Width - rocket.Width) / 2, ClientSize.Height - rocket.Height, rocket.Width, rocket.Height);
        }

        private void BtnLaunch_Click(object sender, EventArgs e)
        {
            timer.Start();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            rocketRect.Y += DY;

            if (rocketRect.Y + rocket.Height < 0)
            {
                timer.Stop();
            }

            Invalidate();
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            e.Graphics.DrawImage(rocket, rocketRect);
        }
    }
}
