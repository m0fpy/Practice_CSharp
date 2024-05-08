namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите строку: ");
            string input = Console.ReadLine();
            string result = ProcessString(input);
            Console.WriteLine(result);
        }

        static string ProcessString(string input)
        {
            Stack<char> stack = new Stack<char>();

            foreach (char c in input)
            {
                if (c == '#')
                {
                    if (stack.Count > 0)
                    {
                        stack.Pop();
                    }
                }
                else
                {
                    stack.Push(c);
                }
            }

            char[] resultArray = stack.ToArray();
            Array.Reverse(resultArray);
            string result = new string(resultArray);
            return result;
        }
    }
}
