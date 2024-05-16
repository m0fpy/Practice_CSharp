namespace Task6
{
    partial class ChildForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            childTextBox = new RichTextBox();
            childWindowMenu = new MenuStrip();
            formatMenuItem = new ToolStripMenuItem();
            toggleMenuItem = new ToolStripMenuItem();
            childWindowMenu.SuspendLayout();
            SuspendLayout();
            // 
            // childTextBox
            // 
            childTextBox.Dock = DockStyle.Fill;
            childTextBox.Location = new Point(0, 28);
            childTextBox.Name = "childTextBox";
            childTextBox.Size = new Size(800, 422);
            childTextBox.TabIndex = 0;
            childTextBox.Text = "";
            // 
            // childWindowMenu
            // 
            childWindowMenu.ImageScalingSize = new Size(20, 20);
            childWindowMenu.Items.AddRange(new ToolStripItem[] { formatMenuItem });
            childWindowMenu.Location = new Point(0, 0);
            childWindowMenu.Name = "childWindowMenu";
            childWindowMenu.Size = new Size(800, 28);
            childWindowMenu.TabIndex = 1;
            childWindowMenu.Text = "menuStrip1";
            // 
            // formatMenuItem
            // 
            formatMenuItem.DropDownItems.AddRange(new ToolStripItem[] { toggleMenuItem });
            formatMenuItem.MergeAction = MergeAction.Insert;
            formatMenuItem.Name = "formatMenuItem";
            formatMenuItem.Size = new Size(70, 24);
            formatMenuItem.Text = "F&ormat";
            // 
            // toggleMenuItem
            // 
            toggleMenuItem.Name = "toggleMenuItem";
            toggleMenuItem.Size = new Size(224, 26);
            toggleMenuItem.Text = "&Toggle Foreground";
            toggleMenuItem.Click += toggleMenuItem_Click;
            // 
            // ChildForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(childTextBox);
            Controls.Add(childWindowMenu);
            MainMenuStrip = childWindowMenu;
            Name = "ChildForm";
            Text = "ChildForm";
            childWindowMenu.ResumeLayout(false);
            childWindowMenu.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private RichTextBox childTextBox;
        private MenuStrip childWindowMenu;
        private ToolStripMenuItem formatMenuItem;
        private ToolStripMenuItem toggleMenuItem;
    }
}