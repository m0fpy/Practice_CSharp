namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите левую границу диапазона: ");
            double borderLeft = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите правую границу диапазона: ");
            double borderRight = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите шаг функции: ");
            double step = double.Parse(Console.ReadLine());

            CalculateFunction(borderLeft, borderRight, step);
        }

        static void CalculateFunction(double borderLeft, double borderRight, double step)
        {
            double functionY;

            for (double i = borderLeft; i <= borderRight; i += step)
            {
                if (3 * i <= 1)
                {
                   functionY = Math.Pow((borderLeft + i), 1.0/3.0) - Math.Log(Math.Pow(i, 3));
                }
                else if (3 * i > 1 && 3 * i <= 10)
                {
                    functionY = 6 * Math.Pow(i, 2) - borderLeft * i;
                }
                else
                {
                    functionY = Math.Pow((borderRight + i), 1.0 / 3.0) + ((borderLeft * borderRight) / Math.Pow(i, 3));
                }

                Console.WriteLine($"y = {functionY:F2}, при х = {i:F2}");
            }
        }
    }
}
