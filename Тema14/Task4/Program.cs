namespace Task4
{
    internal class Program
    {
        static int totalSum = 0;

        static void Main(string[] args)
        {
            Random rnd = new Random();
            int[] numbersArray = new int[rnd.Next(5, 30)];

            for (int i = 0; i < numbersArray.Length; i++)
            {
                numbersArray[i] = rnd.Next(-100, 100);
            }

            int threadCount = Environment.ProcessorCount;

            Thread[] threads = new Thread[threadCount];

            int elementsPerThread = numbersArray.Length / threadCount;

            for (int i = 0; i < threadCount; i++)
            {
                int start = i * elementsPerThread;
                int end = (i == threadCount - 1) ? numbersArray.Length : (i + 1) * elementsPerThread;
                threads[i] = new Thread(() => PartialSum(numbersArray, start, end));
                threads[i].Start();
            }

            foreach (var thread in threads)
            {
                thread.Join();
            }

            Console.WriteLine("Сумма четных цифр массива: " + totalSum);
        }

        static void PartialSum(int[] array, int start, int end)
        {
            int partialSum = 0;

            for (int i = start; i < end; i++)
            {
                if (array[i] % 2 == 0)
                {
                    partialSum += array[i];
                }
            }

            Interlocked.Add(ref totalSum, partialSum);
        }
    }
}
