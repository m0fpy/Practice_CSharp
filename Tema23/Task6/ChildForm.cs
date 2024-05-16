namespace Task6
{
    public partial class ChildForm : Form
    {
        public ChildForm()
        {
            InitializeComponent();
        }

        private void toggleMenuItem_Click(object sender, EventArgs e)
        {
            if(toggleMenuItem.Checked )
            {
                toggleMenuItem.Checked = false;
                childTextBox.ForeColor = Color.Black;
            }
            else
            {
                toggleMenuItem.Checked = true;
                childTextBox.ForeColor = Color.Blue;
            }
        }
    }
}
