namespace Task1
{
    internal class Program
    {
        static readonly object lockObject = new();

        static void Main(string[] args)
        {
            Thread firstThread = new Thread(() => PrintNumbers(0, 10));
            Thread secondThread = new Thread(() => PrintNumbers(10, 20));
            Thread thirdThread = new Thread(() => PrintNumbers(20, 30));

            firstThread.Start();
            secondThread.Start();
            thirdThread.Start();
        }

        static void PrintNumbers(int start, int end)
        {
            for (int i = start; i < end; i++)
            {
                lock (lockObject)
                {
                    Console.Write($"{i}, ");
                }
                Thread.Sleep(100);
            }
        }
    }
}
