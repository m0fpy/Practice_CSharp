using System.Text.RegularExpressions;

namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string text = Console.ReadLine();

            MatchCollection matches = Regex.Matches(text, @"\b\w*е\w*е\w*е\w*\b", RegexOptions.IgnoreCase);

            Console.WriteLine("Слова с буквой 'e' три раза:");
            foreach (Match match in matches)
            {
                Console.WriteLine(match.Value);
            }
        }
    }
}
