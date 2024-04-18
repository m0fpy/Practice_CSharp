namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Matrix matrix1 = new Matrix(5, 5);

            Console.WriteLine("Изначальная матрица: ");
            Console.WriteLine(matrix1);

            Matrix sumOfMatrix = matrix1 + 2;

            Console.WriteLine("Матрица просле сложения со столбцом 2: ");
            Console.WriteLine(sumOfMatrix);
        }
    }
}
