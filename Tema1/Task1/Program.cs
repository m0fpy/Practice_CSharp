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
            double shag = double.Parse(Console.ReadLine());

            double functionY;

            for (double x = borderLeft; x < borderRight ; x += shag)
            {
                if (x <= Math.PI)
                {
                    functionY = x + 2 * x * Math.Sin(3 * x);
                }
                else
                {
                    functionY = Math.Cos(x) + 2;
                }

                Console.WriteLine($"y = {functionY:F2}, при х = {x:F2}");
            }

        }
    }
}
