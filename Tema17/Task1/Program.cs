using FiguresLibrary;

namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Triangle triangle = new();

                Console.WriteLine($"Тип треугольника - {triangle.Type()}");
                Console.WriteLine($"Периметр треугольника - {triangle.Perimeter()}");
                Console.WriteLine($"Площадь треугольника - {triangle.Area()}");

                Rectangle rectangle = new();

                Console.WriteLine($"Площадь прямоугольника - {rectangle.Area()}");
                Console.WriteLine($"Периметр прямоугольника - {rectangle.Perimeter()}");
            }
            catch (ArgumentException ex)
            { 
                Console.WriteLine(ex.Message);
            }
        }
    }
}
