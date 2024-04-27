namespace Task2
{
    internal class Warehouse
    {
        private Product[] products;

        public Warehouse(int size)
        {
            products = new Product[size];
        }

        public Product this[int index]
        {
            get { return products[index]; }
            set { products[index] = value; }
        }

        public void SortByStoreName()
        {
            Array.Sort(products, (x, y) => x.StoreName.CompareTo(y.StoreName));
        }

        public void SortByProductName()
        {
            Array.Sort(products, (x, y) => x.ProductName.CompareTo(y.ProductName));
        }

        public void SortByPrice()
        {
            Array.Sort(products, (x, y) => x.Price.CompareTo(y.Price));
        }

        public void PrintProducts()
        {
            foreach (var product in products)
            {
                Console.WriteLine(product);
            }
        }
    }
}
