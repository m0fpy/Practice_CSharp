namespace Task3
{
    internal class AnimalList<T> where T : Animal
    {
        private List<T> animals;

        public AnimalList()
        {
            animals = new List<T>();
        }

        public AnimalList(List<T> animalList)
        {
            animals = new List<T>(animalList);
        }

        public void Add(T animal)
        {
            animals.Add(animal);
        }

        public void Remove(int index)
        {
            if (index >= 0 && index < animals.Count)
            {
                animals.RemoveAt(index);
            }
            else
            {
                Console.WriteLine("Индекс выходит за границы списка!");
            }
        }

        public AnimalList<T> Clone()
        {
            return new AnimalList<T>(new List<T>(animals));
        }

        public void PrintAll()
        {
            foreach (var animal in animals)
            {
                animal.PrintInfo();
            }
        }
    }
}
