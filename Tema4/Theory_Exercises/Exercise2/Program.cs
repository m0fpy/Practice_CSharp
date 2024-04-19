namespace Exercise2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            byte n = 1; byte i;

            try
            {
                checked
                {
                    for (i = 0; i < 10; i++) n *= i;
                    Console.WriteLine("1: {0}", n);
                }
                unchecked
                {
                    n = 1;
                    for (i = 1; i < 10; i++) n *= i;
                    Console.WriteLine("2: {0}", n);
                }
            }
            catch (OverflowException)
            {
                Console.WriteLine("Возникло переполнение");
            }
        }
    }
}
