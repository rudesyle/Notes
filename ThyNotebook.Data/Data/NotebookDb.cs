using System;
using System.Collections.Generic;
using System.Linq;
using ThyNotebook.Entities;

namespace ThyNotebook.Data
{
    public class NotebookDb : BaseData
    {
        public List<Notebook> GetAll()
        {
            List<Notebook> list = GetDb().Query<Notebook>("SELECT * FROM Notebook").ToList();
            return list;
        }

        public Notebook Save(Notebook notebook)
        {
            notebook.UpdateDate = DateTime.Now;

            if (notebook.NotebookId == 0)
            {
                notebook.CreateDate = notebook.UpdateDate;
                GetDb().Insert("notebook", "notebookid", notebook);
            }
            else
            {
                GetDb().Update("notebook", "notebookid", notebook);
            }

            return notebook;
        }

        public void Delete(Notebook notebook)
        {
            GetDb().Delete("notebook", "notebookid", notebook);
        }
    }
}