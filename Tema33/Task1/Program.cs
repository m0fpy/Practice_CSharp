using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task1.Contexts;
using Task1.Models;

namespace Task1
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string dbPath = @"..\..\..\Database\DBTur_firm.db";
            TouristContext dbContext = new TouristContext(dbPath);

            Tourist newTourist = CreateTourist();

            int addResult = await dbContext.AddTouristAsync(newTourist);
            if (addResult > 0)
            {
                Console.WriteLine($"Турист добавлен.");
            }
            else
            {
                Console.WriteLine($"Турист не добавлен.");
            }
            
            List<Tourist> tourists = await dbContext.GetTouristsAsync();
            Console.WriteLine("Список туристов:");
            PrintTourists(tourists);

            if (tourists.Count > 0)
            {
                Console.WriteLine("Выберите туриста для удаления:");
                int touristIdToDelete = int.Parse(Console.ReadLine());
                int deleteResult = await dbContext.DeleteTouristAsync(touristIdToDelete);
                if (deleteResult > 0)
                {
                    Console.WriteLine($"Турист удален.");
                }
                else
                {
                    Console.WriteLine($"Турист не найден.");
                }
            }

            tourists = await dbContext.GetTouristsAsync();
            Console.WriteLine("Список туристов:");
            PrintTourists(tourists);
        }

        static Tourist CreateTourist()
        {
            Console.WriteLine("Введите фамилию туриста:");
            string lastName = Console.ReadLine();

            Console.WriteLine("Введите имя туриста:");
            string firstName = Console.ReadLine();

            Console.WriteLine("Введите отчество туриста:");
            string patronymic = Console.ReadLine();

            Tourist newTourist = new Tourist
            {
                LastName = lastName,
                FirstName = firstName,
                Patronymic = patronymic
            };

            return newTourist;
        }

        static void PrintTourists(List<Tourist> tourists)
        {
            foreach (var tourist in tourists)
            {
                Console.WriteLine($"ID: {tourist.TouristId}, ФИО: {tourist.LastName} {tourist.FirstName} {tourist.Patronymic}");
            }
        }
    }
}
