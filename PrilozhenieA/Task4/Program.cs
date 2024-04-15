namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите начальную скорость v0:");
            double velocity0 = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Введите ускорение a:");
            double acceleration = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Введите время t:");
            double time = Convert.ToDouble(Console.ReadLine());

            double distance = velocity0 * time + 0.5 * acceleration * time * time;
            double velocity = velocity0 + acceleration * time;

            Console.WriteLine($"Расстояние S, пройденное телом за время t: {distance}");
            Console.WriteLine($"Скорость v тела через время t: {velocity}");
        }
    }
}
