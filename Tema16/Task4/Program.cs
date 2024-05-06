namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string inputFileName = "input.txt";
            string outputFileName = "output.txt";

            try
            {
                using (StreamWriter writer = new StreamWriter(inputFileName))
                {
                    writer.WriteLine("0101010");
                    writer.WriteLine("110100");
                    writer.WriteLine("001110");
                    writer.WriteLine("101010");
                }

                Console.WriteLine($"Файл {inputFileName} создан.");

                string[] lines = File.ReadAllLines(inputFileName);

                using (StreamWriter writer = new StreamWriter(outputFileName))
                {
                    foreach (string line in lines)
                    {
                        string modifiedLine = line.Replace('0', '2').Replace('1', '0').Replace('2', '1');

                        writer.WriteLine(modifiedLine);
                    }
                }

                Console.WriteLine($"Замена символов выполнена. Файл {outputFileName} создан.");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Ошибка: {e.Message}");
            }
        }
    }
}
