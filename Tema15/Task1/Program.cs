namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            MyList<int> myList = new MyList<int>();

            myList.Add(1);
            myList.Add(2);
            myList.Add(3);

            Console.WriteLine($"Элемент с индексом 2: {myList[2]}");
            Console.WriteLine($"Количество элементов: {myList.Count}");
        }
    }
}
