using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Exercise3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                genException();
            }
            catch
            {
                Console.WriteLine("НЕИСПРАВИМАЯ ОШИБКА");
            }
        }

        static void genException()
        {
            Console.Write("a = ");
            double a = double.Parse(Console.ReadLine());

            Console.Write("b = ");
            double b = double.Parse(Console.ReadLine());

            int f = 1;
            try //Внешний блок-try
            {
                for (double i = a; i <= b; ++i)
                {
                    try //Внутренний блок-try
                    {
                        f = checked((int)(f * i));
                        if (Math.Abs(f - 1) < 0.000001)
                        {
                            throw new DivideByZeroException();
                        }
                        Console.WriteLine("y({0})={1:f6}", i, 100 / (f - 1));
                    }
                    catch (DivideByZeroException)
                    {
                        Console.WriteLine("y({0})= Деление на 0", i);
                    }
                }
            }
            catch (ArithmeticException)
            {
                Console.WriteLine("ERROR");
                throw; //повторная генерация исключения
            }
        }
    }
}
