namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string filePath = "input.txt";
            string content = File.ReadAllText(filePath);

            string result = ProcessText(content);
            Console.WriteLine(result);
        }

        static string ProcessText(string text)
        {
            Queue<char> nonDigits = new Queue<char>();
            Queue<char> digits = new Queue<char>();

            foreach (char c in text)
            {
                if (char.IsDigit(c))
                {
                    digits.Enqueue(c);
                }
                else
                {
                    nonDigits.Enqueue(c);
                }
            }

            string result = "";
            while (nonDigits.Count > 0)
            {
                result += nonDigits.Dequeue();
            }
            while (digits.Count > 0)
            {
                result += digits.Dequeue();
            }

            return result;
        }
    }
}
