using System.Text.RegularExpressions;

namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string text = Console.ReadLine();

            bool containsDigits = Regex.IsMatch(text, @"\d");

            if (containsDigits)
            {
                Console.WriteLine("Текст содержит цифры.");
            }
            else
            {
                Console.WriteLine("Текст не содержит цифры.");
            }
        }
    }
}
