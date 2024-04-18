namespace Task5
{
    internal class SubjectIndex
    {
        private Dictionary<string, List<int>> index;

        public SubjectIndex()
        {
            index = new Dictionary<string, List<int>>();
        }

        public SubjectIndex(string filePath)
        {
            index = new Dictionary<string, List<int>>();
            LoadFromFile(filePath);
        }

        public void LoadFromFile(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("Файл не найден", filePath);
            }

            string[] lines = File.ReadAllLines(filePath);
            foreach (string line in lines)
            {
                string[] parts = line.Split(':');
                string word = parts[0].Trim();
                string[] pageNumbers = parts[1].Split(',');
                List<int> pages = new List<int>();
                foreach (string pageNum in pageNumbers)
                {
                    int pageNumber;
                    if (int.TryParse(pageNum.Trim(), out pageNumber))
                    {
                        pages.Add(pageNumber);
                    }
                }
                index[word] = pages;
            }
        }

        public void LoadFromConsole()
        {
            Console.WriteLine("Введите содержимое указателя. Для завершения введите пустую строку.");

            string input;
            do
            {
                Console.Write("Слово: ");
                string word = Console.ReadLine().Trim();
                if (string.IsNullOrEmpty(word))
                    break;

                Console.Write("Номера страниц (разделите запятыми): ");
                string[] pageNumbersInput = Console.ReadLine().Split(',');
                List<int> pages = new List<int>();
                foreach (string pageNum in pageNumbersInput)
                {
                    int pageNumber;
                    if (int.TryParse(pageNum.Trim(), out pageNumber))
                    {
                        pages.Add(pageNumber);
                    }
                }

                index[word] = pages;

                Console.WriteLine("Запись добавлена в указатель.");
            } while (true);
        }

        public void PrintIndex()
        {
            foreach (var entry in index)
            {
                Console.Write(entry.Key + ": ");
                foreach (int pageNum in entry.Value)
                {
                    Console.Write(pageNum + ", ");
                }
                Console.WriteLine();
            }
        }

        public void PrintPageNumbers(string word)
        {
            if (index.ContainsKey(word))
            {
                Console.WriteLine($"Номера страниц для слова '{word}': ");
                foreach (int pageNum in index[word])
                {
                    Console.WriteLine(pageNum);
                }
            }
            else
            {
                Console.WriteLine($"Слово '{word}' не найдено в указателе.");
            }
        }

        public void RemoveEntry(string word)
        {
            if (index.ContainsKey(word))
            {
                index.Remove(word);
                Console.WriteLine($"Слово '{word}' успешно удалено из указателя.");
            }
            else
            {
                Console.WriteLine($"Слово '{word}' не найдено в указателе.");
            }
        }
    }
}
