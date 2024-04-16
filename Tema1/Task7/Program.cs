namespace Task7
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random rnd = new Random();
            double[] numbers = new double[rnd.Next(5, 30)];
            double maxAbsValue = 0;

            for (int i = 0; i < numbers.Length; i++)
            {
                numbers[i] = rnd.Next(-50, 50) * rnd.NextDouble();
            }

            foreach(double number in numbers)
            {
                if (Math.Abs(number) > maxAbsValue)
                {
                    maxAbsValue = Math.Abs(number);
                }
            }

            Console.WriteLine(String.Join(" ", numbers));
            Console.WriteLine($"Максимальный модуль = {maxAbsValue:F2}");
            
        }
    }
}
