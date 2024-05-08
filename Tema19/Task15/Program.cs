namespace Task15
{
    /// <summary>
    /// Содержит логику программы для работы с файлами.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            Console.Write("Введите количество строк: ");
            int lineCount;
            while (!int.TryParse(Console.ReadLine(), out lineCount) || lineCount <= 0)
            {
                Console.WriteLine("Введите корректное количество строк (целое положительное число).");
            }

            string[] lines = new string[lineCount];
            for (int i = 0; i < lineCount; i++)
            {
                Console.Write($"Введите строку {i + 1}: ");
                lines[i] = Console.ReadLine();
            }

            string fileName = "text.txt";

            File.WriteAllLines(fileName, lines);
            Console.WriteLine($"Файл {fileName} создан.");

            int startEndWithSameLetterCount = CountStartEndWithSameLetter(fileName);
            Console.WriteLine($"Количество строк, которые начинаются и заканчиваются одной буквой: {startEndWithSameLetterCount}");

            string longestLine = FindLongestLine(fileName, out int longestLineLength, out int longestLineIndex);
            Console.WriteLine($"Самая длинная строка: {longestLine}, ее длина: {longestLineLength}, номер строки: {longestLineIndex}");

            string shortestLine = FindShortestLine(fileName, out int shortestLineLength, out int shortestLineIndex);
            Console.WriteLine($"Самая короткая строка: {shortestLine}, ее длина: {shortestLineLength}, номер строки: {shortestLineIndex}");

            Console.Write("Введите букву: ");
            char letter = Console.ReadLine().FirstOrDefault();

            string lineStartingWithLetter = FindLineStartingWithLetter(fileName, letter);
            if (lineStartingWithLetter != null)
                Console.WriteLine($"Строка, начинающаяся с буквы '{letter}': {lineStartingWithLetter}");
            else
                Console.WriteLine($"В файле нет строк, начинающихся с буквы '{letter}'.");
        }

        /// <summary>
        /// Подсчитывает количество строк, которые начинаются и заканчиваются одной буквой.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <returns>Количество строк, удовлетворяющих условию.</returns>
        static int CountStartEndWithSameLetter(string fileName)
        {
            string[] lines = File.ReadAllLines(fileName);
            int count = 0;
            foreach (string line in lines)
            {
                if (line.Length > 0 && char.ToLower(line[0]) == char.ToLower(line[line.Length - 1]))
                {
                    count++;
                }
            }
            return count;
        }

        /// <summary>
        /// Находит самую длинную строку в файле.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <param name="longestLineLength">Длина самой длинной строки.</param>
        /// <param name="longestLineIndex">Индекс самой длинной строки.</param>
        /// <returns>Самая длинная строка в файле.</returns>
        static string FindLongestLine(string fileName, out int longestLineLength, out int longestLineIndex)
        {
            string[] lines = File.ReadAllLines(fileName);
            longestLineLength = 0;
            longestLineIndex = -1;
            string longestLine = null;
            for (int i = 0; i < lines.Length; i++)
            {
                if (lines[i].Length > longestLineLength)
                {
                    longestLineLength = lines[i].Length;
                    longestLineIndex = i + 1;
                    longestLine = lines[i];
                }
            }
            return longestLine;
        }

        /// <summary>
        /// Находит самую короткую строку в файле.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <param name="shortestLineLength">Длина самой короткой строки.</param>
        /// <param name="shortestLineIndex">Индекс самой короткой строки.</param>
        /// <returns>Самая короткая строка в файле.</returns>
        static string FindShortestLine(string fileName, out int shortestLineLength, out int shortestLineIndex)
        {
            string[] lines = File.ReadAllLines(fileName);
            shortestLineLength = int.MaxValue;
            shortestLineIndex = -1;
            string shortestLine = null;
            for (int i = 0; i < lines.Length; i++)
            {
                if (lines[i].Length < shortestLineLength)
                {
                    shortestLineLength = lines[i].Length;
                    shortestLineIndex = i + 1;
                    shortestLine = lines[i];
                }
            }
            return shortestLine;
        }

        /// <summary>
        /// Находит первую строку в файле, начинающуюся с заданной буквы.
        /// </summary>
        /// <param name="fileName">Имя файла.</param>
        /// <param name="letter">Буква.</param>
        /// <returns>Первая строка, начинающаяся с указанной буквы, или null, если такой строки нет.</returns>
        static string FindLineStartingWithLetter(string fileName, char letter)
        {
            string[] lines = File.ReadAllLines(fileName);
            foreach (string line in lines)
            {
                if (line.Length > 0 && char.ToLower(line[0]) == char.ToLower(letter))
                {
                    return line;
                }
            }
            return null;
        }
    }
}
