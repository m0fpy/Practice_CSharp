using SQLite;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task1.Models;

namespace Task1.Contexts
{
    public class TouristContext
    {
        private readonly SQLiteAsyncConnection _database;

        public TouristContext(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.ExecuteAsync("PRAGMA foreign_keys = ON;").Wait();
        }

        public async Task<List<Tourist>> GetTouristsAsync()
        {
            return await _database.Table<Tourist>().ToListAsync();
        }

        public async Task<Tourist> GetTouristAsync(int id)
        {
            return await _database.Table<Tourist>().Where(t => t.TouristId == id).FirstOrDefaultAsync();
        }

        public async Task<int> AddTouristAsync(Tourist tourist)
        {
            return await _database.InsertAsync(tourist);
        }

        public async Task<int> DeleteTouristAsync(int touristId)
        {
            await _database.Table<TouristInfo>().DeleteAsync(info => info.TouristId == touristId);

            var relatedPackages = await _database.Table<Package>().Where(p => p.TouristId == touristId).ToListAsync();
            foreach (var package in relatedPackages)
            {
                await _database.Table<Payment>().DeleteAsync(p => p.PackageId == package.PackageId);
                await _database.DeleteAsync(package);
            }

            var tourist = await GetTouristAsync(touristId);
            if (tourist != null)
            {
                return await _database.DeleteAsync(tourist);
            }

            return 0;
        }
    }
}
