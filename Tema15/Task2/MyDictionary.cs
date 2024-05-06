using System;
using System.Collections.Generic;

namespace Task2
{
    public class MyDictionary<TKey, TValue>
    {
        private List<KeyValuePair<TKey, TValue>> pairs = new List<KeyValuePair<TKey, TValue>>();

        public void Add(TKey key, TValue value)
        {
            pairs.Add(new KeyValuePair<TKey, TValue>(key, value));
        }

        public TValue this[TKey key]
        {
            get
            {
                foreach (var pair in pairs)
                {
                    if (pair.Key.Equals(key))
                    {
                        return pair.Value;
                    }
                }
                throw new KeyNotFoundException($"Ключ '{key}' не найден.");
            }
        }

        public int Count
        {
            get { return pairs.Count; }
        }
    }
}
