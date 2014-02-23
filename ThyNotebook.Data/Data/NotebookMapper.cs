using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThyNotebook.Business;

namespace ThyNotebook.Data
{
    public class NotebookMapper
    {
        private Notebook current;

        public Notebook MapIt(Notebook notebook, Note note)
        {
            if (notebook == null)
                return current;

            if (current != null && notebook.NotebookId == current.NotebookId)
            {
                if (current.Notes == null)
                {
                    current.Notes = new List<Note>();
                }
                current.Notes.Add(note);

                return null;
            }

            var prev = current;
            
            current = notebook;
            current.Notes = new List<Note> {note};

            return prev;
        }
    
    }
}
