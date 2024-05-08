using static System.Net.Mime.MediaTypeNames;

namespace Task4
{
    internal class Program
    {
        const string CD1_NAME = "Linkin Park - Meteora";
        const string CD2_NAME = "Imagine Dragons -Night Visions";

        static void Main(string[] args)
        {
            Catalog catalog = new Catalog();
            bool operationResult;

            operationResult = catalog.AddCD(CD1_NAME);
            PrintOperationResult(operationResult);

            operationResult = ((CD)catalog.CDs[CD1_NAME]).AddSong("Numb");
            PrintOperationResult(operationResult);

            operationResult = ((CD)catalog.CDs[CD1_NAME]).AddSong("Somewhere I Belong");
            PrintOperationResult(operationResult);

            operationResult = catalog.AddCD(CD2_NAME);
            PrintOperationResult(operationResult);

            operationResult = ((CD)catalog.CDs[CD2_NAME]).AddSong("Radioactive");
            PrintOperationResult(operationResult);

            operationResult = ((CD)catalog.CDs[CD1_NAME]).RemoveSong("Numb");
            PrintOperationResult(operationResult);

            operationResult = catalog.AddCD("Twenty One Pilots - Blurryface");
            PrintOperationResult(operationResult);

            operationResult =((CD)catalog.CDs["Twenty One Pilots - Blurryface"]).AddSong("Stressed Out");
            PrintOperationResult(operationResult);

            operationResult = catalog.RemoveCD(CD2_NAME);
            PrintOperationResult(operationResult);

            catalog.DisplayCatalog();
        }

        static void PrintOperationResult(bool or)
        {
            if (or)
            {
                Console.WriteLine("Успешно добавлено");
            }
            else
            {
                Console.WriteLine("Не удалось добавить");
            }
        }
    }
}
