namespace Task5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите стоимость 1 кг. конфет: ");
            int cost = int.Parse(Console.ReadLine());

            if (cost < 1 || cost > 100)
            {
                Console.WriteLine("Некорректные данные");
                return;
            }

            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"Стоимсоть {i} кг. конфет = {cost * i}");
            }
        }
    }
}
