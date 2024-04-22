namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string input = Console.ReadLine();

            if (IsPalindrome(input))
            {
                Console.WriteLine("Да, введенная строка является палиндромом.");
            }
            else
            {
                Console.WriteLine("Нет, введенная строка не является палиндромом.");
            }
        }

        static bool IsPalindrome(string str)
        {
            string cleanedStr = new string(str.Where(char.IsLetter).Select(char.ToLower).ToArray());
            return cleanedStr.SequenceEqual(cleanedStr.Reverse());
        }
    }
}
