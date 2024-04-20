namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random rnd = new Random();
            int[] numbers = new int[100];

            for (int i = 0; i < numbers.Length; i++)
            {
                numbers[i] = rnd.Next(-100, 100);
            }

            Array.Sort(numbers);

            Console.WriteLine("Отсортированная исходная последовательность:");
            PrintArray(numbers);    

            Console.WriteLine("Введите число k для поиска: ");
            int searchingValue = int.Parse(Console.ReadLine());

            int searchingIndex = Array.BinarySearch(numbers, searchingValue);

            if (searchingIndex < 0)
            {
                Console.WriteLine("Число к не найдено");
            }
            else
            {
                Console.WriteLine($"Число {searchingValue}, найдено на позиции {searchingIndex}");
            }

            int minIndex = Array.IndexOf(numbers, numbers.Min());
            int maxIndex = Array.IndexOf(numbers, numbers.Max());

            int[] newNumbers = new int[numbers.Length - 2];

            for (int i = 0, j = 0; i < numbers.Length && j < newNumbers.Length; i++)
            { 
                if (i != minIndex && i != maxIndex)
                {
                    newNumbers[j] = numbers[i];
                    j++;
                }
            }

            Console.WriteLine("Новая последовательность, без мин. и макс. элемента: ");
            PrintArray(newNumbers);
        }

        static void PrintArray(int[] numbers)
        {
            foreach(int number in numbers)
            {
                Console.Write($"{number} ");
            }
            Console.WriteLine();
        }
    }
}