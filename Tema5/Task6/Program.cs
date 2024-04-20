namespace Task6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int matrixSize = 7;
            int[,] matrix = new int[matrixSize, matrixSize];

            FillMatrix(matrix, 0, 0, matrixSize, 1);

            for (int i = 0; i < matrixSize; i++)
            {
                for (int j = 0; j < matrixSize; j++)
                {
                    Console.Write($"{matrix[i, j]} ");
                }
                Console.WriteLine();
            }
        }

        static void FillMatrix(int[,] matrix, int startRow, int startCol, int size, int num)
        {
            if (size <= 0)
                return;

            for (int i = 0; i < size; i++)
                matrix[startRow, startCol + i] = num++;

            for (int i = 1; i < size; i++)
                matrix[startRow + i, startCol + size - 1] = num++;

            for (int i = size - 2; i >= 0; i--)
                matrix[startRow + size - 1, startCol + i] = num++;

            for (int i = size - 2; i > 0; i--)
                matrix[startRow + i, startCol] = num++;

            FillMatrix(matrix, startRow + 1, startCol + 1, size - 2, num);
        }
    }
}
