namespace Task2
{
    internal class Doctor : HealthWorker
    {
        const int PAYMENT_RATE = 8;

        public int patientsPerWeek;
        public double income;

        public Doctor()
        {
            patientsPerWeek = 0;
            income = 0;
            Input();
        }

        public override void Input()
        {
            base.Input();

            Console.WriteLine("Введите кол-во пациентов принятых за неделю: ");
            patientsPerWeek = int.Parse(Console.ReadLine());

            income = CalculateIncome();
        }

        public override double CalculateIncome()
        {
            return PAYMENT_RATE * patientsPerWeek;
        }

        public override string GetInfo()
        {
            return $"Имя работника - {name}, Количество пациентов за неделю - {patientsPerWeek}, Доход - {income:F2}";
        }
    }
}
