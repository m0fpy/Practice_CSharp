namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Введите значение аргумента х: ");
                double argX = double.Parse(Console.ReadLine());

                Console.WriteLine($"Значение функции: {CalculateFunction(argX)}");
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        static double CalculateFunction(double argX)
        {
            if (argX >= 1)
            {
                return Math.Pow(argX, 2) / (3 * argX - 9);
            }
            else if(argX < 1 && argX > -5) 
            {
                return argX - 3;
            }
            else
            {
                throw new ArgumentOutOfRangeException("Значение аргумента должно быть в диапазоне от -5 до 1");
            }
        }
    }
}
