namespace ScheduleLibrary
{
    public class Lesson
    {
        public string Name;
        public TimeSpan StartTime;
        public TimeSpan Duration;

        public Lesson()
        {
            Name = null;
            StartTime = TimeSpan.Zero;
            Duration = TimeSpan.Zero;
            Input();
        }

        private void Input()
        {
            Console.WriteLine("Введите название урока: ");
            Name = Console.ReadLine();

            Console.WriteLine("Вводи время начала урока: ");
            StartTime = TimeSpan.Parse(Console.ReadLine());

            Console.WriteLine("Вводи длительность урока: ");
            Duration = TimeSpan.Parse(Console.ReadLine());
        }

        public override string ToString()
        {
            return $"{Name} ({StartTime} - {StartTime.Add(Duration)})";
        }
    }
}
