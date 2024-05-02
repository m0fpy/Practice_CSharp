namespace Task3
{
    internal class Program
    {
        delegate string StringManipulationDelegate(string str);

        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string inputString = Console.ReadLine();

            StringManipulationDelegate manipulationDelegate = new StringManipulationDelegate(UpperCase);
            manipulationDelegate += LowerCase;
            manipulationDelegate += Reverse;

            foreach(StringManipulationDelegate del in manipulationDelegate.GetInvocationList())
            {
                string resultString = del.Invoke(inputString);
                Console.WriteLine(resultString);
            }
        }

        static string UpperCase(string str)
        {
            return str.ToUpper();
        }

        static string LowerCase(string str)
        {
            return str.ToLower();
        }

        static string Reverse(string str)
        {
            char[] charArray = str.ToCharArray();
            Array.Reverse(charArray);

            return new string(charArray);
        }
    }
}
