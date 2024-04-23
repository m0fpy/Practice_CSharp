using System.Text.RegularExpressions;

namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string text = Console.ReadLine();

            MatchCollection matches = Regex.Matches(text, @"(?:^\w+\b|\b\w+\b(?=\s*[\.\?!])|(?<=[\.\?!])\s*\b\w+\b)");
            Console.WriteLine("Слова в начале и в конце предложений:");
            foreach (Match match in matches)
            {
                Console.WriteLine(match.Value.Trim());
            }
        }
    }
}
