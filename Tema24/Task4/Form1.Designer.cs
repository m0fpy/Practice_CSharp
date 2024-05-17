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
            components = new System.ComponentModel.Container();
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
            label1 = new Label();
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
            helpProvider1 = new HelpProvider();
            button1 = new Button();
            toolTip1 = new ToolTip(components);
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
            SurnameLabel.Location = new Point(36, 32);
            SurnameLabel.Margin = new Padding(5, 0, 5, 0);
            SurnameLabel.Name = "SurnameLabel";
            helpProvider1.SetShowHelp(SurnameLabel, true);
            SurnameLabel.Size = new Size(114, 32);
            SurnameLabel.TabIndex = 0;
            SurnameLabel.Text = "Surname:";
            // 
            // NameLabel
            // 
            NameLabel.AutoSize = true;
            NameLabel.Location = new Point(89, 90);
            NameLabel.Margin = new Padding(5, 0, 5, 0);
            NameLabel.Name = "NameLabel";
            helpProvider1.SetShowHelp(NameLabel, true);
            NameLabel.Size = new Size(83, 32);
            NameLabel.TabIndex = 1;
            NameLabel.Text = "Name:";
            // 
            // MiddleNameLabel
            // 
            MiddleNameLabel.AutoSize = true;
            MiddleNameLabel.Location = new Point(37, 142);
            MiddleNameLabel.Margin = new Padding(5, 0, 5, 0);
            MiddleNameLabel.Name = "MiddleNameLabel";
            helpProvider1.SetShowHelp(MiddleNameLabel, true);
            MiddleNameLabel.Size = new Size(137, 32);
            MiddleNameLabel.TabIndex = 2;
            MiddleNameLabel.Text = "Patronymic:";
            // 
            // SurnameTextBox
            // 
            helpProvider1.SetHelpString(SurnameTextBox, "Field for surname");
            SurnameTextBox.Location = new Point(169, 27);
            SurnameTextBox.Margin = new Padding(5);
            SurnameTextBox.Name = "SurnameTextBox";
            helpProvider1.SetShowHelp(SurnameTextBox, true);
            SurnameTextBox.Size = new Size(420, 39);
            SurnameTextBox.TabIndex = 3;
            toolTip1.SetToolTip(SurnameTextBox, "Field for surname");
            // 
            // NameTextBox
            // 
            helpProvider1.SetHelpString(NameTextBox, "Field for Name");
            NameTextBox.Location = new Point(167, 85);
            NameTextBox.Margin = new Padding(5);
            NameTextBox.Name = "NameTextBox";
            helpProvider1.SetShowHelp(NameTextBox, true);
            NameTextBox.Size = new Size(422, 39);
            NameTextBox.TabIndex = 4;
            toolTip1.SetToolTip(NameTextBox, "Field for Name");
            // 
            // MiddleNameTextBox
            // 
            helpProvider1.SetHelpString(MiddleNameTextBox, "Field for patronymic");
            MiddleNameTextBox.Location = new Point(167, 138);
            MiddleNameTextBox.Margin = new Padding(5);
            MiddleNameTextBox.Name = "MiddleNameTextBox";
            helpProvider1.SetShowHelp(MiddleNameTextBox, true);
            MiddleNameTextBox.Size = new Size(422, 39);
            MiddleNameTextBox.TabIndex = 5;
            toolTip1.SetToolTip(MiddleNameTextBox, "Field for patronymic");
            // 
            // SexGroupBox
            // 
            SexGroupBox.Controls.Add(FemaleRadioButton);
            SexGroupBox.Controls.Add(MaleRadioButton);
            SexGroupBox.Location = new Point(622, 32);
            SexGroupBox.Margin = new Padding(5);
            SexGroupBox.Name = "SexGroupBox";
            SexGroupBox.Padding = new Padding(5);
            helpProvider1.SetShowHelp(SexGroupBox, true);
            SexGroupBox.Size = new Size(213, 149);
            SexGroupBox.TabIndex = 6;
            SexGroupBox.TabStop = false;
            SexGroupBox.Text = "Sex:";
            // 
            // FemaleRadioButton
            // 
            FemaleRadioButton.AutoSize = true;
            helpProvider1.SetHelpString(FemaleRadioButton, "Choose Female");
            FemaleRadioButton.Location = new Point(24, 91);
            FemaleRadioButton.Margin = new Padding(5);
            FemaleRadioButton.Name = "FemaleRadioButton";
            helpProvider1.SetShowHelp(FemaleRadioButton, true);
            FemaleRadioButton.Size = new Size(122, 36);
            FemaleRadioButton.TabIndex = 1;
            FemaleRadioButton.TabStop = true;
            FemaleRadioButton.Text = "Female";
            toolTip1.SetToolTip(FemaleRadioButton, "Choose Female");
            FemaleRadioButton.UseVisualStyleBackColor = true;
            // 
            // MaleRadioButton
            // 
            MaleRadioButton.AutoSize = true;
            helpProvider1.SetHelpString(MaleRadioButton, "Choose Male");
            MaleRadioButton.Location = new Point(24, 43);
            MaleRadioButton.Margin = new Padding(5);
            MaleRadioButton.Name = "MaleRadioButton";
            helpProvider1.SetShowHelp(MaleRadioButton, true);
            MaleRadioButton.Size = new Size(98, 36);
            MaleRadioButton.TabIndex = 0;
            MaleRadioButton.TabStop = true;
            MaleRadioButton.Text = "Male";
            toolTip1.SetToolTip(MaleRadioButton, "Choose Male");
            MaleRadioButton.UseVisualStyleBackColor = true;
            // 
            // BirthDateGroupBox
            // 
            BirthDateGroupBox.Controls.Add(DateBirtPicker);
            BirthDateGroupBox.Location = new Point(895, 27);
            BirthDateGroupBox.Margin = new Padding(5);
            BirthDateGroupBox.Name = "BirthDateGroupBox";
            BirthDateGroupBox.Padding = new Padding(5);
            helpProvider1.SetShowHelp(BirthDateGroupBox, true);
            BirthDateGroupBox.Size = new Size(361, 154);
            BirthDateGroupBox.TabIndex = 7;
            BirthDateGroupBox.TabStop = false;
            BirthDateGroupBox.Text = "Date of Birth:";
            // 
            // DateBirtPicker
            // 
            helpProvider1.SetHelpString(DateBirtPicker, "Field for date of birth");
            DateBirtPicker.Location = new Point(24, 62);
            DateBirtPicker.Margin = new Padding(5);
            DateBirtPicker.Name = "DateBirtPicker";
            helpProvider1.SetShowHelp(DateBirtPicker, true);
            DateBirtPicker.Size = new Size(306, 39);
            DateBirtPicker.TabIndex = 0;
            toolTip1.SetToolTip(DateBirtPicker, "Field for date of birth");
            // 
            // LocationLabel
            // 
            LocationLabel.AutoSize = true;
            LocationLabel.Location = new Point(37, 234);
            LocationLabel.Margin = new Padding(5, 0, 5, 0);
            LocationLabel.Name = "LocationLabel";
            helpProvider1.SetShowHelp(LocationLabel, true);
            LocationLabel.Size = new Size(110, 32);
            LocationLabel.TabIndex = 8;
            LocationLabel.Text = "Address: ";
            // 
            // EMailLabel
            // 
            EMailLabel.AutoSize = true;
            EMailLabel.Location = new Point(37, 290);
            EMailLabel.Margin = new Padding(5, 0, 5, 0);
            EMailLabel.Name = "EMailLabel";
            helpProvider1.SetShowHelp(EMailLabel, true);
            EMailLabel.Size = new Size(76, 32);
            EMailLabel.TabIndex = 9;
            EMailLabel.Text = "Email:";
            // 
            // emailTextBox
            // 
            helpProvider1.SetHelpString(emailTextBox, "Field for email");
            emailTextBox.Location = new Point(499, 285);
            emailTextBox.Margin = new Padding(5);
            emailTextBox.Name = "emailTextBox";
            helpProvider1.SetShowHelp(emailTextBox, true);
            emailTextBox.Size = new Size(727, 39);
            emailTextBox.TabIndex = 10;
            toolTip1.SetToolTip(emailTextBox, "Field for email");
            // 
            // LocationTextBox
            // 
            LocationTextBox.FormattingEnabled = true;
            helpProvider1.SetHelpString(LocationTextBox, "File for address");
            LocationTextBox.Items.AddRange(new object[] { "Гродно", "Минск", "Витебск", "Гомель", "Могилёв", "Брест" });
            LocationTextBox.Location = new Point(499, 229);
            LocationTextBox.Margin = new Padding(5);
            LocationTextBox.Name = "LocationTextBox";
            helpProvider1.SetShowHelp(LocationTextBox, true);
            LocationTextBox.Size = new Size(727, 40);
            LocationTextBox.TabIndex = 11;
            toolTip1.SetToolTip(LocationTextBox, "File for address");
            // 
            // phoneLabel
            // 
            phoneLabel.AutoSize = true;
            phoneLabel.Location = new Point(37, 350);
            phoneLabel.Margin = new Padding(5, 0, 5, 0);
            phoneLabel.Name = "phoneLabel";
            helpProvider1.SetShowHelp(phoneLabel, true);
            phoneLabel.Size = new Size(182, 32);
            phoneLabel.TabIndex = 12;
            phoneLabel.Text = "Phone Number:";
            // 
            // operatorBox
            // 
            operatorBox.FormattingEnabled = true;
            helpProvider1.SetHelpString(operatorBox, "Field for mobil operator");
            operatorBox.Items.AddRange(new object[] { "МТС", "А1", "Life" });
            operatorBox.Location = new Point(499, 346);
            operatorBox.Margin = new Padding(5);
            operatorBox.Name = "operatorBox";
            helpProvider1.SetShowHelp(operatorBox, true);
            operatorBox.Size = new Size(171, 40);
            operatorBox.TabIndex = 13;
            toolTip1.SetToolTip(operatorBox, "Field for mobil operator");
            // 
            // phoneBox
            // 
            helpProvider1.SetHelpString(phoneBox, "Field for phone number");
            phoneBox.Location = new Point(712, 347);
            phoneBox.Margin = new Padding(5);
            phoneBox.Name = "phoneBox";
            helpProvider1.SetShowHelp(phoneBox, true);
            phoneBox.Size = new Size(514, 39);
            phoneBox.TabIndex = 14;
            toolTip1.SetToolTip(phoneBox, "Field for phone number");
            // 
            // workExpGroupBox
            // 
            workExpGroupBox.Controls.Add(From5To9RB);
            workExpGroupBox.Controls.Add(LessThen1RB);
            workExpGroupBox.Controls.Add(MoreThen10RB);
            workExpGroupBox.Controls.Add(From1To5RB);
            workExpGroupBox.Controls.Add(NoWorkRB);
            workExpGroupBox.Location = new Point(37, 429);
            workExpGroupBox.Margin = new Padding(5);
            workExpGroupBox.Name = "workExpGroupBox";
            workExpGroupBox.Padding = new Padding(5);
            helpProvider1.SetShowHelp(workExpGroupBox, true);
            workExpGroupBox.Size = new Size(1219, 200);
            workExpGroupBox.TabIndex = 15;
            workExpGroupBox.TabStop = false;
            workExpGroupBox.Text = "Work Experience:";
            // 
            // From5To9RB
            // 
            From5To9RB.AutoSize = true;
            helpProvider1.SetHelpString(From5To9RB, "If you have from 5 to 9 years of experience");
            From5To9RB.Location = new Point(484, 106);
            From5To9RB.Margin = new Padding(5);
            From5To9RB.Name = "From5To9RB";
            helpProvider1.SetShowHelp(From5To9RB, true);
            From5To9RB.Size = new Size(231, 36);
            From5To9RB.TabIndex = 4;
            From5To9RB.TabStop = true;
            From5To9RB.Text = "From 5 to 9 years";
            toolTip1.SetToolTip(From5To9RB, "If you have from 5 to 9 years of experience");
            From5To9RB.UseVisualStyleBackColor = true;
            // 
            // LessThen1RB
            // 
            LessThen1RB.AutoSize = true;
            helpProvider1.SetHelpString(LessThen1RB, "If you have <1 year of experience");
            LessThen1RB.Location = new Point(36, 106);
            LessThen1RB.Margin = new Padding(5);
            LessThen1RB.Name = "LessThen1RB";
            helpProvider1.SetShowHelp(LessThen1RB, true);
            LessThen1RB.Size = new Size(217, 36);
            LessThen1RB.TabIndex = 3;
            LessThen1RB.TabStop = true;
            LessThen1RB.Text = "Less then 1 year";
            toolTip1.SetToolTip(LessThen1RB, "If you have <1 year of experience");
            LessThen1RB.UseVisualStyleBackColor = true;
            // 
            // MoreThen10RB
            // 
            MoreThen10RB.AutoSize = true;
            helpProvider1.SetHelpString(MoreThen10RB, "If you have more than 10 years of experience");
            MoreThen10RB.Location = new Point(912, 42);
            MoreThen10RB.Margin = new Padding(5);
            MoreThen10RB.Name = "MoreThen10RB";
            helpProvider1.SetShowHelp(MoreThen10RB, true);
            MoreThen10RB.Size = new Size(252, 36);
            MoreThen10RB.TabIndex = 2;
            MoreThen10RB.TabStop = true;
            MoreThen10RB.Text = "More than 10 years";
            toolTip1.SetToolTip(MoreThen10RB, "If you have more than 10 years of experience");
            MoreThen10RB.UseVisualStyleBackColor = true;
            // 
            // From1To5RB
            // 
            From1To5RB.AutoSize = true;
            helpProvider1.SetHelpString(From1To5RB, "If you have from 1 to 5 years of experience");
            From1To5RB.Location = new Point(484, 42);
            From1To5RB.Margin = new Padding(5);
            From1To5RB.Name = "From1To5RB";
            helpProvider1.SetShowHelp(From1To5RB, true);
            From1To5RB.Size = new Size(231, 36);
            From1To5RB.TabIndex = 1;
            From1To5RB.TabStop = true;
            From1To5RB.Text = "From 1 to 5 years";
            toolTip1.SetToolTip(From1To5RB, "If you have from 1 to 5 years of experience");
            From1To5RB.UseVisualStyleBackColor = true;
            // 
            // NoWorkRB
            // 
            NoWorkRB.AutoSize = true;
            helpProvider1.SetHelpString(NoWorkRB, "If you have 0 experience");
            NoWorkRB.Location = new Point(36, 42);
            NoWorkRB.Margin = new Padding(5);
            NoWorkRB.Name = "NoWorkRB";
            helpProvider1.SetShowHelp(NoWorkRB, true);
            NoWorkRB.Size = new Size(200, 36);
            NoWorkRB.TabIndex = 0;
            NoWorkRB.TabStop = true;
            NoWorkRB.Text = "No experience";
            toolTip1.SetToolTip(NoWorkRB, "If you have 0 experience");
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
            OthersGroupBox.Location = new Point(37, 656);
            OthersGroupBox.Margin = new Padding(5);
            OthersGroupBox.Name = "OthersGroupBox";
            OthersGroupBox.Padding = new Padding(5);
            helpProvider1.SetShowHelp(OthersGroupBox, true);
            OthersGroupBox.Size = new Size(470, 238);
            OthersGroupBox.TabIndex = 16;
            OthersGroupBox.TabStop = false;
            OthersGroupBox.Text = "OtherDetails";
            // 
            // categoryD
            // 
            categoryD.AutoSize = true;
            helpProvider1.SetHelpString(categoryD, "If you have category D");
            categoryD.Location = new Point(262, 184);
            categoryD.Margin = new Padding(5);
            categoryD.Name = "categoryD";
            helpProvider1.SetShowHelp(categoryD, true);
            categoryD.Size = new Size(63, 36);
            categoryD.TabIndex = 6;
            categoryD.Text = "D";
            toolTip1.SetToolTip(categoryD, "If you have category D");
            categoryD.UseVisualStyleBackColor = true;
            // 
            // categoryC
            // 
            categoryC.AutoSize = true;
            helpProvider1.SetHelpString(categoryC, "If you have category C");
            categoryC.Location = new Point(179, 184);
            categoryC.Margin = new Padding(5);
            categoryC.Name = "categoryC";
            helpProvider1.SetShowHelp(categoryC, true);
            categoryC.Size = new Size(61, 36);
            categoryC.TabIndex = 5;
            categoryC.Text = "C";
            toolTip1.SetToolTip(categoryC, "If you have category C");
            categoryC.UseVisualStyleBackColor = true;
            // 
            // categoryB
            // 
            categoryB.AutoSize = true;
            helpProvider1.SetHelpString(categoryB, "If you have category B");
            categoryB.Location = new Point(107, 184);
            categoryB.Margin = new Padding(5);
            categoryB.Name = "categoryB";
            helpProvider1.SetShowHelp(categoryB, true);
            categoryB.Size = new Size(60, 36);
            categoryB.TabIndex = 4;
            categoryB.Text = "B";
            toolTip1.SetToolTip(categoryB, "If you have category B");
            categoryB.UseVisualStyleBackColor = true;
            // 
            // categoryA
            // 
            categoryA.AutoSize = true;
            helpProvider1.SetHelpString(categoryA, "If you have category A");
            categoryA.Location = new Point(36, 184);
            categoryA.Margin = new Padding(5);
            categoryA.Name = "categoryA";
            helpProvider1.SetShowHelp(categoryA, true);
            categoryA.Size = new Size(61, 36);
            categoryA.TabIndex = 3;
            categoryA.Text = "A";
            toolTip1.SetToolTip(categoryA, "If you have category A");
            categoryA.UseVisualStyleBackColor = true;
            // 
            // driveCategory
            // 
            driveCategory.AutoSize = true;
            driveCategory.Location = new Point(21, 147);
            driveCategory.Margin = new Padding(5, 0, 5, 0);
            driveCategory.Name = "driveCategory";
            helpProvider1.SetShowHelp(driveCategory, true);
            driveCategory.Size = new Size(202, 32);
            driveCategory.TabIndex = 2;
            driveCategory.Text = "Liscence category";
            // 
            // driveLicense
            // 
            driveLicense.AutoSize = true;
            helpProvider1.SetHelpString(driveLicense, "If you have drive liscence");
            driveLicense.Location = new Point(21, 90);
            driveLicense.Margin = new Padding(5);
            driveLicense.Name = "driveLicense";
            helpProvider1.SetShowHelp(driveLicense, true);
            driveLicense.Size = new Size(193, 36);
            driveLicense.TabIndex = 1;
            driveLicense.Text = "Drive liscence";
            toolTip1.SetToolTip(driveLicense, "If you have drive liscence");
            driveLicense.UseVisualStyleBackColor = true;
            // 
            // haveAuto
            // 
            haveAuto.AutoSize = true;
            helpProvider1.SetHelpString(haveAuto, "If you have your own car");
            haveAuto.Location = new Point(21, 42);
            haveAuto.Margin = new Padding(5);
            haveAuto.Name = "haveAuto";
            helpProvider1.SetShowHelp(haveAuto, true);
            haveAuto.Size = new Size(345, 36);
            haveAuto.TabIndex = 0;
            haveAuto.Text = "Availability of a personal car";
            toolTip1.SetToolTip(haveAuto, "If you have your own car");
            haveAuto.UseVisualStyleBackColor = true;
            // 
            // salaryGroupBox
            // 
            salaryGroupBox.Controls.Add(ToLabel);
            salaryGroupBox.Controls.Add(label1);
            salaryGroupBox.Controls.Add(FromLabel);
            salaryGroupBox.Controls.Add(ToSalary);
            salaryGroupBox.Controls.Add(FromSalary);
            salaryGroupBox.Location = new Point(613, 656);
            salaryGroupBox.Margin = new Padding(5);
            salaryGroupBox.Name = "salaryGroupBox";
            salaryGroupBox.Padding = new Padding(5);
            helpProvider1.SetShowHelp(salaryGroupBox, true);
            salaryGroupBox.Size = new Size(643, 104);
            salaryGroupBox.TabIndex = 17;
            salaryGroupBox.TabStop = false;
            salaryGroupBox.Text = "Wage bill:";
            // 
            // ToLabel
            // 
            ToLabel.AutoSize = true;
            ToLabel.Location = new Point(348, 45);
            ToLabel.Margin = new Padding(5, 0, 5, 0);
            ToLabel.Name = "ToLabel";
            helpProvider1.SetShowHelp(ToLabel, true);
            ToLabel.Size = new Size(39, 32);
            ToLabel.TabIndex = 3;
            ToLabel.Text = "To";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.ImeMode = ImeMode.NoControl;
            label1.Location = new Point(0, 46);
            label1.Margin = new Padding(5, 0, 5, 0);
            label1.Name = "label1";
            helpProvider1.SetShowHelp(label1, true);
            label1.Size = new Size(69, 32);
            label1.TabIndex = 2;
            label1.Text = "From";
            // 
            // FromLabel
            // 
            FromLabel.AutoSize = true;
            FromLabel.Location = new Point(10, 46);
            FromLabel.Margin = new Padding(5, 0, 5, 0);
            FromLabel.Name = "FromLabel";
            helpProvider1.SetShowHelp(FromLabel, true);
            FromLabel.Size = new Size(69, 32);
            FromLabel.TabIndex = 2;
            FromLabel.Text = "From";
            // 
            // ToSalary
            // 
            helpProvider1.SetHelpString(ToSalary, "Field for max bill you want");
            ToSalary.Location = new Point(400, 42);
            ToSalary.Margin = new Padding(5);
            ToSalary.Maximum = new decimal(new int[] { 10000000, 0, 0, 0 });
            ToSalary.Minimum = new decimal(new int[] { 550, 0, 0, 0 });
            ToSalary.Name = "ToSalary";
            helpProvider1.SetShowHelp(ToSalary, true);
            ToSalary.Size = new Size(244, 39);
            ToSalary.TabIndex = 1;
            toolTip1.SetToolTip(ToSalary, "Field for max bill you want");
            ToSalary.Value = new decimal(new int[] { 550, 0, 0, 0 });
            // 
            // FromSalary
            // 
            helpProvider1.SetHelpString(FromSalary, "Field for minimum bill you want");
            FromSalary.Location = new Point(75, 42);
            FromSalary.Margin = new Padding(5);
            FromSalary.Maximum = new decimal(new int[] { 10000000, 0, 0, 0 });
            FromSalary.Minimum = new decimal(new int[] { 550, 0, 0, 0 });
            FromSalary.Name = "FromSalary";
            helpProvider1.SetShowHelp(FromSalary, true);
            FromSalary.Size = new Size(244, 39);
            FromSalary.TabIndex = 0;
            toolTip1.SetToolTip(FromSalary, "Field for minimum bill you want");
            FromSalary.Value = new decimal(new int[] { 550, 0, 0, 0 });
            // 
            // workTimeGroupBox
            // 
            workTimeGroupBox.Controls.Add(TimeWorkRB);
            workTimeGroupBox.Controls.Add(WorkAtHomeRB);
            workTimeGroupBox.Controls.Add(PartTimeRB);
            workTimeGroupBox.Controls.Add(FullTimeRB);
            workTimeGroupBox.Location = new Point(613, 770);
            workTimeGroupBox.Margin = new Padding(5);
            workTimeGroupBox.Name = "workTimeGroupBox";
            workTimeGroupBox.Padding = new Padding(5);
            helpProvider1.SetShowHelp(workTimeGroupBox, true);
            workTimeGroupBox.Size = new Size(643, 125);
            workTimeGroupBox.TabIndex = 18;
            workTimeGroupBox.TabStop = false;
            workTimeGroupBox.Text = "Preferred work schedule:";
            // 
            // TimeWorkRB
            // 
            TimeWorkRB.AutoSize = true;
            helpProvider1.SetHelpString(TimeWorkRB, "If you want shift work");
            TimeWorkRB.Location = new Point(362, 77);
            TimeWorkRB.Margin = new Padding(5);
            TimeWorkRB.Name = "TimeWorkRB";
            helpProvider1.SetShowHelp(TimeWorkRB, true);
            TimeWorkRB.Size = new Size(152, 36);
            TimeWorkRB.TabIndex = 3;
            TimeWorkRB.TabStop = true;
            TimeWorkRB.Text = "Shift work";
            toolTip1.SetToolTip(TimeWorkRB, "If you want shift work");
            TimeWorkRB.UseVisualStyleBackColor = true;
            // 
            // WorkAtHomeRB
            // 
            WorkAtHomeRB.AutoSize = true;
            helpProvider1.SetHelpString(WorkAtHomeRB, "If you want work at home");
            WorkAtHomeRB.Location = new Point(23, 77);
            WorkAtHomeRB.Margin = new Padding(5);
            WorkAtHomeRB.Name = "WorkAtHomeRB";
            helpProvider1.SetShowHelp(WorkAtHomeRB, true);
            WorkAtHomeRB.Size = new Size(196, 36);
            WorkAtHomeRB.TabIndex = 2;
            WorkAtHomeRB.TabStop = true;
            WorkAtHomeRB.Text = "Work at home";
            toolTip1.SetToolTip(WorkAtHomeRB, "If you want work at home");
            WorkAtHomeRB.UseVisualStyleBackColor = true;
            // 
            // PartTimeRB
            // 
            PartTimeRB.AutoSize = true;
            helpProvider1.SetHelpString(PartTimeRB, "If you want parttime work");
            PartTimeRB.Location = new Point(362, 30);
            PartTimeRB.Margin = new Padding(5);
            PartTimeRB.Name = "PartTimeRB";
            helpProvider1.SetShowHelp(PartTimeRB, true);
            PartTimeRB.Size = new Size(133, 36);
            PartTimeRB.TabIndex = 1;
            PartTimeRB.TabStop = true;
            PartTimeRB.Text = "Parttime";
            toolTip1.SetToolTip(PartTimeRB, "If you want parttime work");
            PartTimeRB.UseVisualStyleBackColor = true;
            // 
            // FullTimeRB
            // 
            FullTimeRB.AutoSize = true;
            helpProvider1.SetHelpString(FullTimeRB, "If you want fulltime work");
            FullTimeRB.Location = new Point(23, 34);
            FullTimeRB.Margin = new Padding(5);
            FullTimeRB.Name = "FullTimeRB";
            helpProvider1.SetShowHelp(FullTimeRB, true);
            FullTimeRB.Size = new Size(131, 36);
            FullTimeRB.TabIndex = 0;
            FullTimeRB.TabStop = true;
            FullTimeRB.Text = "Fulltime";
            toolTip1.SetToolTip(FullTimeRB, "If you want fulltime work");
            FullTimeRB.UseVisualStyleBackColor = true;
            // 
            // CVtextBox
            // 
            helpProvider1.SetHelpString(CVtextBox, "All your data");
            CVtextBox.Location = new Point(37, 952);
            CVtextBox.Margin = new Padding(5);
            CVtextBox.Name = "CVtextBox";
            helpProvider1.SetShowHelp(CVtextBox, true);
            CVtextBox.Size = new Size(1216, 233);
            CVtextBox.TabIndex = 19;
            CVtextBox.Text = "";
            toolTip1.SetToolTip(CVtextBox, "All your data");
            // 
            // CVLabel
            // 
            CVLabel.AutoSize = true;
            CVLabel.Location = new Point(37, 915);
            CVLabel.Margin = new Padding(5, 0, 5, 0);
            CVLabel.Name = "CVLabel";
            helpProvider1.SetShowHelp(CVLabel, true);
            CVLabel.Size = new Size(102, 32);
            CVLabel.TabIndex = 20;
            CVLabel.Text = "All Data:";
            // 
            // SaveButton
            // 
            helpProvider1.SetHelpString(SaveButton, "Button for saving your info");
            SaveButton.Location = new Point(37, 1197);
            SaveButton.Margin = new Padding(5);
            SaveButton.Name = "SaveButton";
            helpProvider1.SetShowHelp(SaveButton, true);
            SaveButton.Size = new Size(250, 46);
            SaveButton.TabIndex = 21;
            SaveButton.Text = "Save";
            toolTip1.SetToolTip(SaveButton, "Button for saving your info");
            SaveButton.UseVisualStyleBackColor = true;
            SaveButton.Click += SaveButton_Click;
            // 
            // ClearButton
            // 
            helpProvider1.SetHelpString(ClearButton, "Button for clearing form");
            ClearButton.Location = new Point(299, 1197);
            ClearButton.Margin = new Padding(5);
            ClearButton.Name = "ClearButton";
            helpProvider1.SetShowHelp(ClearButton, true);
            ClearButton.Size = new Size(250, 46);
            ClearButton.TabIndex = 22;
            ClearButton.Text = "Clear";
            toolTip1.SetToolTip(ClearButton, "Button for clearing form");
            ClearButton.UseVisualStyleBackColor = true;
            ClearButton.Click += ClearButton_Click;
            // 
            // CancelButton
            // 
            helpProvider1.SetHelpString(CancelButton, "Button for closing form");
            CancelButton.Location = new Point(1006, 1197);
            CancelButton.Margin = new Padding(5);
            CancelButton.Name = "CancelButton";
            helpProvider1.SetShowHelp(CancelButton, true);
            CancelButton.Size = new Size(250, 46);
            CancelButton.TabIndex = 23;
            CancelButton.Text = "Close";
            toolTip1.SetToolTip(CancelButton, "Button for closing form");
            CancelButton.UseVisualStyleBackColor = true;
            CancelButton.Click += CancelButton_Click;
            // 
            // helpProvider1
            // 
            helpProvider1.HelpNamespace = "D:\\Projects\\C#\\Practice_CSharp\\Tema24\\task4help.txt";
            // 
            // button1
            // 
            helpProvider1.SetHelpString(button1, "Button for help menu");
            button1.Location = new Point(559, 1197);
            button1.Margin = new Padding(5);
            button1.Name = "button1";
            helpProvider1.SetShowHelp(button1, true);
            button1.Size = new Size(250, 46);
            button1.TabIndex = 24;
            button1.Text = "Help";
            toolTip1.SetToolTip(button1, "Button for help menu");
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(13F, 32F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1300, 1253);
            Controls.Add(button1);
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
            FormBorderStyle = FormBorderStyle.FixedDialog;
            HelpButton = true;
            Margin = new Padding(5);
            MaximizeBox = false;
            MinimizeBox = false;
            Name = "Form1";
            helpProvider1.SetShowHelp(this, true);
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
        private HelpProvider helpProvider1;
        private Button button1;
        private ToolTip toolTip1;
        private Label label1;
    }
}
