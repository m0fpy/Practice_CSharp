namespace Task2
{
    internal class Product : Item
    {
        private string productName;
        private int quantity;

        public Product() : base()
        {
            this.productName = string.Empty;
            this.quantity = 0;
            Input();
        }

        public void Input()
        {
            Console.WriteLine("Введите название продукта:");
            productName = Console.ReadLine();
            Console.WriteLine("Введите количество продукта:");
            quantity = Convert.ToInt32(Console.ReadLine());
        }

        public override string Display()
        {
            return base.Display() + $" Название продукта: {productName}, Количество: {quantity}";
        }
    }
}
