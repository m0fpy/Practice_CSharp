namespace Task3
{
    public partial class ExpandableRichTextBox : UserControl
    {
        private bool _isExpanded = true;
        private int _collapsedHeight = 100;
        private int _expandedHeight;

        public int ExpandedHeight
        {
            get => _expandedHeight;
            set
            {
                _expandedHeight = value;
                if (_isExpanded)
                {
                    Height = value;
                }
            }
        }

        public int CollapsedHeight
        {
            get => _collapsedHeight;
            set
            {
                _collapsedHeight = value;
                if (!_isExpanded)
                {
                    Height = value;
                }
            }
        }

        public ExpandableRichTextBox()
        {
            InitializeComponent();
            _expandedHeight = Height;
        }

        private void ToggleButton_Click(object sender, EventArgs e)
        {
            ToggleRichTextBox();
        }

        private void ToggleRichTextBox()
        {
            if (_isExpanded)
            {
                _expandedHeight = this.Height;
                this.Height = _collapsedHeight;
                toggleButton.Text = "Развернуть";
            }
            else
            {
                this.Height = _expandedHeight;
                toggleButton.Text = "Свернуть";
            }
            _isExpanded = !_isExpanded;
        }
    }
}
