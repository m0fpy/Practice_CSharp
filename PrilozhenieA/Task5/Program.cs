namespace Task5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите величину временного интервала (в минутах):");
            int totalMinutes = Convert.ToInt32(Console.ReadLine());

            int hours = totalMinutes / 60;
            int remainingMinutes = totalMinutes % 60;

            Console.WriteLine($"{totalMinutes} минут - это {hours}ч. {remainingMinutes}мин.");
        }
    }
}
