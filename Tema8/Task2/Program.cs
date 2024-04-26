namespace Task2
{
    enum Positions
    {
        President = 120,
        VisePresident = 130,
        Manager = 145,
        Accountant = 135,
        FrontEndDeveloper = 150,
        BackEndDeveloper = 150

    }

    class Accountant
    {
        public bool AskForBonus(Positions worker, int hours)
        {
            return hours > (int)worker;
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Accountant accountant = new Accountant();
            Positions workerPosition = Positions.Manager;
            int workerHours = 120;

            Console.WriteLine(accountant.AskForBonus(workerPosition, workerHours));
        }
    }
}