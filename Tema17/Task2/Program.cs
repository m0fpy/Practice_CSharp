using ScheduleLibrary;

namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Schedule mySchedule = new Schedule();

            mySchedule.AddActivity();
            mySchedule.AddActivity();
            mySchedule.AddActivity();

            mySchedule.DisplaySchedule();

            mySchedule.RemoveActivity("КПиЯП");
            mySchedule.DisplaySchedule();
        }
    }
}
