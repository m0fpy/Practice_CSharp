namespace Task4
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
            SurnameLabel = new Label();
            NameLabel = new Label();
            MiddleNameLabel = new Label();
            SurnameTextBox = new TextBox();
            NameTextBox = new TextBox();
            MiddleNameTextBox = new TextBox();
            SexGroupBox = new GroupBox();
            FemaleRadioButton = new RadioButton();
            MaleRadioButton = new RadioButton();
            BirthDateGroupBox = new GroupBox();
            DateBirtPicker = new DateTimePicker();
            LocationLabel = new Label();
            EMailLabel = new Label();
            emailTextBox = new TextBox();
            LocationTextBox = new ComboBox();
            phoneLabel = new Label();
            operatorBox = new ComboBox();
            phoneBox = new TextBox();
            workExpGroupBox = new GroupBox();
            From5To9RB = new RadioButton();
            LessThen1RB = new RadioButton();
            MoreThen10RB = new RadioButton();
            From1To5RB = new RadioButton();
            NoWorkRB = new RadioButton();
            OthersGroupBox = new GroupBox();
            categoryD = new CheckBox();
            categoryC = new CheckBox();
            categoryB = new CheckBox();
            categoryA = new CheckBox();
            driveCategory = new Label();
            driveLicense = new CheckBox();
            haveAuto = new CheckBox();
            salaryGroupBox = new GroupBox();
            ToLabel = new Label();
            FromLabel = new Label();
            ToSalary = new NumericUpDown();
            FromSalary = new NumericUpDown();
            workTimeGroupBox = new GroupBox();
            TimeWorkRB = new RadioButton();
            WorkAtHomeRB = new RadioButton();
            PartTimeRB = new RadioButton();
            FullTimeRB = new RadioButton();
            CVtextBox = new RichTextBox();
            CVLabel = new Label();
            SaveButton = new Button();
            ClearButton = new Button();
            CancelButton = new Button();
            backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            SexGroupBox.SuspendLayout();
            BirthDateGroupBox.SuspendLayout();
            workExpGroupBox.SuspendLayout();
            OthersGroupBox.SuspendLayout();
            salaryGroupBox.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ToSalary).BeginInit();
            ((System.ComponentModel.ISupportInitialize)FromSalary).BeginInit();
            workTimeGroupBox.SuspendLayout();
            SuspendLayout();
            // 
            // SurnameLabel
            // 
            SurnameLabel.AutoSize = true;
            SurnameLabel.Location = new Point(22, 20);
            SurnameLabel.Name = "SurnameLabel";
            SurnameLabel.Size = new Size(76, 20);
            SurnameLabel.TabIndex = 0;
            SurnameLabel.Text = "Фамилия:";
            // 
            // NameLabel
            // 
            NameLabel.AutoSize = true;
            NameLabel.Location = new Point(55, 56);
            NameLabel.Name = "NameLabel";
            NameLabel.Size = new Size(42, 20);
            NameLabel.TabIndex = 1;
            NameLabel.Text = "Имя:";
            // 
            // MiddleNameLabel
            // 
            MiddleNameLabel.AutoSize = true;
            MiddleNameLabel.Location = new Point(23, 89);
            MiddleNameLabel.Name = "MiddleNameLabel";
            MiddleNameLabel.Size = new Size(75, 20);
            MiddleNameLabel.TabIndex = 2;
            MiddleNameLabel.Text = "Отчество:";
            // 
            // SurnameTextBox
            // 
            SurnameTextBox.Location = new Point(104, 17);
            SurnameTextBox.Name = "SurnameTextBox";
            SurnameTextBox.Size = new Size(260, 27);
            SurnameTextBox.TabIndex = 3;
            // 
            // NameTextBox
            // 
            NameTextBox.Location = new Point(103, 53);
            NameTextBox.Name = "NameTextBox";
            NameTextBox.Size = new Size(261, 27);
            NameTextBox.TabIndex = 4;
            // 
            // MiddleNameTextBox
            // 
            MiddleNameTextBox.Location = new Point(103, 86);
            MiddleNameTextBox.Name = "MiddleNameTextBox";
            MiddleNameTextBox.Size = new Size(261, 27);
            MiddleNameTextBox.TabIndex = 5;
            // 
            // SexGroupBox
            // 
            SexGroupBox.Controls.Add(FemaleRadioButton);
            SexGroupBox.Controls.Add(MaleRadioButton);
            SexGroupBox.Location = new Point(383, 20);
            SexGroupBox.Name = "SexGroupBox";
            SexGroupBox.Size = new Size(131, 93);
            SexGroupBox.TabIndex = 6;
            SexGroupBox.TabStop = false;
            SexGroupBox.Text = "Пол:";
            // 
            // FemaleRadioButton
            // 
            FemaleRadioButton.AutoSize = true;
            FemaleRadioButton.Location = new Point(15, 57);
            FemaleRadioButton.Name = "FemaleRadioButton";
            FemaleRadioButton.Size = new Size(89, 24);
            FemaleRadioButton.TabIndex = 1;
            FemaleRadioButton.TabStop = true;
            FemaleRadioButton.Text = "Женский";
            FemaleRadioButton.UseVisualStyleBackColor = true;
            // 
            // MaleRadioButton
            // 
            MaleRadioButton.AutoSize = true;
            MaleRadioButton.Location = new Point(15, 27);
            MaleRadioButton.Name = "MaleRadioButton";
            MaleRadioButton.Size = new Size(90, 24);
            MaleRadioButton.TabIndex = 0;
            MaleRadioButton.TabStop = true;
            MaleRadioButton.Text = "Мужской";
            MaleRadioButton.UseVisualStyleBackColor = true;
            // 
            // BirthDateGroupBox
            // 
            BirthDateGroupBox.Controls.Add(DateBirtPicker);
            BirthDateGroupBox.Location = new Point(551, 17);
            BirthDateGroupBox.Name = "BirthDateGroupBox";
            BirthDateGroupBox.Size = new Size(222, 96);
            BirthDateGroupBox.TabIndex = 7;
            BirthDateGroupBox.TabStop = false;
            BirthDateGroupBox.Text = "Дата Рождения:";
            // 
            // DateBirtPicker
            // 
            DateBirtPicker.Location = new Point(15, 39);
            DateBirtPicker.Name = "DateBirtPicker";
            DateBirtPicker.Size = new Size(190, 27);
            DateBirtPicker.TabIndex = 0;
            // 
            // LocationLabel
            // 
            LocationLabel.AutoSize = true;
            LocationLabel.Location = new Point(23, 146);
            LocationLabel.Name = "LocationLabel";
            LocationLabel.Size = new Size(152, 20);
            LocationLabel.TabIndex = 8;
            LocationLabel.Text = "Место проживания: ";
            // 
            // EMailLabel
            // 
            EMailLabel.AutoSize = true;
            EMailLabel.Location = new Point(23, 181);
            EMailLabel.Name = "EMailLabel";
            EMailLabel.Size = new Size(199, 20);
            EMailLabel.TabIndex = 9;
            EMailLabel.Text = "Адрес электронной почты: ";
            // 
            // emailTextBox
            // 
            emailTextBox.Location = new Point(307, 178);
            emailTextBox.Name = "emailTextBox";
            emailTextBox.Size = new Size(449, 27);
            emailTextBox.TabIndex = 10;
            // 
            // LocationTextBox
            // 
            LocationTextBox.FormattingEnabled = true;
            LocationTextBox.Items.AddRange(new object[] { "Гродно", "Минск", "Витебск", "Гомель", "Могилёв", "Брест" });
            LocationTextBox.Location = new Point(307, 143);
            LocationTextBox.Name = "LocationTextBox";
            LocationTextBox.Size = new Size(449, 28);
            LocationTextBox.TabIndex = 11;
            // 
            // phoneLabel
            // 
            phoneLabel.AutoSize = true;
            phoneLabel.Location = new Point(23, 219);
            phoneLabel.Name = "phoneLabel";
            phoneLabel.Size = new Size(163, 20);
            phoneLabel.TabIndex = 12;
            phoneLabel.Text = "Мобильный телефон: ";
            // 
            // operatorBox
            // 
            operatorBox.FormattingEnabled = true;
            operatorBox.Items.AddRange(new object[] { "МТС", "А1", "Life" });
            operatorBox.Location = new Point(307, 216);
            operatorBox.Name = "operatorBox";
            operatorBox.Size = new Size(107, 28);
            operatorBox.TabIndex = 13;
            // 
            // phoneBox
            // 
            phoneBox.Location = new Point(438, 217);
            phoneBox.Name = "phoneBox";
            phoneBox.Size = new Size(318, 27);
            phoneBox.TabIndex = 14;
            // 
            // workExpGroupBox
            // 
            workExpGroupBox.Controls.Add(From5To9RB);
            workExpGroupBox.Controls.Add(LessThen1RB);
            workExpGroupBox.Controls.Add(MoreThen10RB);
            workExpGroupBox.Controls.Add(From1To5RB);
            workExpGroupBox.Controls.Add(NoWorkRB);
            workExpGroupBox.Location = new Point(23, 268);
            workExpGroupBox.Name = "workExpGroupBox";
            workExpGroupBox.Size = new Size(750, 125);
            workExpGroupBox.TabIndex = 15;
            workExpGroupBox.TabStop = false;
            workExpGroupBox.Text = "Опыт Работы:";
            // 
            // From5To9RB
            // 
            From5To9RB.AutoSize = true;
            From5To9RB.Location = new Point(298, 66);
            From5To9RB.Name = "From5To9RB";
            From5To9RB.Size = new Size(115, 24);
            From5To9RB.TabIndex = 4;
            From5To9RB.TabStop = true;
            From5To9RB.Text = "От 5 до 9 лет";
            From5To9RB.UseVisualStyleBackColor = true;
            // 
            // LessThen1RB
            // 
            LessThen1RB.AutoSize = true;
            LessThen1RB.Location = new Point(22, 66);
            LessThen1RB.Name = "LessThen1RB";
            LessThen1RB.Size = new Size(132, 24);
            LessThen1RB.TabIndex = 3;
            LessThen1RB.TabStop = true;
            LessThen1RB.Text = "Меньше 1 года";
            LessThen1RB.UseVisualStyleBackColor = true;
            // 
            // MoreThen10RB
            // 
            MoreThen10RB.AutoSize = true;
            MoreThen10RB.Location = new Point(561, 26);
            MoreThen10RB.Name = "MoreThen10RB";
            MoreThen10RB.Size = new Size(149, 24);
            MoreThen10RB.TabIndex = 2;
            MoreThen10RB.TabStop = true;
            MoreThen10RB.Text = "От 10 лет и более";
            MoreThen10RB.UseVisualStyleBackColor = true;
            // 
            // From1To5RB
            // 
            From1To5RB.AutoSize = true;
            From1To5RB.Location = new Point(298, 26);
            From1To5RB.Name = "From1To5RB";
            From1To5RB.Size = new Size(150, 24);
            From1To5RB.TabIndex = 1;
            From1To5RB.TabStop = true;
            From1To5RB.Text = "От 1 года до 5 лет";
            From1To5RB.UseVisualStyleBackColor = true;
            // 
            // NoWorkRB
            // 
            NoWorkRB.AutoSize = true;
            NoWorkRB.Location = new Point(22, 26);
            NoWorkRB.Name = "NoWorkRB";
            NoWorkRB.Size = new Size(164, 24);
            NoWorkRB.TabIndex = 0;
            NoWorkRB.TabStop = true;
            NoWorkRB.Text = "Прежде не работал";
            NoWorkRB.UseVisualStyleBackColor = true;
            // 
            // OthersGroupBox
            // 
            OthersGroupBox.Controls.Add(categoryD);
            OthersGroupBox.Controls.Add(categoryC);
            OthersGroupBox.Controls.Add(categoryB);
            OthersGroupBox.Controls.Add(categoryA);
            OthersGroupBox.Controls.Add(driveCategory);
            OthersGroupBox.Controls.Add(driveLicense);
            OthersGroupBox.Controls.Add(haveAuto);
            OthersGroupBox.Location = new Point(23, 410);
            OthersGroupBox.Name = "OthersGroupBox";
            OthersGroupBox.Size = new Size(289, 149);
            OthersGroupBox.TabIndex = 16;
            OthersGroupBox.TabStop = false;
            OthersGroupBox.Text = "Другие Сведения: ";
            // 
            // categoryD
            // 
            categoryD.AutoSize = true;
            categoryD.Location = new Point(161, 115);
            categoryD.Name = "categoryD";
            categoryD.Size = new Size(39, 24);
            categoryD.TabIndex = 6;
            categoryD.Text = "D";
            categoryD.UseVisualStyleBackColor = true;
            // 
            // categoryC
            // 
            categoryC.AutoSize = true;
            categoryC.Location = new Point(110, 115);
            categoryC.Name = "categoryC";
            categoryC.Size = new Size(37, 24);
            categoryC.TabIndex = 5;
            categoryC.Text = "C";
            categoryC.UseVisualStyleBackColor = true;
            // 
            // categoryB
            // 
            categoryB.AutoSize = true;
            categoryB.Location = new Point(66, 115);
            categoryB.Name = "categoryB";
            categoryB.Size = new Size(37, 24);
            categoryB.TabIndex = 4;
            categoryB.Text = "B";
            categoryB.UseVisualStyleBackColor = true;
            // 
            // categoryA
            // 
            categoryA.AutoSize = true;
            categoryA.Location = new Point(22, 115);
            categoryA.Name = "categoryA";
            categoryA.Size = new Size(38, 24);
            categoryA.TabIndex = 3;
            categoryA.Text = "A";
            categoryA.UseVisualStyleBackColor = true;
            // 
            // driveCategory
            // 
            driveCategory.AutoSize = true;
            driveCategory.Location = new Point(13, 92);
            driveCategory.Name = "driveCategory";
            driveCategory.Size = new Size(124, 20);
            driveCategory.TabIndex = 2;
            driveCategory.Text = "Категория Прав:";
            // 
            // driveLicense
            // 
            driveLicense.AutoSize = true;
            driveLicense.Location = new Point(13, 56);
            driveLicense.Name = "driveLicense";
            driveLicense.Size = new Size(233, 24);
            driveLicense.TabIndex = 1;
            driveLicense.Text = "Водительское удостоверение";
            driveLicense.UseVisualStyleBackColor = true;
            // 
            // haveAuto
            // 
            haveAuto.AutoSize = true;
            haveAuto.Location = new Point(13, 26);
            haveAuto.Name = "haveAuto";
            haveAuto.Size = new Size(186, 24);
            haveAuto.TabIndex = 0;
            haveAuto.Text = "Наличие личного авто";
            haveAuto.UseVisualStyleBackColor = true;
            // 
            // salaryGroupBox
            // 
            salaryGroupBox.Controls.Add(ToLabel);
            salaryGroupBox.Controls.Add(FromLabel);
            salaryGroupBox.Controls.Add(ToSalary);
            salaryGroupBox.Controls.Add(FromSalary);
            salaryGroupBox.Location = new Point(371, 410);
            salaryGroupBox.Name = "salaryGroupBox";
            salaryGroupBox.Size = new Size(402, 65);
            salaryGroupBox.TabIndex = 17;
            salaryGroupBox.TabStop = false;
            salaryGroupBox.Text = "Объем заработной платы: ";
            // 
            // ToLabel
            // 
            ToLabel.AutoSize = true;
            ToLabel.Location = new Point(214, 28);
            ToLabel.Name = "ToLabel";
            ToLabel.Size = new Size(28, 20);
            ToLabel.TabIndex = 3;
            ToLabel.Text = "До";
            // 
            // FromLabel
            // 
            FromLabel.AutoSize = true;
            FromLabel.Location = new Point(14, 28);
            FromLabel.Name = "FromLabel";
            FromLabel.Size = new Size(26, 20);
            FromLabel.TabIndex = 2;
            FromLabel.Text = "От";
            // 
            // ToSalary
            // 
            ToSalary.Location = new Point(246, 26);
            ToSalary.Maximum = new decimal(new int[] { 10000000, 0, 0, 0 });
            ToSalary.Minimum = new decimal(new int[] { 550, 0, 0, 0 });
            ToSalary.Name = "ToSalary";
            ToSalary.Size = new Size(150, 27);
            ToSalary.TabIndex = 1;
            ToSalary.Value = new decimal(new int[] { 550, 0, 0, 0 });
            // 
            // FromSalary
            // 
            FromSalary.Location = new Point(46, 26);
            FromSalary.Maximum = new decimal(new int[] { 10000000, 0, 0, 0 });
            FromSalary.Minimum = new decimal(new int[] { 550, 0, 0, 0 });
            FromSalary.Name = "FromSalary";
            FromSalary.Size = new Size(150, 27);
            FromSalary.TabIndex = 0;
            FromSalary.Value = new decimal(new int[] { 550, 0, 0, 0 });
            // 
            // workTimeGroupBox
            // 
            workTimeGroupBox.Controls.Add(TimeWorkRB);
            workTimeGroupBox.Controls.Add(WorkAtHomeRB);
            workTimeGroupBox.Controls.Add(PartTimeRB);
            workTimeGroupBox.Controls.Add(FullTimeRB);
            workTimeGroupBox.Location = new Point(371, 481);
            workTimeGroupBox.Name = "workTimeGroupBox";
            workTimeGroupBox.Size = new Size(402, 78);
            workTimeGroupBox.TabIndex = 18;
            workTimeGroupBox.TabStop = false;
            workTimeGroupBox.Text = "Предпочитаемый график работы";
            // 
            // TimeWorkRB
            // 
            TimeWorkRB.AutoSize = true;
            TimeWorkRB.Location = new Point(223, 48);
            TimeWorkRB.Name = "TimeWorkRB";
            TimeWorkRB.Size = new Size(160, 24);
            TimeWorkRB.TabIndex = 3;
            TimeWorkRB.TabStop = true;
            TimeWorkRB.Text = "Посменная работа";
            TimeWorkRB.UseVisualStyleBackColor = true;
            // 
            // WorkAtHomeRB
            // 
            WorkAtHomeRB.AutoSize = true;
            WorkAtHomeRB.Location = new Point(14, 48);
            WorkAtHomeRB.Name = "WorkAtHomeRB";
            WorkAtHomeRB.Size = new Size(135, 24);
            WorkAtHomeRB.TabIndex = 2;
            WorkAtHomeRB.TabStop = true;
            WorkAtHomeRB.Text = "Работа на дому";
            WorkAtHomeRB.UseVisualStyleBackColor = true;
            // 
            // PartTimeRB
            // 
            PartTimeRB.AutoSize = true;
            PartTimeRB.Location = new Point(223, 19);
            PartTimeRB.Name = "PartTimeRB";
            PartTimeRB.Size = new Size(172, 24);
            PartTimeRB.TabIndex = 1;
            PartTimeRB.TabStop = true;
            PartTimeRB.Text = "Частичная занятость";
            PartTimeRB.UseVisualStyleBackColor = true;
            // 
            // FullTimeRB
            // 
            FullTimeRB.AutoSize = true;
            FullTimeRB.Location = new Point(14, 21);
            FullTimeRB.Name = "FullTimeRB";
            FullTimeRB.Size = new Size(158, 24);
            FullTimeRB.TabIndex = 0;
            FullTimeRB.TabStop = true;
            FullTimeRB.Text = "Полная заняттость";
            FullTimeRB.UseVisualStyleBackColor = true;
            // 
            // CVtextBox
            // 
            CVtextBox.Location = new Point(23, 595);
            CVtextBox.Name = "CVtextBox";
            CVtextBox.Size = new Size(750, 147);
            CVtextBox.TabIndex = 19;
            CVtextBox.Text = "";
            // 
            // CVLabel
            // 
            CVLabel.AutoSize = true;
            CVLabel.Location = new Point(23, 572);
            CVLabel.Name = "CVLabel";
            CVLabel.Size = new Size(130, 20);
            CVLabel.TabIndex = 20;
            CVLabel.Text = "Краткое Резюме: ";
            // 
            // SaveButton
            // 
            SaveButton.Location = new Point(23, 748);
            SaveButton.Name = "SaveButton";
            SaveButton.Size = new Size(154, 29);
            SaveButton.TabIndex = 21;
            SaveButton.Text = "Сохранить";
            SaveButton.UseVisualStyleBackColor = true;
            SaveButton.Click += SaveButton_Click;
            // 
            // ClearButton
            // 
            ClearButton.Location = new Point(184, 748);
            ClearButton.Name = "ClearButton";
            ClearButton.Size = new Size(154, 29);
            ClearButton.TabIndex = 22;
            ClearButton.Text = "Очистить";
            ClearButton.UseVisualStyleBackColor = true;
            ClearButton.Click += ClearButton_Click;
            // 
            // CancelButton
            // 
            CancelButton.Location = new Point(619, 748);
            CancelButton.Name = "CancelButton";
            CancelButton.Size = new Size(154, 29);
            CancelButton.TabIndex = 23;
            CancelButton.Text = "Закрыть";
            CancelButton.UseVisualStyleBackColor = true;
            CancelButton.Click += CancelButton_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 783);
            Controls.Add(CancelButton);
            Controls.Add(ClearButton);
            Controls.Add(SaveButton);
            Controls.Add(CVLabel);
            Controls.Add(CVtextBox);
            Controls.Add(workTimeGroupBox);
            Controls.Add(salaryGroupBox);
            Controls.Add(OthersGroupBox);
            Controls.Add(workExpGroupBox);
            Controls.Add(phoneBox);
            Controls.Add(operatorBox);
            Controls.Add(phoneLabel);
            Controls.Add(LocationTextBox);
            Controls.Add(emailTextBox);
            Controls.Add(EMailLabel);
            Controls.Add(LocationLabel);
            Controls.Add(BirthDateGroupBox);
            Controls.Add(SexGroupBox);
            Controls.Add(MiddleNameTextBox);
            Controls.Add(NameTextBox);
            Controls.Add(SurnameTextBox);
            Controls.Add(MiddleNameLabel);
            Controls.Add(NameLabel);
            Controls.Add(SurnameLabel);
            Name = "Form1";
            Text = "Form1";
            SexGroupBox.ResumeLayout(false);
            SexGroupBox.PerformLayout();
            BirthDateGroupBox.ResumeLayout(false);
            workExpGroupBox.ResumeLayout(false);
            workExpGroupBox.PerformLayout();
            OthersGroupBox.ResumeLayout(false);
            OthersGroupBox.PerformLayout();
            salaryGroupBox.ResumeLayout(false);
            salaryGroupBox.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)ToSalary).EndInit();
            ((System.ComponentModel.ISupportInitialize)FromSalary).EndInit();
            workTimeGroupBox.ResumeLayout(false);
            workTimeGroupBox.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label SurnameLabel;
        private Label NameLabel;
        private Label MiddleNameLabel;
        private TextBox SurnameTextBox;
        private TextBox NameTextBox;
        private TextBox MiddleNameTextBox;
        private GroupBox SexGroupBox;
        private RadioButton FemaleRadioButton;
        private RadioButton MaleRadioButton;
        private GroupBox BirthDateGroupBox;
        private DateTimePicker DateBirtPicker;
        private Label LocationLabel;
        private Label EMailLabel;
        private TextBox emailTextBox;
        private ComboBox LocationTextBox;
        private Label phoneLabel;
        private ComboBox operatorBox;
        private TextBox phoneBox;
        private GroupBox workExpGroupBox;
        private RadioButton From5To9RB;
        private RadioButton LessThen1RB;
        private RadioButton MoreThen10RB;
        private RadioButton From1To5RB;
        private RadioButton NoWorkRB;
        private GroupBox OthersGroupBox;
        private CheckBox categoryD;
        private CheckBox categoryC;
        private CheckBox categoryB;
        private CheckBox categoryA;
        private Label driveCategory;
        private CheckBox driveLicense;
        private CheckBox haveAuto;
        private GroupBox salaryGroupBox;
        private Label ToLabel;
        private Label FromLabel;
        private NumericUpDown ToSalary;
        private NumericUpDown FromSalary;
        private GroupBox workTimeGroupBox;
        private RadioButton TimeWorkRB;
        private RadioButton WorkAtHomeRB;
        private RadioButton PartTimeRB;
        private RadioButton FullTimeRB;
        private RichTextBox CVtextBox;
        private Label CVLabel;
        private Button SaveButton;
        private Button ClearButton;
        private Button CancelButton;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
    }
}
