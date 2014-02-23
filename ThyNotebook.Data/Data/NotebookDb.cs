using System;
using System.Collections.Generic;
using System.Linq;
using ThyNotebook.Business;

namespace ThyNotebook.Data
{
    public class NotebookDb : BaseData
    {
        public List<Notebook> GetAll()
        {
            return GetDb().Query<Notebook>("SELECT * FROM Notebook").ToList();
        }

        public Notebook Save(Notebook notebook)
        {
            notebook.UpdateDate = DateTime.Now;

            if (notebook.NotebookId == 0)
            {

                notebook.CreateDate = notebook.UpdateDate;
                GetDb().Insert("notebook", "NotebookId", notebook);
            }
            else
            {
                GetDb().Update("notebook", "NotebookId", notebook);
            }

            return notebook;
        }
    }
}