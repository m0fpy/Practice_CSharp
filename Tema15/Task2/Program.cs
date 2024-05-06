namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            MyDictionary<string, int> myDict = new MyDictionary<string, int>();

            myDict.Add("Матвей", 1);
            myDict.Add("Саша", 2);
            myDict.Add("", 3);

            Console.WriteLine($"Значение ключа 'Матвей': {myDict["Матвей"]}");
            Console.WriteLine($"Кол-во элементов в словаре: {myDict.Count}");
        }
    }
}
