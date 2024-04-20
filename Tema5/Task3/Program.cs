using System.Reflection.Metadata;

namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Random rnd = new Random();

                Console.WriteLine("Введите размерность матрицы: ");
                int matrixSize = int.Parse(Console.ReadLine());

                if (matrixSize > 10 || matrixSize < 1)
                {
                    throw new ArgumentException("Размерность матрицы должна быть в диапазоне от 1 до 10");
                }

                int[,] matrix = new int[matrixSize, matrixSize];

                Console.WriteLine("Введите диапазон значений для заполнения матрицы:");
                int borderLeft = int.Parse(Console.ReadLine());
                int borderRight = int.Parse(Console.ReadLine());

                if (borderLeft > borderRight)
                {
                    (borderLeft, borderRight) = (borderRight, borderLeft);
                }

                Console.WriteLine("Матрица: ");
                for (int i = 0; i < matrixSize; i++)
                {
                    for (int j = 0; j < matrixSize; j++)
                    {
                        matrix[i, j] = rnd.Next(borderLeft, borderRight);
                        Console.Write($"{matrix[i, j]} ");
                    }
                    Console.WriteLine();
                }

                Console.WriteLine("Введите значение параметра G: ");
                int parameterG = int.Parse(Console.ReadLine());

                int biggerThenGCount = CountBiggerThenG(matrix, matrixSize, parameterG);

                Console.WriteLine($"Количество элементов больше G = {biggerThenGCount}");

                Console.WriteLine("Введите номер строки для подсчета четных элементов: ");
                int row = int.Parse(Console.ReadLine());

                if (row > matrixSize || row < 1)
                {
                    throw new ArgumentException("Такой строки в матрице не существует");
                }

                int evenCounter = CountEvenInRow(matrix, matrixSize, row);
                Console.WriteLine($"Количество четных элементов в строке {row} = {evenCounter}");
            }
            catch(ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        static int CountBiggerThenG(int[,] matrix, int matrixSize, int g)
        {
            int counter = 0;
            for (int i = 0; i < matrixSize; i++)
            {
                for (int j = 0; j < matrixSize; j++)
                {
                    if (matrix[i, j] > g)
                    {
                        counter++;
                    }
                }
            }
            return counter;
        }

        static int CountEvenInRow(int[,] matrix, int matrixSize, int row)
        {
            int counter = 0;

            for (int i = 0; i < matrixSize; i++)
            {
                if (matrix[row, i] % 2 == 0)
                {
                    counter++;
                }
            }

            return counter;
        }
    }
}
