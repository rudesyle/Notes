using System;

namespace ThyNotebook.Business
{
    [PetaPoco.TableName("note")]
    [PetaPoco.PrimaryKey("NoteId")]
    public class Note
    {
        public int NotebookId { get; set; }

        public int NoteId { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}