namespace Task3
{
    partial class ExpandableRichTextBox
    {
        /// <summary> 
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором компонентов

        /// <summary> 
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            richTextBox = new RichTextBox();
            toggleButton = new Button();
            SuspendLayout();
            // 
            // richTextBox
            // 
            richTextBox.Dock = DockStyle.Fill;
            richTextBox.Location = new Point(0, 0);
            richTextBox.Name = "richTextBox";
            richTextBox.Size = new Size(150, 150);
            richTextBox.TabIndex = 0;
            richTextBox.Text = "";
            // 
            // toggleButton
            // 
            toggleButton.Dock = DockStyle.Bottom;
            toggleButton.Location = new Point(0, 104);
            toggleButton.Name = "toggleButton";
            toggleButton.Size = new Size(150, 46);
            toggleButton.TabIndex = 1;
            toggleButton.Text = "Свернуть";
            toggleButton.UseVisualStyleBackColor = true;
            toggleButton.Click += ToggleButton_Click;
            // 
            // ExpandableRichTextBox
            // 
            this.Controls.Add(this.toggleButton);
            this.Controls.Add(this.richTextBox);
            this.Name = "ExpandableRichTextBox";
            this.ResumeLayout(false);
        }

        #endregion

        private RichTextBox richTextBox;
        private Button toggleButton;
    }
}
