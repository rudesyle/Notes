using System.Collections.Generic;
using System.Linq;
using ThyNotebook.Business;

namespace ThyNotebook.Data
{
    public class NotebookDb : BaseData
    {
        public List<Notebook> GetAll()
        {
            /*List<Notebook> q = GetDb().Fetch<Notebook, Note, Notebook>(
                new NotebookMapper().MapIt,
                "SELECT * FROM Notebook LEFT JOIN Note AS Notes ON Notebook.NotebookId=Notes.NotebookId ");
            */
            return GetDb().Query<Notebook>("SELECT * FROM Notebook").ToList();
        }
    }
}