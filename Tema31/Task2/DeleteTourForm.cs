using System;
using System.Windows.Forms;

namespace Task2
{
    public partial class DeleteTourForm : Form
    {
        public string TourCode { get; private set; }

        public DeleteTourForm()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            TourCode = textBox1.Text;
            DialogResult = DialogResult.OK;
            Close();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.Cancel;
            Close();
        }
    }
}
