namespace Task1
{
    internal class TestClass : Ix, Iy, Iz
    {
        public int xVal;

        public TestClass()
        {
            xVal = 35;
        }

        public TestClass(int key)
        {
            xVal = key;
        }

        public void IxF0(int param)
        {
            double result = Math.Log(param);
            Console.WriteLine($"IxF0: {result:F3}");
        }

        public void IxF1()
        {
            double result = Math.Log(xVal);
            Console.WriteLine($"IxF1: {result:F3}");
        }

        public void F0(int param)
        {
            double result = 2 / param;
            Console.WriteLine($"F0: {result:F3}");
        }

        public void F1()
        {
            double result = 2 / xVal;
            Console.WriteLine($"F1: {result:F3}");
        }

        void Iz.F0(int param)
        {
            double result = Math.Pow(param, 3);
            Console.WriteLine($"F0: {result:F3}");
        }

        void Iz.F1()
        {
            double result = Math.Pow(xVal, 3);
            Console.WriteLine($"F1: {result:F3}");
        }
    }
}
