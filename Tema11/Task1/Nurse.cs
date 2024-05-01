namespace Task1
{
    internal class Nurse : HealthWorker
    {
        const int HOUR_RATE = 10;

        public double workedHoursPerWeek;
        public double income;

        public Nurse() 
        { 
            workedHoursPerWeek = 0;
            Input();
        }

        public override void Input()
        {
            base.Input();

            Console.WriteLine("Введите кол-во отработанных часов: ");
            workedHoursPerWeek = double.Parse(Console.ReadLine());
        }

        public virtual void CalculateIncome()
        {
            income = HOUR_RATE * workedHoursPerWeek;
        }

        public override string GetInfo()
        {
            CalculateIncome();
            return $"Имя работника - {name}, Кол-во отработанных часов за неделю - {workedHoursPerWeek}, Доход - {income:F3}";
        }
    }
}
