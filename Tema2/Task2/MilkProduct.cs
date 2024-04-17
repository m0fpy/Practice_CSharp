namespace Task2
{
    internal class MilkProduct : Product
    {
        private string type;

        public MilkProduct() : base()
        {
            this.type = string.Empty;
            Input();
        }

        public void Input()
        {
            Console.WriteLine("Введите тип молочного продукта:");
            type = Console.ReadLine();
        }

        public override string Display()
        {
            return base.Display() + $" Тип молочного продукта: {type}";
        }
    }
}
