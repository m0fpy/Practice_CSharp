namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("a = ");
            double num_a = double.Parse(Console.ReadLine());

            Console.Write("b = ");
            double num_b = double.Parse(Console.ReadLine());

            double sum = num_a + num_b;

            Console.WriteLine($"{num_a:F2} + {num_b:F2} = {sum:F2}");
        }
    }
}
