using System;

namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите трехзначное число с различными цифрами:");
            int number = Convert.ToInt32(Console.ReadLine());

            if (number < 100 || number > 999)
            {
                Console.WriteLine("Число должно быть трехзначным.");
                return;
            }

            int digit1 = number / 100;
            int digit2 = (number / 10) % 10;
            int digit3 = number % 10;

            if (digit1 == digit2 || digit1 == digit3 || digit2 == digit3)
            {
                Console.WriteLine("Цифры в числе должны быть различными.");
                return;
            }

            Console.WriteLine("6 чисел, образованных при перестановке цифр заданного числа:");
            Console.WriteLine(digit1 * 100 + digit2 * 10 + digit3);
            Console.WriteLine(digit1 * 100 + digit3 * 10 + digit2);
            Console.WriteLine(digit2 * 100 + digit1 * 10 + digit3);
            Console.WriteLine(digit2 * 100 + digit3 * 10 + digit1);
            Console.WriteLine(digit3 * 100 + digit1 * 10 + digit2);
            Console.WriteLine(digit3 * 100 + digit2 * 10 + digit1);
        }
    }
}
