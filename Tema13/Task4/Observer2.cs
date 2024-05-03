namespace Task4
{
    internal class Observer2
    {
        public void Handler(object sender, EventArgs e)
        {
            Console.WriteLine("Второй наблюдатедль обработал событие");
        }
    }
}
