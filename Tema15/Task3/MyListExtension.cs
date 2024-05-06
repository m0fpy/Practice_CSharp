using System.Collections;

namespace Task3
{
    public class MyList<T> : IEnumerable<T>
    {
        private List<T> internalList = new List<T>();

        public void Add(T item)
        {
            internalList.Add(item);
        }

        public T this[int index]
        {
            get { return internalList[index]; }
        }

        public int Count
        {
            get { return internalList.Count; }
        }

        public IEnumerator<T> GetEnumerator()
        {
            return internalList.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return internalList.GetEnumerator();
        }
    }

    public static class MyListExtensions
    {
        public static T[] GetArray<T>(this MyList<T> list)
        {
            T[] array = new T[list.Count];
            for (int i = 0; i < list.Count; i++)
            {
                array[i] = list[i];
            }
            return array;
        }
    }
}
