using System.Text;

namespace Task1.Models
{
    public class Flower
    {
        public string Type { get; set; }
        public double Price { get; set; }

        public override string ToString()
        {
            return new StringBuilder()
                .AppendLine($"Type: {Type}")
                .AppendLine($"Price: {Price}")
                .ToString();
        }
    }
}
