namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            QuadraticEquation eq1 = new QuadraticEquation(1, 2, 1);
            QuadraticEquation eq2 = new QuadraticEquation(2, -1, -3);

            Console.WriteLine(eq1.Display());
            Console.WriteLine(eq2.Display());

            Console.WriteLine(eq2.GetResultForArgument(5));

            QuadraticEquation sum = eq1 + eq2;
            Console.WriteLine("Сумма многочленов:");
            Console.WriteLine(sum.Display());

            QuadraticEquation diff = eq1 - eq2;
            Console.WriteLine("\nРазность многочленов:");
            Console.WriteLine(diff.Display());

            QuadraticEquation product = eq1 * eq2;
            Console.WriteLine("\nПроизведение многочленов:");
            Console.WriteLine(product.Display());

            Console.WriteLine(eq1.ToString());
        }
    }
}
