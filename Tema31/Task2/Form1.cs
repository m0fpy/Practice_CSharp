using System;
using System.Data;
using System.Windows.Forms;
using System.Data.SQLite;

namespace Task2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            LoadTourists();
        }

        public SQLiteConnection CreateConnection()
        {
            string connectionString = "Data Source=../../../DBTur_firm.db;Version=3;";
            SQLiteConnection conn = new SQLiteConnection(connectionString);
            return conn;
        }

        private void LoadTourists()
        {
            using (SQLiteConnection conn = CreateConnection())
            {
                conn.Open();
                string query = "SELECT * FROM Туристы";
                SQLiteDataAdapter da = new SQLiteDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);
                dataGridView1.DataSource = dt;

                textBox1.DataBindings.Clear();
                textBox2.DataBindings.Clear();
                textBox3.DataBindings.Clear();

                textBox1.DataBindings.Add("Text", dt, "Имя");
                textBox2.DataBindings.Add("Text", dt, "Фамилия");
                textBox3.DataBindings.Add("Text", dt, "Отчество");
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            using (SQLiteConnection conn = CreateConnection())
            {
                conn.Open();
                string query = "SELECT * FROM Туры";
                SQLiteDataAdapter da = new SQLiteDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);
                dataGridView2.DataSource = dt;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            if (dataGridView2.DataSource == null)
            {
                MessageBox.Show("Сначала добавьте данные во второй DataGridView");
                return;
            }

            using (DeleteTourForm deleteForm = new DeleteTourForm())
            {
                if (deleteForm.ShowDialog() == DialogResult.OK)
                {
                    string tourCode = deleteForm.TourCode;

                    if (string.IsNullOrWhiteSpace(tourCode))
                    {
                        MessageBox.Show("Код тура не может быть пустым");
                        return;
                    }

                    using (SQLiteConnection conn = CreateConnection())
                    {
                        conn.Open();
                        string query = "DELETE FROM Туры WHERE Код_тура = @Код_тура";
                        using (SQLiteCommand cmd = new SQLiteCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@Код_тура", tourCode);
                            int rowsAffected = cmd.ExecuteNonQuery();

                            if (rowsAffected > 0)
                            {
                                MessageBox.Show("Тур успешно удален");
                            }
                            else
                            {
                                MessageBox.Show("Тур с указанным кодом не найден");
                            }
                        }
                    }

                    button1_Click(sender, e);
                }
            }
        }


        private void button3_Click(object sender, EventArgs e)
        {
            using (AddTouristForm addForm = new AddTouristForm())
            {
                if (addForm.ShowDialog() == DialogResult.OK)
                {
                    string firstName = addForm.FirstName;
                    string lastName = addForm.LastName;
                    string middleName = addForm.MiddleName;

                    if (string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName) || string.IsNullOrWhiteSpace(middleName))
                    {
                        MessageBox.Show("Все поля должны быть заполнены");
                        return;
                    }

                    using (SQLiteConnection conn = CreateConnection())
                    {
                        conn.Open();
                        string query = "INSERT INTO Туристы (Имя, Фамилия, Отчество) VALUES (@Имя, @Фамилия, @Отчество)";
                        using (SQLiteCommand cmd = new SQLiteCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@Имя", firstName);
                            cmd.Parameters.AddWithValue("@Фамилия", lastName);
                            cmd.Parameters.AddWithValue("@Отчество", middleName);
                            cmd.ExecuteNonQuery();
                        }
                    }

                    LoadTourists();
                }
            }
        }


        private void button4_Click(object sender, EventArgs e)
        {
            using (EditTouristForm updateForm = new EditTouristForm())
            {
                if (updateForm.ShowDialog() == DialogResult.OK)
                {
                    string touristCode = updateForm.TouristCode;
                    string firstName = updateForm.FirstName;
                    string lastName = updateForm.LastName;
                    string middleName = updateForm.MiddleName;

                    if (string.IsNullOrWhiteSpace(touristCode) || string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName) || string.IsNullOrWhiteSpace(middleName))
                    {
                        MessageBox.Show("Все поля должны быть заполнены");
                        return;
                    }

                    using (SQLiteConnection conn = CreateConnection())
                    {
                        conn.Open();
                        string query = "UPDATE Туристы SET Имя = @Имя, Фамилия = @Фамилия, Отчество = @Отчество WHERE Код_туриста = @Код_туриста";
                        using (SQLiteCommand cmd = new SQLiteCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@Код_туриста", touristCode);
                            cmd.Parameters.AddWithValue("@Имя", firstName);
                            cmd.Parameters.AddWithValue("@Фамилия", lastName);
                            cmd.Parameters.AddWithValue("@Отчество", middleName);
                            int rowsAffected = cmd.ExecuteNonQuery();

                            if (rowsAffected > 0)
                            {
                                MessageBox.Show("Данные туриста успешно обновлены");
                            }
                            else
                            {
                                MessageBox.Show("Турист с указанным кодом не найден");
                            }
                        }
                    }

                    LoadTourists();
                }
            }
        }

    }
}
