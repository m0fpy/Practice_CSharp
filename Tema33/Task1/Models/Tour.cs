using SQLite;

namespace Task1.Models
{
    [Table("Туры")]
    public class Tour
    {
        [PrimaryKey, AutoIncrement, Column("Код_тура")]
        public int TourId { get; set; }

        [Column("Название")]
        public string Name { get; set; }

        [Column("Цена")]
        public double Price { get; set; }

        [Column("Информация")]
        public string Information { get; set; }
    }
}
