using System;
using System.Linq;

namespace ThyNotebook.Data
{
    public abstract class BaseData
    {
        protected PetaPoco.Database GetDb()
        {
            return new PetaPoco.Database("ThyNotebookConnection");
        }

    }
}