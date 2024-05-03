namespace Task4
{
    internal class Observer1
    {
        public void FirstHandler(object sender, EventArgs e)
        {
            Console.WriteLine("Первый наблюдатедль обработал событие первым обработчиком");
        }

        public void SecondHandler(object sender, EventArgs e)
        {
            Console.WriteLine("Первый наблюдатедль обработал событие вторым обработчиком");
        }
    }
}
