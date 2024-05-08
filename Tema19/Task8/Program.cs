namespace Task8
{
    /// <summary>
    /// Содержит логику программы для манипуляции строками.
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Делегат для манипуляции строкой.
        /// </summary>
        /// <param name="str">Входная строка.</param>
        /// <returns>Результирующая строка.</returns>
        delegate string StringManipulationDelegate(string str);

        /// <summary>
        /// Главная точка входа в приложение.
        /// </summary>
        /// <param name="args">Массив аргументов командной строки.</param>
        static void Main(string[] args)
        {
            Console.WriteLine("Введите текст: ");
            string inputString = Console.ReadLine();

            // Инициализация делегата и добавление методов
            StringManipulationDelegate manipulationDelegate = new StringManipulationDelegate(UpperCase);
            manipulationDelegate += LowerCase;
            manipulationDelegate += Reverse;

            // Вызов каждого метода делегата и вывод результата
            foreach (StringManipulationDelegate del in manipulationDelegate.GetInvocationList())
            {
                string resultString = del.Invoke(inputString);
                Console.WriteLine(resultString);
            }
        }

        /// <summary>
        /// Преобразует строку в верхний регистр.
        /// </summary>
        /// <param name="str">Входная строка.</param>
        /// <returns>Строка в верхнем регистре.</returns>
        static string UpperCase(string str)
        {
            return str.ToUpper();
        }

        /// <summary>
        /// Преобразует строку в нижний регистр.
        /// </summary>
        /// <param name="str">Входная строка.</param>
        /// <returns>Строка в нижнем регистре.</returns>
        static string LowerCase(string str)
        {
            return str.ToLower();
        }

        /// <summary>
        /// Разворачивает строку в обратном порядке.
        /// </summary>
        /// <param name="str">Входная строка.</param>
        /// <returns>Обратная строка.</returns>
        static string Reverse(string str)
        {
            char[] charArray = str.ToCharArray();
            Array.Reverse(charArray);

            return new string(charArray);
        }
    }
}
