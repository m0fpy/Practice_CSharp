namespace Task5
{
    /// <summary>
    /// Представляет предметный указатель и предоставляет методы для работы с ним.
    /// </summary>
    internal class SubjectIndex
    {
        private Dictionary<string, List<int>> index;

        /// <summary>
        /// Инициализирует новый экземпляр класса SubjectIndex.
        /// </summary>
        public SubjectIndex()
        {
            index = new Dictionary<string, List<int>>();
        }

        /// <summary>
        /// Инициализирует новый экземпляр класса SubjectIndex на основе данных из файла.
        /// </summary>
        /// <param name="filePath">Путь к файлу с данными указателя.</param>
        public SubjectIndex(string filePath)
        {
            index = new Dictionary<string, List<int>>();
            LoadFromFile(filePath);
        }

        /// <summary>
        /// Загружает данные указателя из файла.
        /// </summary>
        /// <param name="filePath">Путь к файлу с данными указателя.</param>
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

        /// <summary>
        /// Загружает данные указателя из консоли.
        /// </summary>
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

        /// <summary>
        /// Выводит содержимое указателя в консоль.
        /// </summary>
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

        /// <summary>
        /// Выводит номера страниц для указанного слова.
        /// </summary>
        /// <param name="word">Слово, для которого нужно вывести номера страниц.</param>
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

        /// <summary>
        /// Удаляет запись из указателя по указанному слову.
        /// </summary>
        /// <param name="word">Слово, которое нужно удалить из указателя.</param>
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
