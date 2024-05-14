using Task1.behaviors;

namespace Task1.strategies.flying
{
    public class FlyNoWay : IFlyBehaviour
    {
        public void Fly()
        {
            Console.WriteLine("Я не могу летать");
        }
    }
}
