namespace Task3
{
    internal class Program
    {
        private static SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);

        static void Main(string[] args)
        {
            Console.WriteLine("Введите значение числа A: ");
            int numA = int.Parse(Console.ReadLine());

            Console.WriteLine("Введите значение числа N: ");
            int numN = int.Parse(Console.ReadLine());

            Thread firstThread = new Thread(() =>
            {
                SumOfPowers(numA, numN);
                ProductOfPowers(numA, numN);
            });

            Thread secondThread = new Thread(() =>
            {
                SumOfPowers(numA, numN);
                ProductOfPowers(numA, numN);
            });

            firstThread.Start();
            secondThread.Start();
        }

        static void SumOfPowers(int numA, int numN) 
        {
            double result = 0;
            for (int i = 1; i <= numN; i++)
            {
                result += Math.Pow(numA, i);
                Thread.Sleep(100);
            }

            Console.WriteLine(result);
        }

        static void ProductOfPowers(int numA, int numN)
        {
            double result = 1;
            for (int i = 1; i <= numN; i++)
            {
                semaphore.Wait();
                try
                {
                    result *= Math.Pow(numA, i);
                }
                finally
                {
                    semaphore.Release();
                }
                Thread.Sleep(100);
            }

            Console.WriteLine(result);
        }
    }
}
