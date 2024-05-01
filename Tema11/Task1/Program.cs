namespace Task1
{
    internal class Program
    {
        const int ARRAY_SIZE = 5;

        static void Main(string[] args)
        {
            HealthWorker[] healthWorkers = new HealthWorker[ARRAY_SIZE];

            int i = 0;

            while (i < ARRAY_SIZE)
            {
                Console.WriteLine("Выберите кого хотите добавить:");
                Console.WriteLine("1. Медработник \n2. Медсестра \n3. Врач");

                int chooseInput = int.Parse(Console.ReadLine());
                switch (chooseInput)
                {
                    case 1: 
                        healthWorkers[i] = new HealthWorker(); 
                        healthWorkers[i].Input();
                        ++i; 
                        break;
                    case 2:
                        Nurse nurse = new();
                        nurse.CalculateIncome();
                        healthWorkers[i] = nurse;
                        ++i;
                        break;
                    case 3:
                        Doctor doctor = new();
                        doctor.CalculateIncome();
                        healthWorkers[i] = doctor;
                        ++i;
                        break;
                    default: Console.WriteLine("Не верный пункт"); break;
                }
            }

            for (int t = 0; t < healthWorkers.Length; t++)
            {
                Console.WriteLine(healthWorkers[t].GetInfo());
            }

        }
    }
}
