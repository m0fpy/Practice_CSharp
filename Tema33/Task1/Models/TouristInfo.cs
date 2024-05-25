using SQLite;

namespace Task1.Models
{
    [Table("Информация_о_туристах")]
    public class TouristInfo
    {
        [PrimaryKey, Column("Код_туриста")]
        public int TouristId { get; set; }

        [Column("Серия_паспорта")]
        public string PassportSeries { get; set; }

        [Column("Город")]
        public string City { get; set; }

        [Column("Страна")]
        public string Country { get; set; }

        [Column("Телефон")]
        public string Phone { get; set; }

        [Column("Индекс")]
        public int Index { get; set; }

        [Ignore]
        public Tourist Tourist { get; set; }
    }
}
