using Breeze.ContextProvider.NH;

namespace ThyNotebook.Web.Models
{
    public class ThyNotebookContext : NHContext
    {
        public ThyNotebookContext() : base(NHConfig.OpenSession(), NHConfig.Configuration)
        {
        }

        public ThyNotebookContext Context
        {
            get { return this; }
        }

        public NhQueryableInclude<Notebook> Notebooks
        {
            get { return GetQuery<Notebook>(); }
        }

        public NhQueryableInclude<Note> Notes
        {
            get { return GetQuery<Note>(); }
        }
    }
}