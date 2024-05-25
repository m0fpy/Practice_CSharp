using SQLite;

namespace Task1.Models
{
    [Table("Туристы")]
    public class Tourist
    {
        [PrimaryKey, AutoIncrement, Column("Код_туриста")]
        public int TouristId { get; set; }

        [Column("Фамилия")]
        public string LastName { get; set; }

        [Column("Имя")]
        public string FirstName { get; set; }

        [Column("Отчество")]
        public string Patronymic { get; set; }
    }
}
