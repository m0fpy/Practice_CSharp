namespace Task2
{
    internal class ClassB : ClassA
    {
        protected int fieldD = 5;
        protected double fieldC2 = 0;

        public ClassB(): base()
        {
        }

        public ClassB(int paramD) : this()
        {
            fieldD = paramD;
        }

        public double FieldC2
        {
            set
            {
               fieldC2 = value;
            }
            get
            {
                while (fieldC2 < fieldB)
                {
                    fieldC2 += fieldA - fieldD;
                }
                return fieldC2;
            }
        }
    }
}
