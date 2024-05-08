namespace Task10
{
    /// <summary>
    /// Содержит логику программы для работы с файлом чисел.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            Console.WriteLine("Введите количество чисел в файле: ");
            int count = int.Parse(Console.ReadLine());

            GenerateRandomNumbersToFile("numbers.txt", count);

            int max = FindMaxNumber("numbers.txt");
            Console.WriteLine($"Максимальное число: {max}");

            int negativeCount = CountNegativeNumbers("numbers.txt");
            Console.WriteLine($"Количество отрицательных чисел: {negativeCount}");
        }

        /// <summary>
        /// Генерирует случайные числа и записывает их в файл.
        /// </summary>
        /// <param name="fileName">Имя файла для записи.</param>
        /// <param name="count">Количество чисел для генерации.</param>
        static void GenerateRandomNumbersToFile(string fileName, int count)
        {
            Random rand = new Random();
            using (StreamWriter sw = new StreamWriter(fileName))
            {
                for (int i = 0; i < count; i++)
                {
                    sw.WriteLine(rand.Next(-100, 101));
                }
            }
        }

        /// <summary>
        /// Находит максимальное число в файле.
        /// </summary>
        /// <param name="fileName">Имя файла с числами.</param>
        /// <returns>Максимальное число.</returns>
        static int FindMaxNumber(string fileName)
        {
            int max = int.MinValue;
            using (StreamReader sr = new StreamReader(fileName))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    int number = int.Parse(line);
                    if (number > max)
                    {
                        max = number;
                    }
                }
            }
            return max;
        }

        /// <summary>
        /// Подсчитывает количество отрицательных чисел в файле.
        /// </summary>
        /// <param name="fileName">Имя файла с числами.</param>
        /// <returns>Количество отрицательных чисел.</returns>
        static int CountNegativeNumbers(string fileName)
        {
            int count = 0;
            using (StreamReader sr = new StreamReader(fileName))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    int number = int.Parse(line);
                    if (number < 0)
                    {
                        count++;
                    }
                }
            }
            return count;
        }
    }
}
