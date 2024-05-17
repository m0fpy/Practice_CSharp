namespace Task3
{
    partial class Form1
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
            expandableRichTextBox1 = new ExpandableRichTextBox();
            SuspendLayout();
            // 
            // expandableRichTextBox1
            // 
            expandableRichTextBox1.CollapsedHeight = 100;
            expandableRichTextBox1.ExpandedHeight = 361;
            expandableRichTextBox1.Location = new Point(34, 50);
            expandableRichTextBox1.Name = "expandableRichTextBox1";
            expandableRichTextBox1.Size = new Size(838, 766);
            expandableRichTextBox1.TabIndex = 0;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(13F, 32F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(902, 871);
            Controls.Add(expandableRichTextBox1);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
        }

        #endregion

        private ExpandableRichTextBox expandableRichTextBox1;
    }
}
