namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] lines = new string[5];
            Console.WriteLine("Введите 5 строк:");
            for (int i = 0; i < 5; i++)
            {
                Console.Write($"Строка {i + 1}: ");
                lines[i] = Console.ReadLine();
            }

            string filePath = "sample.txt";
            File.WriteAllLines(filePath, lines);

            Console.WriteLine("\nСодержимое файла:");
            Console.WriteLine(File.ReadAllText(filePath));

            int lineCount = lines.Length;
            Console.WriteLine($"\nКоличество строк: {lineCount}");

            Console.WriteLine("\nКоличество символов в каждой строке:");
            foreach (var line in lines)
            {
                Console.WriteLine($"{line}: {line.Length} символов");
            }

            string[] linesExceptLast = lines.Take(lines.Length - 1).ToArray();
            string newFilePath = "sample_modified.txt";
            File.WriteAllLines(newFilePath, linesExceptLast);
            Console.WriteLine($"\nФайл {newFilePath} создан без последней строки.");

            Console.Write("\nВведите номер строки, с которой начать вывод (s1): ");
            int s1 = int.Parse(Console.ReadLine());

            Console.Write("Введите номер строки, которой закончить вывод (s2): ");
            int s2 = int.Parse(Console.ReadLine());

            Console.WriteLine($"\nСтроки с {s1} по {s2}:");
            for (int i = s1 - 1; i < s2; i++)
            {
                Console.WriteLine(lines[i]);
            }

            int maxLength = lines.Max(line => line.Length);
            Console.WriteLine($"\nСамая длинная строка содержит {maxLength} символов.");

            Console.Write("\nВведите букву, с которой должны начинаться строки: ");
            char targetLetter = Console.ReadKey().KeyChar;
            var linesStartingWithLetter = lines.Where(line => line.StartsWith(targetLetter.ToString()));
            Console.WriteLine($"\nСтроки, начинающиеся с буквы '{targetLetter}':");
            foreach (var line in linesStartingWithLetter)
            {
                Console.WriteLine(line);
            }

            Array.Reverse(lines);
            string reversedFilePath = "sample_reversed.txt";
            File.WriteAllLines(reversedFilePath, lines);
        }
    }
}
