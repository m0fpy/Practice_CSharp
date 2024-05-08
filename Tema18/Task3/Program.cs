namespace Task3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            AnimalList<Dog> dogList = new AnimalList<Dog>();

            dogList.Add(new Dog("Барон", "Лабрадор"));
            dogList.Add(new Dog("Рекс", "Овчарка"));
            dogList.Add(new Dog("Мухтар", "Такса"));

            Console.WriteLine("Вывод списка всех собак:");
            dogList.PrintAll();

            Console.WriteLine("\nУдаляем собаку по индексу 1:");
            dogList.Remove(1);

            Console.WriteLine("\nВывод списка после удаления:");
            dogList.PrintAll();

            AnimalList<Dog> clonedDogList = dogList.Clone();
            Console.WriteLine("\nКлонированный список:");
            clonedDogList.PrintAll();
        }
    }
}
