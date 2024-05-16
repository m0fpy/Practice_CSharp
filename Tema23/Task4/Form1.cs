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
                case "К":
                    newControl = new Button();
                    ((Button)newControl).Text = "Новая кнопка";
                    ((Button)newControl).Click += (s, ev) =>
                    {
                        MessageBox.Show("Кнопка нажата!");
                    };
                    break;
                case "П":
                    newControl = new TextBox();
                    ((TextBox)newControl).Text = "Новое поле ввода";
                    break;
                case "М":
                    newControl = new Label();
                    ((Label)newControl).Text = "Новая метка";
                    break;
                default:
                    MessageBox.Show("Неправильный тип элемента управления.");
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
