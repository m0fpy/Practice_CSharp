namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Thread thread1 = new Thread(() => CalculateSum(1, 10));
            Thread thread2 = new Thread(() => CalculateSum(1, 10));

            DateTime startTime = DateTime.Now;

            thread1.Start();
            thread2.Start();

            thread1.Join();
            thread2.Join();

            DateTime endTime = DateTime.Now;
            TimeSpan elapsedTime = endTime - startTime;

            Console.WriteLine($"Затраченное время: {elapsedTime.TotalMilliseconds} милисекунд");
        }

        static void CalculateSum(int start, int end)
        {
            int sum = 0;
            for (int i = start; i <= end; i++)
            {
                sum += i;
            }
            Console.WriteLine($"Cумма: {sum}");
        }
    }
}
