namespace Task3
{
    internal class Dog : Animal
    {
        public string Breed { get; set; }

        public Dog(string name, string breed) : base(name)
        {
            Breed = breed;
        }

        public override void PrintInfo()
        {
            Console.WriteLine("Собака: " + Name + ", Порода: " + Breed);
        }
    }
}
