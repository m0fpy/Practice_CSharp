namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите кол-во чисел в файле: ");
            int count = int.Parse(Console.ReadLine());

            GenerateRandomNumbersToFile("numbers.txt", count);

            int max = FindMaxNumber("numbers.txt");
            Console.WriteLine($"Максимальное число: {max}");

            int negativeCount = CountNegativeNumbers("numbers.txt");
            Console.WriteLine($"Количество отрицательных чисел: {negativeCount}");
        }

        static void GenerateRandomNumbersToFile(string fileName, int count)
        {
            Random rand = new Random();
            using (StreamWriter sw = new StreamWriter(fileName))
            {
                for (int i = 0; i < count; i++)
                {
                    sw.WriteLine(rand.Next(-100, 101));
                }
            }
        }

        static int FindMaxNumber(string fileName)
        {
            int max = int.MinValue;
            using (StreamReader sr = new StreamReader(fileName))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    int number = int.Parse(line);
                    if (number > max)
                    {
                        max = number;
                    }
                }
            }
            return max;
        }

        static int CountNegativeNumbers(string fileName)
        {
            int count = 0;
            using (StreamReader sr = new StreamReader(fileName))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    int number = int.Parse(line);
                    if (number < 0)
                    {
                        count++;
                    }
                }
            }
            return count;
        }
    }
}
