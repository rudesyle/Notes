using System.Collections.Generic;
using ThyNotebook.Entities;

namespace ThyNotebook.Web.ViewModels
{
    public class NotebookViewModel
    {
        public List<Notebook> Notebooks { get; set; }
        public List<Note> Notes { get; set; }
    }
}