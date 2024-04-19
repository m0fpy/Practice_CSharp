namespace Exercise4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            for(int i = 0; i < 5; i++)
            {
                try
                {
                    Console.WriteLine("Введите два числа: ");
                    int a = Convert.ToInt32(Console.ReadLine());
                    int b = Convert.ToInt32(Console.ReadLine());
                    Console.WriteLine(a+"/"+b+"="+a/b);
                }
                catch(FormatException)
                {
                    Console.WriteLine("Нужно ввести число");
                }
                catch(DivideByZeroException)
                {
                    Console.WriteLine("Делить на ноль нельзя");
                }
                finally
                {
                    Console.WriteLine("После try-блока");
                }
            }
        }
    }
}
