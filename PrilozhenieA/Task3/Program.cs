namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            const double argumentX = 2.7;

            double fucntionY = Math.Log(argumentX + Math.Sqrt(Math.Pow(argumentX, 2)) + 9) - ((argumentX + 1) / Math.Atan(Math.Pow(argumentX, 3)));

            Console.WriteLine($"y = {fucntionY:F2}, при x = {argumentX:F2}");
        }
    }
}
