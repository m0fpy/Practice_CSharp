namespace FiguresLibrary
{
    public class Rectangle
    {
        protected double length;
        protected double width;

        public Rectangle()
        {
            length = 0;
            width = 0;
            Input();

            if (!IsValidRectangle())
            {
                throw new ArgumentException("Стороны не могут быть меньше нуля");
            }

        }

        private void Input()
        {
            Console.WriteLine("Введите длину прямоугольника: ");
            length = double.Parse(Console.ReadLine());

            Console.WriteLine("Введите ширину прямоугольника: ");
            width = double.Parse(Console.ReadLine());
        }

        private bool IsValidRectangle()
        {
            return length > 0 && width > 0;
        }

        public double Perimeter()
        {
            return 2 * (length + width);
        }

        public double Area()
        {
            return length * width;
        }
    }
}
