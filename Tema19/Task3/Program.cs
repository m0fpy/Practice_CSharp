namespace Task3
{
    /// <summary>
    /// Содержит логику программы для работы с матрицами.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            Matrix matrix1 = new Matrix(5, 5);

            Console.WriteLine("Изначальная матрица: ");
            Console.WriteLine(matrix1);

            Matrix sumOfMatrix = matrix1 + 2;

            Console.WriteLine("Матрица после сложения с числом 2: ");
            Console.WriteLine(sumOfMatrix);
        }
    }
}
