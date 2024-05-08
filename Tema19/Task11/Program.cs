namespace Task11
{
    /// <summary>
    /// Содержит логику программы для создания папки.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
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
