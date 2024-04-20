namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random rnd = new Random();
            int[] numbers = new int[rnd.Next(5, 51)];

            int negativeCount = 0;

            for (int i = 0; i < numbers.Length; i++)
            {
                numbers[i] = rnd.Next(-100, 100);
                if (numbers[i] < 0) 
                {
                    negativeCount++;
                }
                
                Console.Write($"{numbers[i]} ");
            }

            Console.WriteLine();
            Console.WriteLine($"Количество отрицательных чисел: {negativeCount}");
        }
    }
}
