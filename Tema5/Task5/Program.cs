namespace Task5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Введите значение переменной N: ");
                int numN = int.Parse(Console.ReadLine());

                if (numN < 0)
                {
                    throw new ArgumentException("Значение N должно быть положительным.");
                }

                double functionValue = (double)CalculateFactorial(numN + 2) / CalculateFactorial(numN + 4);

                Console.WriteLine($"Значение функции: {functionValue:F3}");
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }   

        static int CalculateFactorial(int n)
        {
            if (n <= 1)
            {
                return 1;
            }
            else
            {
                return n * CalculateFactorial(n - 1);
            }
        }
    }
}
