namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Func<double, double, double> Add = (a, b) => a + b;
            Func<double, double, double> Sub = (a, b) => a - b;
            Func<double, double, double> Mul = (a, b) => a * b;
            Func<double, double, double> Div = (a, b) =>
            {
                if (b != 0)
                    return a / b;
                else
                {
                    throw new DivideByZeroException("Деление на ноль!");
                }
            };

            while (true)
            {
                Console.WriteLine("Выберите операцию: \n1. Сложение \n2. Вычитание \n3. Умножение \n4. Деление \n5. Выход");
                Console.Write("Введите номер операции: ");

                int choice;
                while (!int.TryParse(Console.ReadLine(), out choice) || choice < 1 || choice > 5)
                {
                    Console.WriteLine("Некорректный ввод. Попробуйте снова.");
                    Console.Write("Введите номер операции: ");
                }

                if(choice == 5)
                {
                    return;
                }

                Console.Write("Введите первое число: ");
                double num1 = GetUserNumber();
                

                Console.Write("Введите второе число: ");
                double num2 = GetUserNumber();
               
                double result = 0;
                switch (choice)
                {
                    case 1:
                        result = Add(num1, num2);
                        break;
                    case 2:
                        result = Sub(num1, num2);
                        break;
                    case 3:
                        result = Mul(num1, num2);
                        break;
                    case 4:
                        try
                        {
                            result = Div(num1, num2);
                        }
                        catch (DivideByZeroException ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                        break;
                }

                Console.WriteLine($"Результат операции: {result}");
            }
        }

        static double GetUserNumber()
        {
            double result;

             while (!double.TryParse(Console.ReadLine(), out result))
             {
                Console.WriteLine("Некорректный ввод. Попробуйте снова.");
                Console.Write("Введите второе число: ");
             }

             return result;
        }
    }
}
