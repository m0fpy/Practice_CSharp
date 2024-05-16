namespace Task6
{
    partial class ParentForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            mdiMenu = new MenuStrip();
            fileMenuItem = new ToolStripMenuItem();
            newMenuItem = new ToolStripMenuItem();
            exitMenuItem = new ToolStripMenuItem();
            windowMenuItem = new ToolStripMenuItem();
            windowCascadeMenuItem = new ToolStripMenuItem();
            windowTileMenuItem = new ToolStripMenuItem();
            mdiMenu.SuspendLayout();
            SuspendLayout();
            // 
            // mdiMenu
            // 
            mdiMenu.ImageScalingSize = new Size(20, 20);
            mdiMenu.Items.AddRange(new ToolStripItem[] { fileMenuItem, windowMenuItem });
            mdiMenu.Location = new Point(0, 0);
            mdiMenu.MdiWindowListItem = windowMenuItem;
            mdiMenu.Name = "mdiMenu";
            mdiMenu.Size = new Size(402, 28);
            mdiMenu.TabIndex = 1;
            mdiMenu.Text = "menuStrip1";
            // 
            // fileMenuItem
            // 
            fileMenuItem.DropDownItems.AddRange(new ToolStripItem[] { newMenuItem, exitMenuItem });
            fileMenuItem.Name = "fileMenuItem";
            fileMenuItem.Size = new Size(46, 24);
            fileMenuItem.Text = "File";
            // 
            // newMenuItem
            // 
            newMenuItem.Name = "newMenuItem";
            newMenuItem.Size = new Size(224, 26);
            newMenuItem.Text = "&New";
            newMenuItem.Click += newMenuItem_Click;
            // 
            // exitMenuItem
            // 
            exitMenuItem.Name = "exitMenuItem";
            exitMenuItem.Size = new Size(122, 26);
            exitMenuItem.Text = "&Exit";
            exitMenuItem.Click += exitMenuItem_Click;
            // 
            // windowMenuItem
            // 
            windowMenuItem.DropDownItems.AddRange(new ToolStripItem[] { windowCascadeMenuItem, windowTileMenuItem });
            windowMenuItem.Name = "windowMenuItem";
            windowMenuItem.Size = new Size(78, 24);
            windowMenuItem.Text = "Window";
            // 
            // windowCascadeMenuItem
            // 
            windowCascadeMenuItem.Name = "windowCascadeMenuItem";
            windowCascadeMenuItem.Size = new Size(224, 26);
            windowCascadeMenuItem.Text = "&Cascade";
            windowCascadeMenuItem.Click += windowCascadeMenuItem_Click;
            // 
            // windowTileMenuItem
            // 
            windowTileMenuItem.Name = "windowTileMenuItem";
            windowTileMenuItem.Size = new Size(224, 26);
            windowTileMenuItem.Text = "&Tile";
            windowTileMenuItem.Click += windowTileMenuItem_Click;
            // 
            // ParentForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(402, 273);
            Controls.Add(mdiMenu);
            IsMdiContainer = true;
            MainMenuStrip = mdiMenu;
            Name = "ParentForm";
            Text = "MdiApplication";
            mdiMenu.ResumeLayout(false);
            mdiMenu.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private MenuStrip mdiMenu;
        private ToolStripMenuItem fileMenuItem;
        private ToolStripMenuItem newMenuItem;
        private ToolStripMenuItem exitMenuItem;
        private ToolStripMenuItem windowMenuItem;
        private ToolStripMenuItem windowCascadeMenuItem;
        private ToolStripMenuItem windowTileMenuItem;
    }
}
