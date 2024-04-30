namespace Task2
{
    internal class ClassA
    {
        protected int fieldA = 9;
        protected int fieldB = 29;
        protected double fieldC = 0;

        public double FieldC
        {
            get
            {
                while (fieldC < fieldB)
                {
                    fieldC += fieldA - 6;
                }
                return fieldC;
            }
            set
            {
                fieldC = value;
            }
        }
    }
}
