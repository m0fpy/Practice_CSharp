using SQLite;

namespace Task1.Models
{
    [Table("Путевки")]
    public class Package
    {
        [PrimaryKey, AutoIncrement, Column("Код_путевки")]
        public int PackageId { get; set; }

        [Column("Код_туриста")]
        public int TouristId { get; set; }

        [Column("Код_сезона")]
        public int SeasonId { get; set; }

        [Ignore]
        public Tourist Tourist { get; set; }

        [Ignore]
        public Season Season { get; set; }
    }
}
