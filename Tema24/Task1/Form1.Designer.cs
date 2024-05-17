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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ParentForm));
            mdiMenu = new MenuStrip();
            fileMenuItem = new ToolStripMenuItem();
            newMenuItem = new ToolStripMenuItem();
            exitMenuItem = new ToolStripMenuItem();
            windowMenuItem = new ToolStripMenuItem();
            windowCascadeMenuItem = new ToolStripMenuItem();
            windowTileMenuItem = new ToolStripMenuItem();
            toolStrip1 = new ToolStrip();
            toolStripButton1 = new ToolStripButton();
            toolStripSeparator1 = new ToolStripSeparator();
            toolStripButton2 = new ToolStripButton();
            toolStripButton3 = new ToolStripButton();
            statusStrip1 = new StatusStrip();
            spWin = new ToolStripStatusLabel();
            spData = new ToolStripStatusLabel();
            mdiMenu.SuspendLayout();
            toolStrip1.SuspendLayout();
            statusStrip1.SuspendLayout();
            SuspendLayout();
            // 
            // mdiMenu
            // 
            mdiMenu.ImageScalingSize = new Size(20, 20);
            mdiMenu.Items.AddRange(new ToolStripItem[] { fileMenuItem, windowMenuItem });
            mdiMenu.Location = new Point(0, 0);
            mdiMenu.MdiWindowListItem = windowMenuItem;
            mdiMenu.Name = "mdiMenu";
            mdiMenu.Padding = new Padding(10, 3, 0, 3);
            mdiMenu.Size = new Size(653, 42);
            mdiMenu.TabIndex = 1;
            mdiMenu.Text = "menuStrip1";
            // 
            // fileMenuItem
            // 
            fileMenuItem.DropDownItems.AddRange(new ToolStripItem[] { newMenuItem, exitMenuItem });
            fileMenuItem.Name = "fileMenuItem";
            fileMenuItem.Size = new Size(71, 36);
            fileMenuItem.Text = "File";
            // 
            // newMenuItem
            // 
            newMenuItem.Name = "newMenuItem";
            newMenuItem.Size = new Size(195, 44);
            newMenuItem.Text = "&New";
            newMenuItem.Click += newMenuItem_Click;
            // 
            // exitMenuItem
            // 
            exitMenuItem.Name = "exitMenuItem";
            exitMenuItem.Size = new Size(195, 44);
            exitMenuItem.Text = "&Exit";
            exitMenuItem.Click += exitMenuItem_Click;
            // 
            // windowMenuItem
            // 
            windowMenuItem.DropDownItems.AddRange(new ToolStripItem[] { windowCascadeMenuItem, windowTileMenuItem });
            windowMenuItem.Name = "windowMenuItem";
            windowMenuItem.Size = new Size(121, 36);
            windowMenuItem.Text = "Window";
            // 
            // windowCascadeMenuItem
            // 
            windowCascadeMenuItem.Name = "windowCascadeMenuItem";
            windowCascadeMenuItem.Size = new Size(234, 44);
            windowCascadeMenuItem.Text = "&Cascade";
            windowCascadeMenuItem.Click += windowCascadeMenuItem_Click;
            // 
            // windowTileMenuItem
            // 
            windowTileMenuItem.Name = "windowTileMenuItem";
            windowTileMenuItem.Size = new Size(234, 44);
            windowTileMenuItem.Text = "&Tile";
            windowTileMenuItem.Click += windowTileMenuItem_Click;
            // 
            // toolStrip1
            // 
            toolStrip1.ImageScalingSize = new Size(32, 32);
            toolStrip1.Items.AddRange(new ToolStripItem[] { toolStripButton1, toolStripSeparator1, toolStripButton2, toolStripButton3 });
            toolStrip1.Location = new Point(0, 42);
            toolStrip1.Name = "toolStrip1";
            toolStrip1.Size = new Size(653, 42);
            toolStrip1.TabIndex = 3;
            toolStrip1.Text = "toolStrip1";
            toolStrip1.ItemClicked += toolStrip1_ItemClicked;
            // 
            // toolStripButton1
            // 
            toolStripButton1.DisplayStyle = ToolStripItemDisplayStyle.Image;
            toolStripButton1.Image = (Image)resources.GetObject("toolStripButton1.Image");
            toolStripButton1.ImageTransparentColor = Color.Magenta;
            toolStripButton1.Name = "toolStripButton1";
            toolStripButton1.Size = new Size(46, 36);
            toolStripButton1.Tag = "NewDoc";
            toolStripButton1.Text = "toolStripButton1";
            toolStripButton1.ToolTipText = "Create new document";
            // 
            // toolStripSeparator1
            // 
            toolStripSeparator1.Name = "toolStripSeparator1";
            toolStripSeparator1.Size = new Size(6, 42);
            // 
            // toolStripButton2
            // 
            toolStripButton2.DisplayStyle = ToolStripItemDisplayStyle.Image;
            toolStripButton2.Image = (Image)resources.GetObject("toolStripButton2.Image");
            toolStripButton2.ImageTransparentColor = Color.Magenta;
            toolStripButton2.Name = "toolStripButton2";
            toolStripButton2.Size = new Size(46, 36);
            toolStripButton2.Tag = "Cascade";
            toolStripButton2.Text = "toolStripButton2";
            toolStripButton2.ToolTipText = "Window cascade";
            // 
            // toolStripButton3
            // 
            toolStripButton3.DisplayStyle = ToolStripItemDisplayStyle.Image;
            toolStripButton3.Image = (Image)resources.GetObject("toolStripButton3.Image");
            toolStripButton3.ImageTransparentColor = Color.Magenta;
            toolStripButton3.Name = "toolStripButton3";
            toolStripButton3.Size = new Size(46, 36);
            toolStripButton3.Tag = "Title";
            toolStripButton3.Text = "toolStripButton3";
            toolStripButton3.ToolTipText = "window tile";
            // 
            // statusStrip1
            // 
            statusStrip1.ImageScalingSize = new Size(32, 32);
            statusStrip1.Items.AddRange(new ToolStripItem[] { spWin, spData });
            statusStrip1.Location = new Point(0, 395);
            statusStrip1.Name = "statusStrip1";
            statusStrip1.Size = new Size(653, 42);
            statusStrip1.TabIndex = 5;
            statusStrip1.Text = "statusStrip1";
            // 
            // spWin
            // 
            spWin.Name = "spWin";
            spWin.Size = new Size(78, 32);
            spWin.Text = "Status";
            // 
            // spData
            // 
            spData.Name = "spData";
            spData.Size = new Size(63, 32);
            spData.Text = "Data";
            // 
            // ParentForm
            // 
            AutoScaleDimensions = new SizeF(13F, 32F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(653, 437);
            Controls.Add(statusStrip1);
            Controls.Add(toolStrip1);
            Controls.Add(mdiMenu);
            IsMdiContainer = true;
            MainMenuStrip = mdiMenu;
            Margin = new Padding(5);
            Name = "ParentForm";
            Text = "MdiApplication";
            mdiMenu.ResumeLayout(false);
            mdiMenu.PerformLayout();
            toolStrip1.ResumeLayout(false);
            toolStrip1.PerformLayout();
            statusStrip1.ResumeLayout(false);
            statusStrip1.PerformLayout();
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
        private ToolStrip toolStrip1;
        private ToolStripButton toolStripButton1;
        private ToolStripSeparator toolStripSeparator1;
        private ToolStripButton toolStripButton2;
        private ToolStripButton toolStripButton3;
        private StatusStrip statusStrip1;
        private ToolStripStatusLabel spWin;
        private ToolStripStatusLabel spData;
    }
}
