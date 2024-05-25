using SQLite;
using System;

namespace Task1.Models
{
    [Table("Оплата")]
    public class Payment
    {
        [PrimaryKey, AutoIncrement, Column("Код_оплаты")]
        public int PaymentId { get; set; }

        [Column("Код_путевки")]
        public int PackageId { get; set; }

        [Column("Дата_оплаты")]
        public DateTime PaymentDate { get; set; }

        [Column("Сумма")]
        public double Amount { get; set; }

        [Ignore]
        public Package Package { get; set; }
    }
}
