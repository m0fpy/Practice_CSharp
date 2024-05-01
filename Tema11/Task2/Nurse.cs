namespace Task2
{
    internal class Nurse : HealthWorker
    {
        const int HOUR_RATE = 10;

        public double workedHoursPerWeek;
        public double income;

        public Nurse()
        {
            workedHoursPerWeek = 0;
            income = 0;
            Input();
        }

        public override void Input()
        {
            base.Input();

            Console.WriteLine("Введите количество отработанных часов: ");
            workedHoursPerWeek = double.Parse(Console.ReadLine());

            income = CalculateIncome();
        }

        public override double CalculateIncome()
        {
            return HOUR_RATE * workedHoursPerWeek;
        }

        public override string GetInfo()
        {
            return $"Имя работника - {name}, Количество отработанных часов за неделю - {workedHoursPerWeek}, Доход - {income:F3}";
        }
    }
}
