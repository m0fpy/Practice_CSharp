namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите порядковый номер дня месяца:");
            int dayOfMonth = int.Parse(Console.ReadLine());

            Console.WriteLine("Введите порядковый номер месяца:");
            int month = int.Parse(Console.ReadLine());

            string remainingDays = CalculateRemainingDays(month, dayOfMonth);

            Console.WriteLine(remainingDays);
        }

        static string CalculateRemainingDays(int month, int dayOfMonth )
        {
            return month switch
            {
                1 or 3 or 5 or 7 or 8 or 10 or 12 => dayOfMonth > 31 ? "Неправильный номер дня" : $"До конца месяца осталось {31 - dayOfMonth} дней",
                2 => dayOfMonth > 28 ? "Неправильный номер дня" : $"До конца месяца осталось {28 - dayOfMonth} дней",
                4 or 6 or 9 or 11 => dayOfMonth > 30 ? "Неправильный номер дня" : $"До конца месяца осталось {30 - dayOfMonth} дней",
                _ => "Неправильный номер месяца"
            };
        }
    }
}
