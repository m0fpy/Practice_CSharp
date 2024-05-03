namespace Task4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Subject subject = new Subject();

            Observer1 observer1 = new Observer1();
            Observer2 observer2 = new Observer2();

            subject.MyEvent += observer1.FirstHandler;
            subject.MyEvent += observer1.SecondHandler;

            subject.MyEvent += observer2.Handler;

            Console.WriteLine("Вызываем событие:");
            subject.RaiseEvent();
            Console.WriteLine();

            subject.MyEvent -= observer1.SecondHandler;

            Console.WriteLine("После удаления одного обработчика события:");
            subject.RaiseEvent();
        }
    }
}
