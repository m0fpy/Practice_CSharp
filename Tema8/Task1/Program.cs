namespace Task1
{
    internal class Program
    {
        struct Train
        {
            public string destination;
            public int trainNumber;
            public DateTime departureTime;

            public string DisplayTrainInfo()
            {
                return $"{trainNumber} {destination} {departureTime:HH:mm}";
            }
        }

        static string TrainInfoByNumber(Train[] trains, int tNumber)
        {
            foreach (var train in trains)
            {
                if (train.trainNumber == tNumber)
                {
                    return $"Информация о поезде с номером {tNumber}:\n{train.DisplayTrainInfo()}";
                }
            }

            return $"Поезда с номером {tNumber} не найдено.";
        }

        static string SortTrains(Train[] trains)
        {
            trains = trains.OrderByDescending(train => train.trainNumber).ToArray();

            string result = "Отсортированные поезда:\n";
            foreach (var train in trains)
            {
                result += $"{train.DisplayTrainInfo()}\n";
            }

            return result;
        }

        static void Main(string[] args)
        {
            Train[] trains = new Train[8];

            Console.WriteLine("Введите данные поездов (Пункт назначения, Номер, Время ЧЧ:ММ): ");

            for (int i = 0; i < trains.Length; i++)
            {
                string[] trainData = Console.ReadLine().Split(' ');

                string destination = trainData[0];
                int trainNumber = int.Parse(trainData[1]);
                DateTime departureTime = DateTime.ParseExact(trainData[2], "H:mm", null);

                trains[i] = new Train
                {
                    destination = destination,
                    trainNumber = trainNumber,
                    departureTime = departureTime
                };
            }

            Console.WriteLine(SortTrains(trains));

            Console.Write("Введите номер поезда для получения информации: ");
            int requestedTrainNumber;
            while (!int.TryParse(Console.ReadLine(), out requestedTrainNumber))
            {
                Console.WriteLine("Введите корректный номер поезда.");
            }

            Console.WriteLine(TrainInfoByNumber(trains, requestedTrainNumber));
        }
    }
}
