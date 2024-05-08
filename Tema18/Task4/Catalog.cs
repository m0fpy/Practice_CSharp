using System.Collections;

namespace Task4
{
    internal class Catalog
    {
        public Hashtable CDs { get; set; }

        public Catalog()
        {
            CDs = [];
        }

        public bool AddCD(string cdTitle)
        {
            if (!CDs.ContainsKey(cdTitle))
            {
                CDs.Add(cdTitle, new CD(cdTitle));
                return true;
            }

            return false;
        }

        public bool RemoveCD(string cdTitle)
        {
            if (CDs.ContainsKey(cdTitle))
            {
                CDs.Remove(cdTitle);
                return true;
            }

            return false;
        }

        public void DisplayCatalog()
        {
            Console.WriteLine("Каталог музыкальных компакт-дисков:");
            foreach (DictionaryEntry cd in CDs)
            {
                ((CD)cd.Value).DisplaySongs();
            }
        }
    }
}
