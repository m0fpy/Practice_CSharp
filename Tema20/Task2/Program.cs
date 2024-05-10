namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите значение аргумента А: ");
            double argA = double.Parse(Console.ReadLine());

            Task[] tasks = new Task[2];

            tasks[0] = Task.Factory.StartNew(() => Console.WriteLine(CalculateFirstFunction(argA)));
            tasks[1] = Task.Factory.StartNew(() => Console.WriteLine(CalculateSecondFunction(argA)));
            Task.WaitAll(tasks);
            Console.WriteLine("Все таски завершились");

            tasks[0] = Task.Factory.StartNew(() => Console.WriteLine(CalculateFirstFunction(argA)));
            tasks[1] = Task.Factory.StartNew(() => Console.WriteLine(CalculateSecondFunction(argA)));
            Task.WaitAny(tasks);
            Console.WriteLine("Хотя бы один таск завершился");

        }

        static double CalculateFirstFunction(double a)
        {
            Thread.Sleep(1000);
            return ((a + 2) / Math.Sqrt(2 * a) - a / Math.Sqrt(2 * a) + 2 / (a - Math.Sqrt(2 * a))) / ((Math.Sqrt(a) - Math.Sqrt(2) / (a + 2)));
        }

        static double CalculateSecondFunction(double a)
        {
            Thread.Sleep(2000);
            return 1 / (Math.Sqrt(a) + Math.Sqrt(2));
        }
    }
}
