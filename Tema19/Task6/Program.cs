namespace Task6
{
    /// <summary>
    /// Делегат для вычисления параметров фигуры.
    /// </summary>
    /// <param name="radius">Радиус фигуры.</param>
    internal delegate double CalcFigure(double radius);

    /// <summary>
    /// Содержит логику программы для вычисления параметров окружности и круга.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            Console.WriteLine("Введите радиус окружности: ");
            double radius = double.Parse(Console.ReadLine());

            CalcFigure CF = GetLength;
            Console.WriteLine($"Длина окружности: {CF(radius):F3}");

            CF = GetArea;
            Console.WriteLine($"Площадь круга:  {CF(radius):F3}");

            CF = GetVolume;
            Console.WriteLine($"Объем шара: {CF(radius):F3}");
        }

        /// <summary>
        /// Возвращает длину окружности для заданного радиуса.
        /// </summary>
        /// <param name="radius">Радиус окружности.</param>
        /// <returns>Длина окружности.</returns>
        static double GetLength(double radius)
        {
            return 2 * Math.PI * radius;
        }

        /// <summary>
        /// Возвращает площадь круга для заданного радиуса.
        /// </summary>
        /// <param name="radius">Радиус круга.</param>
        /// <returns>Площадь круга.</returns>
        static double GetArea(double radius)
        {
            return Math.PI * Math.Pow(radius, 2);
        }

        /// <summary>
        /// Возвращает объем шара для заданного радиуса.
        /// </summary>
        /// <param name="radius">Радиус шара.</param>
        /// <returns>Объем шара.</returns>
        static double GetVolume(double radius)
        {
            return (4.0 / 3) * Math.PI * Math.Pow(radius, 3);
        }
    }
}
