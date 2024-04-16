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
            switch (month)
            {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return dayOfMonth > 31 ? "Неправильный номер дня" : $"До конца месяца осталось {31 - dayOfMonth} дней";
                case 2:
                    return dayOfMonth > 28 ? "Неправильный номер дня" : $"До конца месяца осталось {28 - dayOfMonth} дней";
                case 4:
                case 6:
                case 9:
                case 11:
                    return dayOfMonth > 30 ? "Неправильный номер дня" : $"До конца месяца осталось {30 - dayOfMonth} дней";
                default:
                    return "Неправильный номер месяца";
            }
        }
    }
}