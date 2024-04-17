namespace Task1
{
    internal class ClassA
    {
        int paramA;
        int paramB;

        public ClassA(int paramA, int paramB)
        {
            this.paramA = paramA;
            this.paramB = paramB;
        }

        public double CalculateFunction(int paramA, int paramB)
        {
            return Math.Round((Math.Sin(paramB) + 4) / (2 * paramA), 3);
        }

        public int CaculateSumSquare(int paramA, int paramB)
        {
            return (int)Math.Pow((paramA + paramB), 2);
        }

    }
}
