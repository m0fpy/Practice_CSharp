namespace Task16
{
    /// <summary>
    /// Содержит логику программы для работы с файловой системой.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            string[] allFiles = GetAllFiles(@"C:\");
            Console.WriteLine("Список всех файлов на локальном диске:");
            foreach (string file in allFiles)
            {
                Console.WriteLine(file);
            }

            string directoryName = @"D:\Example_36tp";
            CreateDirectory(directoryName);
            Console.WriteLine($"Каталог {directoryName} создан.");

            string[] sourceFiles = GetSourceFiles(@"C:\Windows\Fonts").Take(3).ToArray();

            CopyFiles(sourceFiles, directoryName);

            Console.WriteLine("Все операции завершены успешно.");
        }

        /// <summary>
        /// Получает список всех файлов в указанной директории.
        /// </summary>
        /// <param name="directoryPath">Путь к директории.</param>
        /// <returns>Массив строк, содержащий пути ко всем файлам в директории.</returns>
        static string[] GetAllFiles(string directoryPath)
        {
            return Directory.GetFiles(directoryPath);
        }

        /// <summary>
        /// Создает новую директорию.
        /// </summary>
        /// <param name="directoryPath">Путь к новой директории.</param>
        static void CreateDirectory(string directoryPath)
        {
            Directory.CreateDirectory(directoryPath);
        }

        /// <summary>
        /// Получает список исходных файлов из указанной директории.
        /// </summary>
        /// <param name="directoryPath">Путь к директории.</param>
        /// <returns>Массив строк, содержащий пути ко всем файлам в директории.</returns>
        static string[] GetSourceFiles(string directoryPath)
        {
            return Directory.GetFiles(directoryPath);
        }

        /// <summary>
        /// Копирует файлы из списка исходных файлов в указанную директорию.
        /// </summary>
        /// <param name="sourceFiles">Массив строк, содержащий пути ко всем файлам, которые нужно скопировать.</param>
        /// <param name="destinationDirectory">Путь к целевой директории, куда нужно скопировать файлы.</param>
        static void CopyFiles(string[] sourceFiles, string destinationDirectory)
        {
            foreach (string sourceFile in sourceFiles)
            {
                string destinationFile = Path.Combine(destinationDirectory, Path.GetFileName(sourceFile));
                File.Copy(sourceFile, destinationFile);
                SetHiddenAttribute(destinationFile);
                CreateShortcut(destinationFile);
            }
        }

        /// <summary>
        /// Устанавливает атрибут "скрытый" для указанного файла.
        /// </summary>
        /// <param name="filePath">Путь к файлу.</param>
        static void SetHiddenAttribute(string filePath)
        {
            File.SetAttributes(filePath, FileAttributes.Hidden);
        }

        /// <summary>
        /// Создает ярлык для указанного файла.
        /// </summary>
        /// <param name="targetPath">Путь к целевому файлу, для которого нужно создать ярлык.</param>
        static void CreateShortcut(string targetPath)
        {
            string linkFilePath = Path.ChangeExtension(targetPath, ".lnk");
            using (StreamWriter writer = new StreamWriter(linkFilePath))
            {
                writer.WriteLine("[InternetShortcut]");
                writer.WriteLine("URL=file:///" + targetPath.Replace('\\', '/'));
                writer.Flush();
            }
        }
    }
}
