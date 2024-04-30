namespace Task1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Student newStudent = new Student();

            Console.WriteLine(newStudent.GetInfo());
            Console.WriteLine(newStudent.CalculateScolarship());

            Magistr newMagistr = new Magistr();

            Console.WriteLine(newMagistr.GetInfo());
            Console.WriteLine(newMagistr.CalculateScolarship());
        }
    }
}
