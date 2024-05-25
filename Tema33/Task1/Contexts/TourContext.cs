using SQLite;
using Task1.Models;

namespace Task1.Contexts
{
    public class TourContext
    {
        private readonly SQLiteAsyncConnection _database;

        public TourContext(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.ExecuteAsync("PRAGMA foreign_keys = ON;").Wait();
        }

        public async Task<List<Tour>> GetToursAsync()
        {
            return await _database.Table<Tour>().ToListAsync();
        }

        public async Task<int> AddTourAsync(Tour tour)
        {
            return await _database.InsertAsync(tour);
        }

        public async Task<int> DeleteTourAsync(int tourId)
        {
            var tour = await _database.Table<Tour>().Where(t => t.TourId == tourId).FirstOrDefaultAsync();
            if (tour != null)
            {
                return await _database.DeleteAsync(tour);
            }
            return 0;
        }
    }
}
