using Task1.behaviors;

namespace Task1.strategies.flying
{
    public class FlyWithWings : IFlyBehaviour
    {
        public void Fly() 
        { 
            Console.WriteLine("Я лечу");
        }

    }
}
