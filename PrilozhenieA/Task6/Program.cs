namespace Task6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            for (double argumentM = -30; argumentM < 30; argumentM += 0.5)
            {
                double functionZ1 = (Math.Sqrt(Math.Pow((3 * argumentM), 2) - 24 * argumentM)) / ((3 * Math.Sqrt(argumentM)) - (2 / Math.Sqrt(argumentM)));
                double functionZ2 = -Math.Sqrt(argumentM);

                Console.WriteLine($"M = {argumentM:F2}, Z1 = {functionZ1:F2}, Z2 = {functionZ2:F2}");
            }
        }
    }
}
