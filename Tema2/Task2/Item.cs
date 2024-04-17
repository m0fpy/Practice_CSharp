using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task2
{
    internal class Item
    {
        private string itemName;
        private string material;
        private int number;

        public Item()
        {
            this.itemName = string.Empty;
            this.material = string.Empty;
            this.number = 0;
            Input();
        }

        private void Input()
        {
            Console.WriteLine("Введите название товара:");
            itemName = Console.ReadLine();
            Console.WriteLine("Введите номер товара:");
            number = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Введите материал товара:");
            material = Console.ReadLine();
        }

        public virtual string Display()
        {
            return $"Название: {itemName}, Номер: {number}, Материал: {material}";
        }
    }
}
