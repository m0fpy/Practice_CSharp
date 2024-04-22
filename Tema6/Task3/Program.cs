namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите предложение:");
            string sentence = Console.ReadLine();

            string[] words = sentence.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            string firstWordTrimmed = words.Length >= 1 ? words[0][2..] : "";

            string temp = words[0];
            words[0] = words[words.Length - 1];
            words[words.Length - 1] = temp;

            string secondAndThirdWords = words.Length >= 3 ? words[1] + words[2] : "";

            string thirdWordReversed = words.Length >= 3 ? ReverseString(words[2]) : "";


            // Вывод результатов
            Console.WriteLine("Поменять местами первое и последнее слова: " + string.Join(" ", words));
            Console.WriteLine("Склеить второе и третье слова: " + secondAndThirdWords);
            Console.WriteLine("Третье слово в обратном порядке: " + thirdWordReversed);
            Console.WriteLine("Первое слово с удаленными первыми двумя буквами: " + firstWordTrimmed);
        }

        static string ReverseString(string str)
        {
            char[] charArray = str.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }
    }
}
