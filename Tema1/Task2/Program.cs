namespace Task2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите сторону a: ");
            double sideA = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите сторону b: ");
            double sideB = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите сторону c: ");
            double sideC = double.Parse(Console.ReadLine());

            if(CheckForExistence(sideA, sideB, sideC)) 
            { 
                Console.WriteLine("Треугольник может существовать");
            }
            else
            {
                Console.WriteLine("Треугольник не может существовать");
            }
        }

        public static bool CheckForExistence(double sideA, double sideB, double sideC)
        {
            if(sideA <= 0 || sideB <= 0 || sideC <= 0)
            {
                return false;
            }

            if((sideA + sideB > sideC) || (sideA + sideC > sideB) || (sideB + sideC > sideB)) 
            {
                return false;            
            }

            return true;
        }
    }
}
