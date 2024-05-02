namespace Task1
{
    delegate double CalcFigure(double radius);

    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите радиус окружности: ");
            double radius = double.Parse(Console.ReadLine());

            CalcFigure CF = Get_Length;
            Console.WriteLine($"Длина окружности: {CF(radius):F3}");

            CF = Get_Area;
            Console.WriteLine($"Площадь круга:  {CF(radius):F3}");

            CF = Get_Volume;
            Console.WriteLine($"Объем шара: {CF(radius):F3}");
        }

        static double Get_Length(double radius)
        {
            return 2 * Math.PI * radius;
        }

        static double Get_Area(double radius)
        {
            return Math.PI * Math.Pow(radius, 2);
        }

        static double Get_Volume(double radius)
        {
            return (4.0 / 3) * Math.PI * Math.Pow(radius, 3);
        }
    }
}
