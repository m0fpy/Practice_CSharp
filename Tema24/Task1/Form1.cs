namespace Task6
{
    public partial class ParentForm : Form
    {
        private int openDocs = 0;

        public ParentForm()
        {
            InitializeComponent();
            spData.Text = Convert.ToString(DateTime.Today.ToLongDateString());
        }

        private void exitMenuItem_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void windowCascadeMenuItem_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.Cascade);
            spWin.Text = "Window is Cascade";
        }

        private void windowTileMenuItem_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.TileHorizontal);
            spWin.Text = "Window is TileHorizontal";
        }

        private void newMenuItem_Click(object sender, EventArgs e)
        {
            ChildForm childForm = new ChildForm();
            childForm.MdiParent = this;
            childForm.Text = childForm.Text + " " + ++openDocs;
            childForm.Show();
        }

        private void toolStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {
            switch (e.ClickedItem.Tag.ToString())
            {
                case "NewDoc":
                    ChildForm newChild = new ChildForm();
                    newChild.MdiParent = this;
                    newChild.Show();
                    newChild.Text = newChild.Text + " " +
                    ++openDocs;
                    break;
                case "Cascade":
                    this.LayoutMdi(MdiLayout.Cascade);
                    spWin.Text = "Window is Cascade";
                    break;
                case "Title":
                    this.LayoutMdi
                    (MdiLayout.TileHorizontal);
                    spWin.Text = "Window is TileHorizontal";
                    break;
            }
        }
    }
}
