using System;

namespace ThyNotebook.Web.Models
{
    public class Note
    {
        public virtual int NotebookId { get; set; }
        public virtual int NoteId { get; protected set; }
        public virtual string Name { get; set; }
        public virtual string Content { get; set; }
        public virtual DateTime? CreateDate { get; set; }
    }
}