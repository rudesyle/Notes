using System;
using System.Collections.Generic;

namespace ThyNotebook.Web.Models
{
    public class Notebook
    {
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual int NotebookId { get; protected set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual int UserId { get; set; }
        public virtual ICollection<Note> Notes { get; set; }
        public virtual int RowVersion { get; set; }
    }
}