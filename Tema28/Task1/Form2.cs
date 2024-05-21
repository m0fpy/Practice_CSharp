using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Task1
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        private void Form2_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;

            SolidBrush skyBrush = new SolidBrush(Color.SkyBlue);
            g.FillRectangle(skyBrush, 0, 0, this.Width, this.Height / 2);

            SolidBrush sunBrush = new SolidBrush(Color.Yellow);
            g.FillEllipse(sunBrush, 600, 50, 100, 100);

            SolidBrush cloudBrush = new SolidBrush(Color.White);
            g.FillEllipse(cloudBrush, 100, 50, 150, 80);
            g.FillEllipse(cloudBrush, 200, 70, 200, 90);
            g.FillEllipse(cloudBrush, 400, 30, 180, 70);

            SolidBrush grassBrush = new SolidBrush(Color.Green);
            g.FillRectangle(grassBrush, 0, this.Height / 2, this.Width, this.Height / 2);

            SolidBrush houseBrush = new SolidBrush(Color.Brown);
            g.FillRectangle(houseBrush, 200, 300, 200, 150);
            g.DrawRectangle(Pens.Black, 200, 300, 200, 150);

            Point[] roofPoints = { new Point(200, 300), new Point(300, 200), new Point(400, 300) };
            SolidBrush roofBrush = new SolidBrush(Color.DarkRed);
            g.FillPolygon(roofBrush, roofPoints);
            g.DrawPolygon(Pens.Black, roofPoints);

            SolidBrush windowBrush = new SolidBrush(Color.LightBlue);
            g.FillRectangle(windowBrush, 230, 330, 50, 50);
            g.DrawRectangle(Pens.Black, 230, 330, 50, 50);
            g.FillRectangle(windowBrush, 320, 330, 50, 50);
            g.DrawRectangle(Pens.Black, 320, 330, 50, 50);

            SolidBrush doorBrush = new SolidBrush(Color.RosyBrown);
            g.FillRectangle(doorBrush, 280, 380, 40, 70);
            g.DrawRectangle(Pens.Black, 280, 380, 40, 70);

            SolidBrush trunkBrush = new SolidBrush(Color.SaddleBrown);
            g.FillRectangle(trunkBrush, 500, 350, 20, 100);
            g.DrawRectangle(Pens.Black, 500, 350, 20, 100);

            SolidBrush foliageBrush = new SolidBrush(Color.ForestGreen);
            g.FillEllipse(foliageBrush, 460, 270, 100, 100);
            g.DrawEllipse(Pens.Black, 460, 270, 100, 100);

            SolidBrush pathBrush = new SolidBrush(Color.Gray);
            Point[] pathPoints = { new Point(300, 450), new Point(340, 450), new Point(370, 600), new Point(270, 600) };
            g.FillPolygon(pathBrush, pathPoints);
            g.DrawPolygon(Pens.Black, pathPoints);
        }
    }
}
