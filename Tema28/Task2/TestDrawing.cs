using System.Windows.Controls;
using System.Windows.Media;
using System.Windows;

namespace Task2
{
    class TestDrawing : Control
    {
        protected override void OnRender(DrawingContext drawingContext)
        {
            Point[] points = new Point[50];
            for (int i = 0; i < 20; i++)
            {
                int xPos;
                if (i % 2 == 0)
                {
                    xPos = 10;
                }
                else
                {
                    xPos = 400;
                }
                points[i] = new Point(xPos, 10 * i);
            }
            Pen pen = new Pen(Brushes.Black, 2);

            StreamGeometry polylineGeometry = new StreamGeometry();
            using (StreamGeometryContext ctx = polylineGeometry.Open())
            {
                if (points.Length > 0)
                {
                    ctx.BeginFigure(points[0], false, false);
                    ctx.PolyLineTo(points, true, true);
                }
            }
            polylineGeometry.Freeze();
            drawingContext.DrawGeometry(null, pen, polylineGeometry);

            Point[] trianglePoints = { new Point(100, 250), new Point(50, 350), new Point(150, 350) };
            drawingContext.DrawGeometry(null, new Pen(Brushes.Black, 1), CreatePolygonGeometry(trianglePoints));

            drawingContext.DrawEllipse(null, new Pen(Brushes.Black, 1), new Point(275, 300), 75, 50);

            drawingContext.DrawEllipse(Brushes.Blue, null, new Point(450, 300), 50, 50);

            drawingContext.DrawRectangle(Brushes.Red, null, new Rect(550, 250, 150, 100));

            DrawPie(drawingContext, Brushes.Green, new Rect(700, 250, 100, 100), 0, 45);

            int[] radii = { 40, 30, 20, 10 };
            foreach (int radius in radii)
            {
                drawingContext.DrawEllipse(null, new Pen(Brushes.Black, 1), new Point(100, 420), radius, radius);
            }

            int size = 30;
            int offset = 20;
            for (int i = 0; i < 5; i++)
            {
                drawingContext.DrawRectangle(null, new Pen(Brushes.Black, 1), new Rect(100 + i * offset, 500 + i * offset * 2, size, size * 2));
            }

            int tileSize = 20;
            int rows = 8;
            int cols = 8;
            for (int row = 0; row < rows; row++)
            {
                for (int col = 0; col < cols; col++)
                {
                    if ((row + col) % 2 == 0)
                    {
                        drawingContext.DrawRectangle(Brushes.Black, null, new Rect(300 + col * tileSize, 500 + row * tileSize, tileSize, tileSize));
                    }
                }
            }
        }

        private StreamGeometry CreatePolygonGeometry(Point[] points)
        {
            StreamGeometry geometry = new StreamGeometry();
            using (StreamGeometryContext ctx = geometry.Open())
            {
                ctx.BeginFigure(points[0], true, true);
                ctx.PolyLineTo(points, true, true);
            }
            geometry.Freeze();
            return geometry;
        }

        private void DrawPie(DrawingContext drawingContext, Brush brush, Rect rect, double startAngle, double sweepAngle)
        {
            PathFigure figure = new PathFigure();
            figure.StartPoint = new Point(rect.Left + rect.Width / 2, rect.Top + rect.Height / 2);

            double centerX = rect.Left + rect.Width / 2;
            double centerY = rect.Top + rect.Height / 2;

            double startAngleRad = startAngle * Math.PI / 180;
            double endAngleRad = (startAngle + sweepAngle) * Math.PI / 180;

            double radiusX = rect.Width / 2;
            double radiusY = rect.Height / 2;

            double startX = centerX + radiusX * Math.Cos(startAngleRad);
            double startY = centerY + radiusY * Math.Sin(startAngleRad);
            double endX = centerX + radiusX * Math.Cos(endAngleRad);
            double endY = centerY + radiusY * Math.Sin(endAngleRad);

            bool isLargeArc = sweepAngle > 180.0;
            Size size = new Size(radiusX, radiusY);
            Point startPoint = new Point(startX, startY);
            Point endPoint = new Point(endX, endY);

            figure.Segments.Add(new LineSegment(startPoint, true));
            figure.Segments.Add(new ArcSegment(endPoint, size, 0, isLargeArc, SweepDirection.Clockwise, true));
            figure.Segments.Add(new LineSegment(new Point(centerX, centerY), true));

            PathGeometry geometry = new PathGeometry(new PathFigure[] { figure });
            drawingContext.DrawGeometry(brush, null, geometry);
        }

    }
}
