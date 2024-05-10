namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Введите трехзначное число:");
                int number = int.Parse(Console.ReadLine());

                if (number >= 1000 || number < 100)
                {
                    throw new ArgumentException("Число должно быть трехзначным");
                }

                Task<HashSet<int>> permutationTask = Task.Factory.StartNew(() => PermuteNumber(number));

                Task continuationTask = permutationTask.ContinueWith(task => PrintPermutations(task.Result));

                continuationTask.Wait();
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        static HashSet<int> PermuteNumber(int number)
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

            return permutations;
        }

        static void PrintPermutations(HashSet<int> permutations)
        {
            foreach (int permutation in permutations)
            {
                Console.WriteLine(permutation);
            }
        }
    }
}
