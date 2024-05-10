namespace Task4
{
    internal class Program
    {
        const int ARGUMENT_A = -6;
        const int ARGUMENT_B = 6;

        static void Main(string[] args)
        {
            Parallel.For(ARGUMENT_A, ARGUMENT_B + 1, i =>
            {
                double result = Math.Sin(i) - Math.Cos(i);
                Console.WriteLine($"Значение функции Sin({i}) - Cos({i}) = {result}");
            });
        }
    }
}
