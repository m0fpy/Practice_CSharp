namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Введите значение аргумента х: ");
                double argX = double.Parse(Console.ReadLine());

                double functionY1 = argX + (2 * argX) / 4 * Math.Sin(argX);
                Console.WriteLine($"Значение функции Y1 = {functionY1}");

                double functionY2 = argX - 3 + (1 / Math.Tan(argX - 1));
                Console.WriteLine($"Значение функции Y2 = {functionY2}");
            }
            catch(DivideByZeroException ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
            }
            catch(FormatException ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
