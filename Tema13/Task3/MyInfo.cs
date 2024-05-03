namespace Task3
{
    internal class MyInfo
    {
        private string name;

        public event EventHandler NameChanged;

        public string Name
        {
            get { return name; }
            set
            {
                if (name != value)
                {
                    name = value;
                    OnNameChanged();
                }
            }
        }

        protected virtual void OnNameChanged()
        {
            if (NameChanged != null)
            {
                NameChanged(this, EventArgs.Empty);
            }
        }
    }
}
