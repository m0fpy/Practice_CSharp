using Task1.abstractions;
using Task1.strategies.flying;
using Task1.strategies.quacking;

namespace Task1.concrete
{
    public class MallardDuck : Duck
    {
        public MallardDuck()
        {
            quackBehavior = new Quack();
            flyBehaviour = new FlyWithWings();
        }

        public override void Display()
        {
            Console.WriteLine("Я Кряква!");
        }
    }
}
