using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThyNotebook.Business;

namespace ThyNotebook.Web.ViewModels
{
    public class NotebookViewModel
    {
        public List<Notebook> Notebooks { get; set; }
        public List<Note> Notes { get; set; } 
    }
}