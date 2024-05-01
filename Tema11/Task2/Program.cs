namespace Task2
{
    internal class Program
    {
        const int ARRAY_SIZE = 2;

        static void Main(string[] args)
        {
            HealthWorker[] healthWorkers = new HealthWorker[ARRAY_SIZE];

            int i = 0;

            while (i < ARRAY_SIZE)
            {
                Console.WriteLine("Выберите кого хотите добавить:");
                Console.WriteLine("1. Медсестра \n2. Врач");

                int chooseInput = int.Parse(Console.ReadLine());
                switch (chooseInput)
                {
                    case 1:
                        healthWorkers[i] = new Nurse();
                        ++i;
                        break;
                    case 2:
                        healthWorkers[i] = new Doctor();
                        ++i;
                        break;
                    default: Console.WriteLine("Не верный пункт"); break;
                }
            }

            for (int t = 0; t < healthWorkers.Length; t++)
            {
                Console.WriteLine(healthWorkers[t].GetInfo());
            }

            double totalIncome = CalculateTotalIncome(healthWorkers); 
            Console.WriteLine($"Общий доход - {totalIncome:F2}");
        } 

        static double CalculateTotalIncome(HealthWorker[] healthWorkers)
        {
            double totalIncome = 0;

            foreach (HealthWorker worker in healthWorkers)
            {
                totalIncome += worker.CalculateIncome();
            }

            return totalIncome;
        }
    }
}
