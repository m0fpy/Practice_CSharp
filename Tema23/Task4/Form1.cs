namespace Task4
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string controlType = textBox1.Text;
            int x = int.Parse(textBox2.Text);
            int y = int.Parse(textBox3.Text);

            Control newControl = null;
            switch (controlType)
            {
                case "�":
                    newControl = new Button();
                    ((Button)newControl).Text = "����� ������";
                    ((Button)newControl).Click += (s, ev) =>
                    {
                        MessageBox.Show("������ ������!");
                    };
                    break;
                case "�":
                    newControl = new TextBox();
                    ((TextBox)newControl).Text = "����� ���� �����";
                    break;
                case "�":
                    newControl = new Label();
                    ((Label)newControl).Text = "����� �����";
                    break;
                default:
                    MessageBox.Show("������������ ��� �������� ����������.");
                    return;
            }

            newControl.Location = new Point(x, y);
            Controls.Add(newControl);

            newControl.MouseEnter += (s, ev) =>
            {
                Controls.Remove(newControl);
            };
        }
    }
}
