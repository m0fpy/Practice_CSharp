using Task1.abstractions;
using Task1.concrete;

namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Duck mallard = new MallardDuck();
            mallard.PerformQuack();
            mallard.PerformFly();
            mallard.Display();
        }
    }
}
