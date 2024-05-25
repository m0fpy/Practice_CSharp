using SQLite;
using Task1.Models;

namespace Task1.Contexts
{
    public class SeasonContext
    {
        private readonly SQLiteAsyncConnection _database;

        public SeasonContext(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.ExecuteAsync("PRAGMA foreign_keys = ON;").Wait();
        }

        public async Task<List<Season>> GetSeasonsAsync()
        {
            return await _database.Table<Season>().ToListAsync();
        }

        public async Task<int> AddSeasonAsync(Season season)
        {
            return await _database.InsertAsync(season);
        }

        public async Task<int> DeleteSeasonAsync(int seasonId)
        {
            var season = await _database.Table<Season>().Where(s => s.SeasonId == seasonId).FirstOrDefaultAsync();
            if (season != null)
            {
                return await _database.DeleteAsync(season);
            }
            return 0;
        }
    }
}
