using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task3
{
    internal class Matrix
    {
        private double[,] matrix;
        private Random random = new Random();

        public int Rows { get; private set; }
        public int Cols { get; private set; }

        public Matrix(int rows, int cols)
        {
            Rows = rows;
            Cols = cols;
            matrix = new double[rows, cols];
            FillRandom();
        }

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

        public double this[int i, int j]
        {
            get { return matrix[i, j]; }
            set { matrix[i, j] = value; }
        }

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
