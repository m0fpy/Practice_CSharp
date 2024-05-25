using SQLite;
using Task1.Models;

namespace Task1.Contexts
{
    public class PackageContext
    {
        private readonly SQLiteAsyncConnection _database;

        public PackageContext(string dbPath)
        {
            _database = new SQLiteAsyncConnection(dbPath);
            _database.ExecuteAsync("PRAGMA foreign_keys = ON;").Wait();
        }

        public async Task<List<Package>> GetPackagesAsync()
        {
            return await _database.Table<Package>().ToListAsync();
        }

        public async Task<int> AddPackageAsync(Package package)
        {
            return await _database.InsertAsync(package);
        }

        public async Task<int> DeletePackageAsync(int packageId)
        {
            var package = await _database.Table<Package>().Where(p => p.PackageId == packageId).FirstOrDefaultAsync();
            if (package != null)
            {
                return await _database.DeleteAsync(package);
            }
            return 0;
        }
    }
}
