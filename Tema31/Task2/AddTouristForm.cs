using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace Task2
{

    public partial class AddTouristForm : Form
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string MiddleName { get; private set; }

        public AddTouristForm()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            LastName = textBox1.Text;
            FirstName = textBox2.Text;
            MiddleName = textBox3.Text;

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
