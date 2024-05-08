using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task3
{
    /// <summary>
    /// Представляет матрицу и предоставляет методы для работы с ней.
    /// </summary>
    internal class Matrix
    {
        private double[,] matrix;
        private Random random = new Random();

        /// <summary>
        /// Получает количество строк в матрице.
        /// </summary>
        public int Rows { get; private set; }

        /// <summary>
        /// Получает количество столбцов в матрице.
        /// </summary>
        public int Cols { get; private set; }

        /// <summary>
        /// Инициализирует новый экземпляр класса Matrix с указанным числом строк и столбцов.
        /// </summary>
        /// <param name="rows">Количество строк.</param>
        /// <param name="cols">Количество столбцов.</param>
        public Matrix(int rows, int cols)
        {
            Rows = rows;
            Cols = cols;
            matrix = new double[rows, cols];
            FillRandom();
        }

        /// <summary>
        /// Заполняет матрицу случайными значениями.
        /// </summary>
        private void FillRandom()
        {
            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Cols; j++)
                {
                    matrix[i, j] = Math.Round(random.Next(-50, 50) * random.NextDouble(), 2);
                }
            }
        }

        /// <summary>
        /// Получает или устанавливает значение элемента матрицы по указанным индексам.
        /// </summary>
        /// <param name="i">Индекс строки.</param>
        /// <param name="j">Индекс столбца.</param>
        /// <returns>Значение элемента матрицы.</returns>
        public double this[int i, int j]
        {
            get { return matrix[i, j]; }
            set { matrix[i, j] = value; }
        }

        /// <summary>
        /// Выполняет операцию сложения указанной матрицы со столбцом, представленным целым числом.
        /// </summary>
        /// <param name="matrix1">Исходная матрица.</param>
        /// <param name="columnIndex">Индекс столбца для сложения.</param>
        /// <returns>Результат сложения матрицы и столбца.</returns>
        public static Matrix operator +(Matrix matrix1, int columnIndex)
        {
            Matrix result = new Matrix(matrix1.Rows, matrix1.Cols);

            for (int i = 0; i < matrix1.Rows; i++)
            {
                result[i, 0] = Math.Round(matrix1[i, 0] + matrix1[i, columnIndex], 2);
                for (int j = 1; j < matrix1.Cols; j++)
                {
                    result[i, j] = matrix1[i, j];
                }
            }

            return result;
        }

        /// <summary>
        /// Возвращает строковое представление матрицы.
        /// </summary>
        /// <returns>Строковое представление матрицы.</returns>
        public override string ToString()
        {
            string result = "";
            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Cols; j++)
                {
                    result += matrix[i, j] + " ";
                }
                result += "\n";
            }
            return result;
        }
    }
}
