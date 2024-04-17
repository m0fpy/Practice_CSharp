namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ClassA classAObject = new ClassA(5, 6);

            Console.WriteLine($"Функция = {classAObject.CalculateFunction(5, 6)}");
            Console.WriteLine($"Квадрат суммы = {classAObject.CaculateSumSquare(5, 6)}");
        }
    }
}
