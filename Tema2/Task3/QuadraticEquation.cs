namespace Task3
{
    internal class QuadraticEquation
    {
        private double argA;
        private double argB;
        private double argC;

        public QuadraticEquation(double a, double b, double c)
        {
            argA = a;
            argB = b;
            argC = c;
        }

        public double GetResultForArgument(double x)
        {
            return argA * Math.Pow(x, 2) + argB * x + argC;
        }

        public static QuadraticEquation operator +(QuadraticEquation eq1, QuadraticEquation eq2)
        {
            double newA = eq1.argA + eq2.argA;
            double newB = eq1.argB + eq2.argB;
            double newC = eq1.argC + eq2.argC;
            return new QuadraticEquation(newA, newB, newC);
        }

        public static QuadraticEquation operator -(QuadraticEquation eq1, QuadraticEquation eq2)
        {
            double newA = eq1.argA - eq2.argA;
            double newB = eq1.argB - eq2.argB;
            double newC = eq1.argC - eq2.argC;
            return new QuadraticEquation(newA, newB, newC);
        }

        public static QuadraticEquation operator *(QuadraticEquation eq1, QuadraticEquation eq2)
        {
            double newA = eq1.argA * eq2.argA;
            double newB = eq1.argA * eq2.argB + eq1.argB * eq2.argA;
            double newC = eq1.argA * eq2.argC + eq1.argB * eq2.argB + eq1.argC * eq2.argA;
            return new QuadraticEquation(newA, newB, newC);
        }

        public string Display()
        {
            return $"{argA}x^2 + {argB}x + {argC}";
        }

        public override string ToString()
        {
            return $"Аргумент а - {argA}, аргумент b - {argB}, аргумент c - {argC}";
        }
    }
}
