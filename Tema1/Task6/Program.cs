namespace Task6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            const double ARG_A = 0;
            const double ARG_B = Math.PI / 2;
            const double ARG_M = 20;

            double stepH = (ARG_B - ARG_A) / ARG_M;

            for (double x = ARG_A; x <= ARG_B; x += stepH)
            {
                Console.WriteLine($"y = {(Math.Sin(x) - Math.Cos(x)):F2}, при х = {x:F2}");
            }
        }
    }
}
