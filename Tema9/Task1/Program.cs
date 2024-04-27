namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            TestClass x0 = new TestClass();
            TestClass x1 = new TestClass(5);

            try
            {
                x0.IxF0(10);
                x1.IxF1();

                x0.F0(5);
                x1.F1();

                (x0 as Iy).F0(7);
                (x1 as Iz).F1();

                Console.WriteLine("==========Ix==========");
                Ix ix = x1;
                ix.IxF0(5);
                ix.IxF1();

                Console.WriteLine("==========Iy==========");
                Iy iy = x1;
                iy.F0(5);
                iy.F1();

                Console.WriteLine("==========Iz==========");
                Iz iz = x1;
                iz.F0(5);
                iz.F1();
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
