namespace Task4
{
    internal class Program
    {
        const string ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

        static void Main(string[] args)
        {
            Console.WriteLine("Введите ФИО пользователя (в формате 'Фамилия Имя Отчество'):");
            string fullName = Console.ReadLine().ToUpper();

            int personalityCode = CalculatePersonalityCode(fullName);

            Console.WriteLine("Код личности пользователя: " + personalityCode);
        }

        static int CalculatePersonalityCode(string fullName)
        {
            int sum = 0;

            foreach (char letter in fullName)
            {
                int index = ALPHABET.IndexOf(letter) + 1;
                sum += index;
            }

            while (sum >= 10)
            {
                int tempSum = 0;
                foreach (char digit in sum.ToString())
                {
                    tempSum += int.Parse(digit.ToString());
                }
                sum = tempSum;
            }

            return sum;
        }
    }
}
