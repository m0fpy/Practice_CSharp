namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Введите трехзначное число: ");
                int number = int.Parse(Console.ReadLine());

                if (number > 999 || number < 100)
                {
                    throw new ArgumentException("Число должно быть трехзначным");
                }

                Task task1 = Task.Factory.StartNew(() => PermuteNumber(number));
                Task task2 = new(() => PermuteNumber(number));
                task2.Start();
                Task task3 = Task.Run(() => PermuteNumber(number));

                Task.WaitAll(task1, task2, task3);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        static void PermuteNumber(int number)
        {
            int[] digits = [number / 100, (number / 10) % 10, number % 10];
            HashSet<int> permutations = [];

            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    if (i != j)
                    {
                        for (int k = 0; k < 3; k++)
                        {
                            if (k != i && k != j)
                            {
                                int permutedNumber = digits[i] * 100 + digits[j] * 10 + digits[k];
                                permutations.Add(permutedNumber);
                            }
                        }
                    }
                }
            }

            foreach (int permutation in permutations)
            {
                Console.WriteLine(permutation);
            }
        }
    }
}
