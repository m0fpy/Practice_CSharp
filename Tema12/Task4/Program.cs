namespace Task4
{
    internal class Program
    {
        delegate int RandomDelegate();
        delegate double AverageDelegateResults(RandomDelegate[] delegates);

        static Random random = new Random();

        static void Main(string[] args)
        {
            RandomDelegate[] delegates =
            [
                () => random.Next(1000),
                () => random.Next(2000),
                () => random.Next(100)
            ];

            AverageDelegateResults averageDelegateResults = delegate (RandomDelegate[] delegateArray)
            {
                return delegateArray.Select(del => del()).Average();
            };

            double average = averageDelegateResults(delegates);

            Console.WriteLine($"Среднее арифметическое: {average:F3}");
        }
    }
}
