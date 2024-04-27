namespace Task2
{
    internal class Product
    {
        private string _productName;
        private string _storeName;
        private double _price;

        public string ProductName
        {
            get { return _productName; }
            set { _productName = value; }
        }

        public string StoreName
        {
            get { return _storeName; }
            set { _storeName = value; }
        }

        public double Price
        {
            get { return _price; }
            set { _price = value; }
        }

        public Product(string productName, string storeName, double price)
        {
            this._productName = productName;
            this._storeName = storeName;
            this._price = price;
        }

        public override string ToString()
        {
            return $"Название: {_productName}, Магазин: {_storeName}, Цена: {_price} рублей";
        }
    }
}
