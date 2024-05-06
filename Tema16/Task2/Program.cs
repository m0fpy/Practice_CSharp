namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string path = @"D:\New_folder";

            try
            {
                Directory.CreateDirectory(path);
                Console.WriteLine("Папка успешно создана.");
            }
            catch (Exception e)
            {
                Console.WriteLine("Ошибка при создании папки: " + e.Message);
            }
        }
    }
}
