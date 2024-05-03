namespace Task1
{
    internal class Program
    {
        delegate double CalculationDelegate(double a, double b);

        static void Main(string[] args)
        {
            CalculationDelegate calcDelegate = Add;
            calcDelegate += Subtract;
            calcDelegate += Divide;

            Console.WriteLine("Введите первое число: ");
            double num1 = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите второе число: ");
            double num2 = double.Parse(Console.ReadLine());

            try
            {
                foreach (CalculationDelegate method in calcDelegate.GetInvocationList())
                {
                    double result = method(num1, num2);
                    Console.WriteLine(result);
                }
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Деление на ноль невозможно.");
            }
        }

        static double Add(double a, double b)
        {
            return a + b;
        }

        static double Subtract(double a, double b)
        {
            return a - b;
        }

        static double Divide(double a, double b)
        {
            if (b == 0)
            {
                throw new DivideByZeroException();
            }
            else
            {
                return a / b;
            }
        }
    }
}
