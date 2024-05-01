namespace Task2
{
    abstract class HealthWorker
    {
        public string name;
        public string position;

        public virtual void Input()
        {
            Console.WriteLine("Введите имя работника: ");
            name = Console.ReadLine();

            Console.WriteLine("Введите должность: ");
            position = Console.ReadLine();
        }

        public abstract double CalculateIncome();
        public abstract string GetInfo();
    }
}
