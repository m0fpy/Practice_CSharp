namespace Task1
{
    internal class Magistr : Student
    {
        private string _specialty;
        private double _scolarshipBonus;

        public Magistr() : base()
        {
            _specialty = null;
            _scolarshipBonus = 0;
            Input();
        }

        public void Input()
        {
            Console.WriteLine("Введите специальность магистра: ");
            _specialty = Console.ReadLine();

            Console.WriteLine("Введите бонус стипендии магистра: ");
            _scolarshipBonus = double.Parse(Console.ReadLine());
        }

        public string GetInfo()
        {
            return $"Имя магистра: {Name}, средний балл {GradeAverage}, специальность {_specialty}";
        }

        public override double CalculateScolarship()
        {
            return 300000 + 10000 * (GradeAverage - 5) + _scolarshipBonus;
        }
    }
}
