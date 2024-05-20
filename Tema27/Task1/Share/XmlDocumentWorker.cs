using Task1.Interfaces;
using System.Xml;
using Microsoft.Extensions.Logging;
using Task1.Models;

namespace Task1.Share
{
    public class XmlDocumentWorker : IXmlWorker
    {
        private readonly XmlDocument _xmlDocument;
        private readonly ILogger _logger;
        private string _xmlFilePath;

        public XmlDocumentWorker(ILogger logger)
        {
            _logger = logger;
            _xmlDocument = new XmlDocument();
        }

        public void Add(Flower flower)
        {
            var xRoot = _xmlDocument.DocumentElement;

            XmlElement flowerElem = _xmlDocument.CreateElement("Flower");

            XmlAttribute typeAttribute = _xmlDocument.CreateAttribute("Type");
            XmlText typeText = _xmlDocument.CreateTextNode(flower.Type);
            typeAttribute.AppendChild(typeText);
            flowerElem.Attributes.Append(typeAttribute);

            XmlElement priceElem = _xmlDocument.CreateElement("Price");
            XmlText priceText = _xmlDocument.CreateTextNode(flower.Price.ToString());
            priceElem.AppendChild(priceText);

            flowerElem.AppendChild(priceElem);

            xRoot.AppendChild(flowerElem);
            _xmlDocument.Save(_xmlFilePath);
        }

        public void Delete(string type)
        {
            var xRoot = _xmlDocument.DocumentElement;
            foreach (XmlNode xNode in xRoot)
            {
                if (xNode.Attributes.Count > 0)
                {
                    var attributeType = xNode.Attributes.GetNamedItem("Type");
                    try
                    {
                        var attributeTypeText = attributeType?.InnerText;
                        if (attributeTypeText.Equals(type))
                        {
                            xRoot.RemoveChild(xNode);
                            _xmlDocument.Save(_xmlFilePath);
                        }
                    }
                    catch (Exception ex) when (ex is XmlException || ex is NullReferenceException)
                    {
                        _logger.LogWarning(ex.Message, nameof(attributeType));
                    }
                }
            }
        }

        public Flower FindBy(string type)
        {
            Flower flower = null;
            var xRoot = _xmlDocument.DocumentElement;
            foreach (XmlNode xNode in xRoot)
            {
                flower = GetFlower(xNode);
                if (flower.Type.Equals(type))
                {
                    return flower;
                }
            }

            return flower;
        }

        public List<Flower> GetAll()
        {
            List<Flower> flowers = new List<Flower>();
            var xRoot = _xmlDocument.DocumentElement;
            foreach (XmlNode xNode in xRoot)
            {
                var flower = GetFlower(xNode);
                flowers.Add(flower);
            }

            return flowers;
        }

        public void Load(string xmlFilePath)
        {
            _xmlFilePath = xmlFilePath;
            _xmlDocument.Load(xmlFilePath);
        }

        private Flower GetFlower(XmlNode xNode)
        {
            var flower = new Flower();
            if(xNode.Attributes.Count > 0)
            {
                var attributeType = xNode.Attributes.GetNamedItem("Type");
                flower.Type = attributeType?.Value;
            }
            foreach (XmlNode childNode in xNode.ChildNodes)
            {
                try
                {
                    if (childNode.Name == "Price")
                    {
                        flower.Price = double.Parse(childNode.InnerText);
                    }
                }
                catch (Exception ex) when (ex is FormatException || ex is NullReferenceException)
                {
                    _logger.LogError(ex.Message, ex.StackTrace, nameof(childNode.InnerText));
                }
            }
            return flower;
        }
    }
}