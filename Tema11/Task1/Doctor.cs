namespace Task1
{
    internal class Doctor : HealthWorker
    {
        const int PAYMENT_RATE = 8;

        public int patientsPerWeek;
        public int income;

        public Doctor()
        {
            patientsPerWeek = 0;
            Input();
        }

        public override void Input()
        {
            base.Input();

            Console.WriteLine("Введите кол-во пациентов принятых за неделю: ");
            patientsPerWeek = int.Parse(Console.ReadLine());
        }

        public virtual void CalculateIncome()
        {
            income = PAYMENT_RATE * patientsPerWeek;
        }

        public override string GetInfo()
        {
            CalculateIncome();
            return $"Имя работника - {name}, Количество пациентов за неделю - {patientsPerWeek}, Доход - {income}";
        }
    }
}
