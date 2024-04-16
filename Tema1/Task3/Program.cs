namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите порядковый номер дня месяца:");
            int dayOfMonth = Convert.ToInt32(Console.ReadLine());

            int remainingDays = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month) - dayOfMonth;

            Console.WriteLine($"Количество дней оставшихся до конца месяца: {remainingDays}");
        }
    }
}
