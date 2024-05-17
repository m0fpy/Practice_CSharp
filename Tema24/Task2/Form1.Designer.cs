namespace Task2
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
            userControlTimer1 = new UserControlTimer();
            userControlTimer21 = new UserControlTimer2();
            clickButton1 = new ClickButton();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            SuspendLayout();
            // 
            // userControlTimer1
            // 
            userControlTimer1.Location = new Point(12, 12);
            userControlTimer1.Name = "userControlTimer1";
            userControlTimer1.Size = new Size(120, 54);
            userControlTimer1.TabIndex = 0;
            userControlTimer1.TimeEnabled = true;
            // 
            // userControlTimer21
            // 
            userControlTimer21.Location = new Point(12, 72);
            userControlTimer21.Name = "userControlTimer21";
            userControlTimer21.Size = new Size(120, 46);
            userControlTimer21.TabIndex = 1;
            // 
            // clickButton1
            // 
            clickButton1.Location = new Point(12, 135);
            clickButton1.Name = "clickButton1";
            clickButton1.Size = new Size(190, 46);
            clickButton1.TabIndex = 2;
            clickButton1.Text = "Кнопка";
            clickButton1.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(138, 21);
            label1.Name = "label1";
            label1.Size = new Size(380, 32);
            label1.TabIndex = 3;
            label1.Text = "- составной элемент управления";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(138, 72);
            label2.Name = "label2";
            label2.Size = new Size(509, 32);
            label2.TabIndex = 4;
            label2.Text = "- специализированный элемент управления";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(208, 142);
            label3.Name = "label3";
            label3.Size = new Size(423, 32);
            label3.TabIndex = 5;
            label3.Text = "- расширенный элемент управления";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(13F, 32F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(clickButton1);
            Controls.Add(userControlTimer21);
            Controls.Add(userControlTimer1);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private UserControlTimer userControlTimer1;
        private UserControlTimer2 userControlTimer21;
        private ClickButton clickButton1;
        private Label label1;
        private Label label2;
        private Label label3;
    }
}
