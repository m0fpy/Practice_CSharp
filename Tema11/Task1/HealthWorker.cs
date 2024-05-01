namespace Task1
{
    internal class HealthWorker
    {
        public string name;
        public string position;

        public HealthWorker()
        {
            name = null;
            position = null;
        }

        public virtual void Input()
        {
            Console.WriteLine("Введите имя вектора: ");
            name = Console.ReadLine();

            Console.WriteLine("Введите должность: ");
            position = Console.ReadLine();
        }

        public virtual string GetInfo() 
        {
            return $"Имя вектора - {name}";
        }
    }
}
