namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст, состоящий только из цифр и букв:");
            string input = Console.ReadLine();

            int digitSum = CalculateDigitSum(input);
            int textLength = input.Length;

            if (digitSum == textLength)
            {
                Console.WriteLine("Да, сумма числовых значений цифр равна длине текста.");
            }
            else
            {
                Console.WriteLine("Нет, сумма числовых значений цифр не равна длине текста.");
            }
        }

        static int CalculateDigitSum(string text)
        {
            int sum = 0;
            foreach (char c in text)
            {
                if (char.IsDigit(c))
                {
                    sum += (int)Char.GetNumericValue(c);
                }
            }
            return sum;
        }
    }
}
