using SQLite;
using Task1.Models;

namespace Task1.Contexts
{
    public class PaymentContext
    {
        private readonly SQLiteAsyncConnection _database;

        public PaymentContext(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.ExecuteAsync("PRAGMA foreign_keys = ON;").Wait();
        }

        public async Task<List<Payment>> GetPaymentsAsync()
        {
            return await _database.Table<Payment>().ToListAsync();
        }

        public async Task<int> AddPaymentAsync(Payment payment)
        {
            return await _database.InsertAsync(payment);
        }

        public async Task<int> DeletePaymentAsync(int paymentId)
        {
            var payment = await _database.Table<Payment>().Where(p => p.PaymentId == paymentId).FirstOrDefaultAsync();
            if (payment != null)
            {
                return await _database.DeleteAsync(payment);
            }
            return 0;
        }
    }
}
