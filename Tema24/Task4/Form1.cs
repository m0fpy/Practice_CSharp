using System.Windows.Forms;

namespace Task4
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void SaveButton_Click(object sender, EventArgs e)
        {
            TextBox[] textBoxes = { NameTextBox, SurnameTextBox, MiddleNameTextBox, emailTextBox, phoneBox };
            ComboBox[] comboBoxes = { LocationTextBox, operatorBox };
            RadioButton[] radioButtons = { MaleRadioButton, FemaleRadioButton };
            RadioButton[] workExpRadioButtons = { NoWorkRB, LessThen1RB, From1To5RB, From5To9RB, MoreThen10RB };
            CheckBox[] categoryCheckboxes = { categoryA, categoryB, categoryC, categoryD };
            RadioButton[] workGraphicRadioButtons = { FullTimeRB, PartTimeRB, WorkAtHomeRB, TimeWorkRB };
            NumericUpDown[] numericUpDowns = { FromSalary, ToSalary };

            string GetSelectedRadioButtonText(RadioButton[] radioButtons)
            {
                foreach (RadioButton radioButton in radioButtons)
                {
                    if (radioButton.Checked)
                    {
                        return radioButton.Text;
                    }
                }
                return "";
            }

            string GetSelectedCheckBoxText(CheckBox[] checkBoxes)
            {
                string result = "";
                foreach (CheckBox checkBox in checkBoxes)
                {
                    if (checkBox.Checked)
                    {
                        result += checkBox.Text;
                    }
                }
                return result;
            }

            string[] textBoxValues = textBoxes.Select(textBox => textBox.Text).ToArray();

            string[] comboBoxValues = comboBoxes.Select(comboBox => comboBox.Text).ToArray();

            string sex = GetSelectedRadioButtonText(radioButtons);
            string dateOfBirth = DateBirtPicker.Text;

            string workExp = GetSelectedRadioButtonText(workExpRadioButtons);
            if (workExp == "")
            {
                MessageBox.Show("Не выбран опыт работы!!");
                return;
            }

            string driveCategory = GetSelectedCheckBoxText(categoryCheckboxes);

            string workGraphic = GetSelectedRadioButtonText(workGraphicRadioButtons);
            if (workGraphic == "")
            {
                MessageBox.Show("Выберите график работы!!");
                return;
            }

            string salaryFrom = Convert.ToString(FromSalary.Value);
            string salaryTo = Convert.ToString(ToSalary.Value);

            CVtextBox.AppendText($"Имя: {textBoxValues[0]}\n");
            CVtextBox.AppendText($"Фамилия: {textBoxValues[1]}\n");
            CVtextBox.AppendText($"Отчество: {textBoxValues[2]}\n");
            CVtextBox.AppendText($"Пол: {sex}\n");
            CVtextBox.AppendText($"Дата рождения: {dateOfBirth}\n");
            CVtextBox.AppendText($"Местоположение: {comboBoxValues[0]}\n");
            CVtextBox.AppendText($"Email: {textBoxValues[3]}\n");
            CVtextBox.AppendText($"Телефон: {textBoxValues[4]}\n");
            CVtextBox.AppendText($"Телефонный оператор: {comboBoxValues[1]}\n");
            CVtextBox.AppendText($"Опыт работы: {workExp}\n");
            CVtextBox.AppendText($"Собственный автомобиль: {(haveAuto.Checked ? "Да" : "Нет")}\n");
            CVtextBox.AppendText($"Водительское удостоверение: {(driveLicense.Checked ? "Да" : "Нет")}\n");
            CVtextBox.AppendText($"Категории водительских прав: {driveCategory}\n");
            CVtextBox.AppendText($"Зарплата от: {salaryFrom}\n");
            CVtextBox.AppendText($"Зарплата до: {salaryTo}\n");
            CVtextBox.AppendText($"График работы: {workGraphic}\n");
        }

        private void ClearButton_Click(object sender, EventArgs e)
        {
            TextBox[] textBoxes = { NameTextBox, SurnameTextBox, MiddleNameTextBox, emailTextBox, phoneBox };
            ComboBox[] comboBoxes = { LocationTextBox, operatorBox };
            RadioButton[] radioButtons = { MaleRadioButton, FemaleRadioButton };
            RadioButton[] workExpRadioButtons = { NoWorkRB, LessThen1RB, From1To5RB, From5To9RB, MoreThen10RB };
            CheckBox[] categoryCheckboxes = { categoryA, categoryB, categoryC, categoryD };
            RadioButton[] workGraphicRadioButtons = { FullTimeRB, PartTimeRB, WorkAtHomeRB, TimeWorkRB };
            NumericUpDown[] numericUpDowns = { FromSalary, ToSalary };

            foreach (TextBox textBox in textBoxes)
            {
                textBox.Text = "";
            }

            foreach (ComboBox comboBox in comboBoxes)
            {
                comboBox.SelectedIndex = -1;
            }

            foreach (RadioButton radioButton in radioButtons)
            {
                radioButton.Checked = false;
            }

            foreach (CheckBox checkBox in categoryCheckboxes)
            {
                checkBox.Checked = false;
            }

            foreach (NumericUpDown numericUpDown in numericUpDowns)
            {
                numericUpDown.Value = numericUpDown.Minimum;
            }

            CVtextBox.Clear();
        }

        private void CancelButton_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Help.ShowHelp(this, helpProvider1.HelpNamespace);
        }
    }
}
