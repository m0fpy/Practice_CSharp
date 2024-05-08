namespace Task14
{
    /// <summary>
    /// Содержит логику программы для работы с файлами.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            string f1FileName = "f1.dat";
            string f2FileName = "f2.dat";

            CreateRandomFile(f1FileName);
            CreateRandomFile(f2FileName);

            int closestNumber = FindClosestNumber(f1FileName, f2FileName);
            Console.WriteLine($"Число, наиболее близкое к минимальному значению в файле f1.dat: {closestNumber}");

            (int f1Positive, int f1Negative, int f1Zero) = CountPositiveNegativeZeroValues(f1FileName);
            (int f2Positive, int f2Negative, int f2Zero) = CountPositiveNegativeZeroValues(f2FileName);

            Console.WriteLine($"В файле f1.dat: положительных - {f1Positive}, отрицательных - {f1Negative}, нулевых - {f1Zero}");
            Console.WriteLine($"В файле f2.dat: положительных - {f2Positive}, отрицательных - {f2Negative}, нулевых - {f2Zero}");

            bool f1IsOrdered = CheckIfOrdered(f1FileName);
            if (f1IsOrdered)
                Console.WriteLine("Числа в файле f1.dat упорядочены по возрастанию.");
            else
                Console.WriteLine("Числа в файле f1.dat не упорядочены по возрастанию.");

            bool f1IsAlternating = CheckIfAlternatingSequence(f1FileName);
            if (f1IsAlternating)
                Console.WriteLine("Числа в файле f1.dat образуют знакопеременную последовательность.");
            else
                Console.WriteLine("Числа в файле f1.dat не образуют знакопеременную последовательность.");
        }

        /// <summary>
        /// Создает файл со случайными числами.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        static void CreateRandomFile(string fileName)
        {
            Random random = new Random();
            int[] numbers = Enumerable.Range(1, 10).Select(_ => random.Next(-100, 100)).ToArray();
            File.WriteAllLines(fileName, numbers.Select(x => x.ToString()));
            Console.WriteLine($"Файл {fileName} создан.");
        }

        /// <summary>
        /// Находит число, наиболее близкое к минимальному значению в файле.
        /// </summary>
        /// <param name="f1FileName">Имя первого файла.</param>
        /// <param name="f2FileName">Имя второго файла.</param>
        /// <returns>Число, наиболее близкое к минимальному значению в файле f1.dat.</returns>
        static int FindClosestNumber(string f1FileName, string f2FileName)
        {
            int[] f1Numbers = File.ReadAllLines(f1FileName).Select(int.Parse).ToArray();
            int[] f2Numbers = File.ReadAllLines(f2FileName).Select(int.Parse).ToArray();

            int minF1Number = f1Numbers.Min();
            return f2Numbers.OrderBy(x => Math.Abs(x - minF1Number)).First();
        }

        /// <summary>
        /// Подсчитывает количество положительных, отрицательных и нулевых значений в файле.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <returns>Кортеж, содержащий количество положительных, отрицательных и нулевых значений.</returns>
        static (int, int, int) CountPositiveNegativeZeroValues(string fileName)
        {
            int[] numbers = File.ReadAllLines(fileName).Select(int.Parse).ToArray();
            int positiveCount = numbers.Count(x => x > 0);
            int negativeCount = numbers.Count(x => x < 0);
            int zeroCount = numbers.Count(x => x == 0);
            return (positiveCount, negativeCount, zeroCount);
        }

        /// <summary>
        /// Проверяет, упорядочены ли числа в файле по возрастанию.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <returns>Значение true, если числа упорядочены по возрастанию, в противном случае - false.</returns>
        static bool CheckIfOrdered(string fileName)
        {
            int[] numbers = File.ReadAllLines(fileName).Select(int.Parse).ToArray();
            return numbers.SequenceEqual(numbers.OrderBy(x => x));
        }

        /// <summary>
        /// Проверяет, образуют ли числа в файле знакопеременную последовательность.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <returns>Значение true, если числа образуют знакопеременную последовательность, в противном случае - false.</returns>
        static bool CheckIfAlternatingSequence(string fileName)
        {
            int[] numbers = File.ReadAllLines(fileName).Select(int.Parse).ToArray();
            for (int i = 0; i < numbers.Length - 1; i++)
            {
                if ((numbers[i] >= 0 && numbers[i + 1] >= 0) || (numbers[i] < 0 && numbers[i + 1] < 0))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
