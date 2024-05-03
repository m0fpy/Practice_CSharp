namespace Task4
{
    internal class Subject
    {
        public delegate void EventHandler(object sender, EventArgs e);

        public event EventHandler MyEvent;

        public void RaiseEvent()
        {
            MyEvent?.Invoke(this, EventArgs.Empty);
        }
    }
}
