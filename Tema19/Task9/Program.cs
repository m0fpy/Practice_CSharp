namespace Task9
{
    /// <summary>
    /// Содержит логику программы для вычисления среднего значения результатов вызовов делегатов.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Делегат для генерации случайных чисел.
        /// </summary>
        /// <returns>Случайное целое число.</returns>
        delegate int RandomDelegate();

        /// <summary>
        /// Делегат для вычисления среднего значения результатов вызовов делегатов.
        /// </summary>
        /// <param name="delegates">Массив делегатов для вычисления среднего значения.</param>
        /// <returns>Среднее значение результатов.</returns>
        delegate double AverageDelegateResults(RandomDelegate[] delegates);

        /// <summary>
        /// Генератор случайных чисел.
        /// </summary>
        static Random random = new Random();

        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            // Массив делегатов для генерации случайных чисел
            RandomDelegate[] delegates =
            {
                () => random.Next(1000),
                () => random.Next(2000),
                () => random.Next(100)
            };

            // Инициализация делегата для вычисления среднего значения
            AverageDelegateResults averageDelegateResults = delegate (RandomDelegate[] delegateArray)
            {
                return delegateArray.Select(del => del()).Average();
            };

            // Вычисление и вывод среднего значения
            double average = averageDelegateResults(delegates);
            Console.WriteLine($"Среднее арифметическое: {average:F3}");
        }
    }
}
