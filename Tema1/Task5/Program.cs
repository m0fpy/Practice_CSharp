namespace Task5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите стоимость 1 кг. конфет: ");

            int cost = int.Parse(Console.ReadLine());

            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"Стоимсоть {i} кг. конфет = {cost * i}");
            }
        }
    }
}
