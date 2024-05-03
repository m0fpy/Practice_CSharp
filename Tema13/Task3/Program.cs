namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            MyInfo myInfo = new MyInfo();

            myInfo.NameChanged += MyInfo_NameChanged;

            Console.WriteLine("Введите новое имя: ");
            string newName = Console.ReadLine();

            myInfo.Name = newName;
        }

        static void MyInfo_NameChanged(object sender, EventArgs e)
        {
            Console.WriteLine("Значение поля name было изменено.");
        }
    }
}
