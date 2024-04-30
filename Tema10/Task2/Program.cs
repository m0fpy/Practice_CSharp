namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ClassA newClassAObj = new ClassA();
            Console.WriteLine($"Значение свойства C - {newClassAObj.FieldC}");

            ClassB newClassBObj1 = new ClassB();
            Console.WriteLine($"Значение свойства C2 - {newClassBObj1.FieldC2}");

            ClassB newClassBObj2 = new ClassB(2);
            Console.WriteLine($"Значение свойства C2 - {newClassBObj2.FieldC2}");

        }
    }
}
