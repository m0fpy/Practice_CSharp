using System.Collections;

namespace Task4
{
    internal class CD
    {
        public string Title { get; set; }
        public Hashtable Songs { get; set; }

        public CD(string title)
        {
            Title = title;
            Songs = [];
        }

        public bool AddSong(string songTitle)
        {
            if (!Songs.ContainsKey(songTitle))
            {
                Songs.Add(songTitle, "");
                return true;
            }
            
            return false;
        }

        public bool RemoveSong(string songTitle)
        {
            if (Songs.ContainsKey(songTitle))
            {
                Songs.Remove(songTitle);
                return true;
            }

            return false;
        }

        public void DisplaySongs()
        {
            Console.WriteLine("Песни на диске \"" + Title + "\":");
            foreach (DictionaryEntry song in Songs)
            {
                Console.WriteLine("- " + song.Key);
            }
        }
    }
}
