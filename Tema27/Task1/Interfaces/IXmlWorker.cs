using Task1.Models;

namespace Task1.Interfaces
{
    public interface IXmlWorker
    {
        void Load(string xmlDocPath);
        void Add(Flower flower);
        void Delete(string type);
        Flower FindBy(string type);
        List<Flower> GetAll();
    }
}
