namespace Task4
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

                if (matrixSize < 1)
                {
                    throw new ArgumentException("Размерность матрицы должна быть больше нуля.");
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

                int firstRowSum = CalculateSumInARow(matrix, matrixSize, 0);
                int secondRowSum = CalculateSumInARow(matrix, matrixSize, matrixSize - 2);

                if (firstRowSum > secondRowSum)
                {
                    Console.WriteLine("Сумма первой строки больше.");
                }
                else
                {
                    Console.WriteLine("Сумма предпоследней строки больше.");
                }
            }
            catch(ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        static int CalculateSumInARow(int[,] matrix, int matrixSize, int row)
        {
            int sum = 0;

            for(int i = 0;i < matrixSize; i++)
            {
                sum += matrix[row, i];
            }

            return sum;
        }
    }
}
