namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Warehouse warehouse = new Warehouse(3);
            warehouse[0] = new Product("Xiaomi RedmiBook Pro 15 2023", "AGroup", 100000);
            warehouse[1] = new Product("Apple iPhone 15 Pro Max", "5 Element", 120000);
            warehouse[2] = new Product("Apple AirPods 3", "Electrosila", 15000);

            Console.WriteLine("Список продуктов:");
            warehouse.PrintProducts();

            Console.WriteLine("\nОтсортированный список, по названию магазина:");
            warehouse.SortByStoreName();
            warehouse.PrintProducts();

            Console.WriteLine("\nОтсортированный список, по имени товара:");
            warehouse.SortByProductName();
            warehouse.PrintProducts();

            Console.WriteLine("\nОтсортированный список, по цене:");
            warehouse.SortByPrice();
            warehouse.PrintProducts();
        }
    }
}
