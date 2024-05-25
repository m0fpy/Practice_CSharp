using SQLite;
using Task1.Models;

namespace Task1.Contexts
{
    public class TouristInfoContext
    {
        private readonly SQLiteAsyncConnection _database;

        public TouristInfoContext(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.ExecuteAsync("PRAGMA foreign_keys = ON;").Wait();
        }

        public async Task<List<TouristInfo>> GetTouristInfosAsync()
        {
            return await _database.Table<TouristInfo>().ToListAsync();
        }

        public async Task<int> AddTouristInfoAsync(TouristInfo touristInfo)
        {
            return await _database.InsertAsync(touristInfo);
        }

        public async Task<int> DeleteTouristInfoAsync(int touristId)
        {
            var touristInfo = await _database.Table<TouristInfo>().Where(t => t.TouristId == touristId).FirstOrDefaultAsync();
            if (touristInfo != null)
            {
                return await _database.DeleteAsync(touristInfo);
            }
            return 0;
        }
    }
}
