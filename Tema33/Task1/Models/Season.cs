using SQLite;
using System;

namespace Task1.Models
{
    [Table("Сезоны")]
    public class Season
    {
        [PrimaryKey, AutoIncrement, Column("Код_сезона")]
        public int SeasonId { get; set; }

        [Column("Код_тура")]
        public int TourId { get; set; }

        [Column("Дата_начала")]
        public DateTime StartDate { get; set; }

        [Column("Дата_конца")]
        public DateTime EndDate { get; set; }

        [Column("Сезон_закрыт")]
        public bool IsClosed { get; set; }

        [Column("Количество_мест")]
        public int NumberOfSeats { get; set; }
    }
}
