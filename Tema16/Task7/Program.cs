namespace Task7
{
    internal class Program
    {
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

        static string[] GetAllFiles(string directoryPath)
        {
            return Directory.GetFiles(directoryPath);
        }

        static void CreateDirectory(string directoryPath)
        {
            Directory.CreateDirectory(directoryPath);
        }

        static string[] GetSourceFiles(string directoryPath)
        {
            return Directory.GetFiles(directoryPath);
        }

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

        static void SetHiddenAttribute(string filePath)
        {
            File.SetAttributes(filePath, FileAttributes.Hidden);
        }

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