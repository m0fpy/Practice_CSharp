using System;

namespace Task1
{
    /// <summary>
    /// Содержит логику программы для вычисления функции на основе параметров, заданных пользователем.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            Console.WriteLine("Введите левую границу диапазона: ");
            double borderLeft = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите правую границу диапазона: ");
            double borderRight = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите шаг функции: ");
            double step = double.Parse(Console.ReadLine());

            CalculateFunction(borderLeft, borderRight, step);
        }

        /// <summary>
        /// Вычисляет значение функции для каждого значения 'x' в указанном диапазоне и с шагом.
        /// </summary>
        /// <param name="borderLeft">Левая граница диапазона.</param>
        /// <param name="borderRight">Правая граница диапазона.</param>
        /// <param name="step">Шаг между последовательными значениями 'x'.</param>
        static void CalculateFunction(double borderLeft, double borderRight, double step)
        {
            double functionY;

            for (double i = borderLeft; i <= borderRight; i += step)
            {
                if (3 * i <= 1)
                {
                    functionY = Math.Pow((borderLeft + i), 1.0 / 3.0) - Math.Log(Math.Pow(i, 3));
                }
                else if (3 * i > 1 && 3 * i <= 10)
                {
                    functionY = 6 * Math.Pow(i, 2) - borderLeft * i;
                }
                else
                {
                    functionY = Math.Pow((borderRight + i), 1.0 / 3.0) + ((borderLeft * borderRight) / Math.Pow(i, 3));
                }

                Console.WriteLine($"y = {functionY:F2}, при х = {i:F2}");
            }
        }
    }
}
