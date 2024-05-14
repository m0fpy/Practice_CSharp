using Task1.behaviors;

namespace Task1.abstractions
{
    public abstract class Duck
    {
        public IQuackBehavior quackBehavior;
        public IFlyBehaviour flyBehaviour;

        public Duck()
        {
        }

        public abstract void Display();

        public void PerformFly()
        {
            flyBehaviour.Fly();
        }

        public void PerformQuack()
        {
            quackBehavior.DoQuack();
        }

        public void Swim()
        {
            Console.WriteLine("Все утки плавают, даже приманки.");
        }
    }
}
