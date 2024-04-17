namespace Task2
{
    internal class Toy : Item
    {
        private string toyName;

        public Toy() : base()
        {
            this.toyName = string.Empty;
            Input();
        }

        public void Input()
        {
            Console.WriteLine("Введите название игрушки:");
            toyName = Console.ReadLine();
        }

        public override string Display()
        {
            return base.Display() + $" Название игрушки: {toyName}";
        }
    }
}
