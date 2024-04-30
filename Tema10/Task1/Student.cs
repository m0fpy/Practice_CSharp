namespace Task1
{
    internal class Student
    {
        private string _name;
        private double _gradeAverage;

        public Student()
        {
            _name = null;
            _gradeAverage = 0;
            Input();
        }

        public void Input()
        {
            Console.WriteLine("Введите имя: ");
            _name = Console.ReadLine();

            Console.WriteLine("Введите средний балл: ");
            _gradeAverage = double.Parse(Console.ReadLine());
        }

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        public double GradeAverage 
        { 
            get { return _gradeAverage; }
            set { _gradeAverage = value; }
        }

        public string GetInfo()
        {
            return $"Имя студента: {_name}, средний балл {_gradeAverage}";
        }

        public virtual double CalculateScolarship()
        {
            return 300000 + 10000 * (_gradeAverage - 5);
        }
    }
}
