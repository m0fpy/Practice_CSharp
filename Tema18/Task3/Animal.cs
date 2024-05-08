namespace Task3
{
    internal class Animal
    {
        public string Name { get; set; }

        public Animal(string name)
        {
            Name = name;
        }

        public virtual void PrintInfo()
        {
            Console.WriteLine("Животное: " + Name);
        }
    }
}
