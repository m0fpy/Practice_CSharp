namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Введите значение числа K: ");
                int numK = int.Parse(Console.ReadLine());

                Console.WriteLine("Какую цифру хотите добавить к К: ");
                int digitD1 = int.Parse(Console.ReadLine());
                if(digitD1 < 0 || digitD1 > 9)
                {
                    throw new FormatException();
                }

                numK = AddLeftDigit(numK, digitD1);
                Console.WriteLine($"Полученное число = {numK}");

                Console.WriteLine("Какую цифру хотите добавить к К: ");
                int digitD2 = int.Parse(Console.ReadLine());
                if (digitD2 < 0 || digitD2 > 9)
                {
                    throw new FormatException();
                }

                numK = AddLeftDigit(numK, digitD2);
                Console.WriteLine($"Полученное число = {numK}");
            }
            catch(FormatException ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
            }
            catch (Exception ex) 
            {
                Console.WriteLine($"Неизвестная ошибка: {ex.Message}");
            }
        }

        static int AddLeftDigit(int numK, int digit)
        {
            return (int)Math.Pow(10, numK.ToString().Length) * digit + numK;
        }
    }
}
