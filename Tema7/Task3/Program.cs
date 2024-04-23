using System.Text.RegularExpressions;

namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string text = Console.ReadLine();

            MatchCollection consonantMatches = Regex.Matches(text, @"[бвгджзйклмнпрстфхцчшщ]");

            Console.WriteLine("Согласные буквы в тексте:");
            foreach (Match match in consonantMatches)
            {
                Console.WriteLine(match.Value);
            }

            int consonantCount = consonantMatches.Count;
            Console.WriteLine($"Количество согласных букв: {consonantCount}");
        }
    }
}
