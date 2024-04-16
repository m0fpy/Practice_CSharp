namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите курс доллара: ");
            double dollarER = double.Parse(Console.ReadLine());

            for (int d = 5; d <= 500; d += 5)
            {
                double dollarsToByn = d * dollarER;

                Console.WriteLine($"{d} долларов = {dollarsToByn} белорусских рублей");
            }
        }
    }
}
