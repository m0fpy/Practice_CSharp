namespace FiguresLibrary
{
    public class Triangle
    {
        protected double side1;
        protected double side2;
        protected double side3;

        public Triangle()
        {
            side1 = 0;
            side2 = 0;
            side3 = 0;
            Input();

            if (!IsTriangleValid())
            {
                throw new ArgumentException("Не правильно введенные стороны треугольника");
            }
        }

        private void Input()
        {
            Console.WriteLine("Введите первую сторону треугольника: ");
            side1 = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите вторую сторону треугольника: ");
            side2 = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите третью сторону треугольника: ");
            side3 = double.Parse(Console.ReadLine());
        }

        private bool IsTriangleValid()
        {
            return (side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1) || (side1 > 0 && side2 > 0 && side3 > 0);
        }

        public double Perimeter()
        {
            return side1 + side2 + side3;
        }

        public virtual double Area()
        {
            double s = Perimeter() / 2;
            return Math.Sqrt(s * (s - side1) * (s - side2) * (s - side3));
        }

        public string Type()
        {
            if (side1 == side2 && side2 == side3)
                return "Равнобедренный";
            else if (side1 == side2 || side1 == side3 || side2 == side3)
                return "Равносторонний";
            else
                return "Разносторонний";
        }
    }
}
