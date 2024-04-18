namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите значение параметра a1: ");
            int numA1 = int.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение параметра b1: ");
            int numB1 = int.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение параметра a2: ");
            int numA2 = int.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение параметра b2: ");
            int numB2 = int.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение параметра c2: ");
            int numC2 = int.Parse(Console.ReadLine());

            int min1 = Min(numA1, numB1);
            int min2 = Min(numA2, numB2, numC2);

            Console.WriteLine($"Результат метода без перегрузки = {min1}");
            Console.WriteLine($"Результат метода c перегрузкой = {min2}");

            int result = min1 * min2;

            Console.WriteLine($"Произведение методов = {result}");
        }

        static int Min(int numA, int numB)
        {
            return Math.Min(numA, numB);
        }

        static int Min(int numA, int numB, int numC)
        {
            return Min(Min(numA, numB), numC);
        }
    }
}
