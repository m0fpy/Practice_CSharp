using Task1.behaviors;

namespace Task1.strategies.quacking
{
    public class Quack : IQuackBehavior
    {
        public void DoQuack() 
        { 
            Console.WriteLine("Кря-кря");
        }
    }
}
