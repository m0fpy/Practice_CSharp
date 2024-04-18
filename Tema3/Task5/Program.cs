namespace Task5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SubjectIndex subjectIndex = new SubjectIndex();

            try
            {
                subjectIndex = new SubjectIndex("input.txt");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка при загрузке указателя: {ex.Message}");
                return;
            }

            Console.WriteLine("Содержимое указателя:");
            subjectIndex.PrintIndex();

            Console.Write("Введите слово для поиска номеров страниц: ");
            string wordToSearch = Console.ReadLine();
            subjectIndex.PrintPageNumbers(wordToSearch);

            Console.Write("Введите слово для удаления из указателя: ");
            string wordToRemove = Console.ReadLine();
            subjectIndex.RemoveEntry(wordToRemove);

            Console.WriteLine("Обновленное содержимое указателя:");
            subjectIndex.PrintIndex();

            Console.WriteLine("Формирование указателя через клавиатуру: ");

            SubjectIndex subjectIndex2 = new SubjectIndex();

            subjectIndex2.LoadFromConsole();

            subjectIndex2.PrintIndex();
        }
    }
}
