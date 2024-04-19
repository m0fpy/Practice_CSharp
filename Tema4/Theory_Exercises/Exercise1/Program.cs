namespace Exercise1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            byte x = 200; 
            byte y = 200;
            byte result;
            try
            {
                result = (byte)(x + y);
                Console.WriteLine("1: {0}", result);

                result = checked((byte)(x + y));
                Console.WriteLine("2: {0}", result);
            }
            catch (OverflowException)
            {
                Console.WriteLine("возникло переполнение");
            }
        }
    }
}
