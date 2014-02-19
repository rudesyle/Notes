using System;

namespace ThyNotebook.Business
{
    [PetaPoco.TableName("NoteContent")]
    [PetaPoco.PrimaryKey("NoteContentId")]
    public class NoteContent
    {
        public int NoteContentId { get; set; }
        public int NoteId { get; protected set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
    }
}