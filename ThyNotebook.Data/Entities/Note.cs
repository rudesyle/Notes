using System;
using PetaPoco;

namespace ThyNotebook.Entities
{
    [TableName("note")]
    [PrimaryKey("NoteId")]
    [ExplicitColumns]
    public class Note
    {
        [Column(Name = "notebookid")]
        public int NotebookId { get; set; }

        [Column(Name = "noteid")]
        public int NoteId { get; set; }

        [Column(Name = "name")]
        public string Name { get; set; }

        [Column(Name = "content")]
        public string Content { get; set; }

        [Column(Name = "createdate")]
        public DateTime CreateDate { get; set; }

        [Column(Name = "updatedate")]
        public DateTime UpdateDate { get; set; }

        public bool IsNew { get; set; }
    }
}