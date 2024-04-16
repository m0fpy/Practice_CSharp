namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите курс доллара: ");
            double dollarER = double.Parse(Console.ReadLine());

            //Решение через for
            for (int d = 5; d <= 500; d += 5)
            {
                double dollarsToByn = d * dollarER;

                Console.WriteLine($"{d} долларов = {dollarsToByn} белорусских рублей");
            }

            int dollarCount = 5;
            //Решение через do/while
            do
            {
                double dollarsToByn = dollarCount * dollarER;
                Console.WriteLine($"{dollarCount} долларов = {dollarsToByn} белорусских рублей");
                dollarCount += 5;
            }
            while ( dollarCount != 500);

            //Решение через while
            while (dollarCount <= 500)
            {
                double dollarsToByn = dollarCount * dollarER;
                Console.WriteLine($"{dollarCount} долларов = {dollarsToByn} белорусских рублей");
                dollarCount += 5;
            }

        }
    }
}
