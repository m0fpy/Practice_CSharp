namespace ScheduleLibrary
{
    public class Schedule
    {
        private List<Lesson> lessons;

        public Schedule()
        {
            lessons = [];
        }

        public void AddActivity()
        {
            lessons.Add(new Lesson());
        }

        public void RemoveActivity(string name)
        {
            lessons.RemoveAll(activity => activity.Name == name);
        }

        public void DisplaySchedule()
        {
            Console.WriteLine("Распиание:");
            foreach (var activity in lessons)
            {
                Console.WriteLine(activity);
            }
        }
    }
}
