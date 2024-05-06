using System;
using System.Collections;
using System.Collections.Generic;

namespace Task1
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
}
