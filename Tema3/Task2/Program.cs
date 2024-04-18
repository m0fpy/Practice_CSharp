namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите значение А: ");
            double numA = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение B: ");
            double numB = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение C: ");
            double numC = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение D: ");
            double numD = double.Parse(Console.ReadLine());

            Swap(ref numA, ref numB);
            Swap(ref numC, ref numD);
            Swap(ref numB, ref numC);


            Console.WriteLine($"Значение А: {numA}, Значение B: {numB}, Значение C: {numC}, Значение D: {numD}");
        }

        static void Swap(ref double x, ref double y)
        {
            (x, y) = (y, x);
        }
    }
}
