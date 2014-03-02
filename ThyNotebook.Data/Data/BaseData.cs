using PetaPoco;

namespace ThyNotebook.Data
{
    public abstract class BaseData
    {
        protected Database GetDb()
        {
            return new Database("ThyNotebookConnection");
        }
    }
}