using System;
using PetaPoco;

namespace ThyNotebook.Entities
{
    [TableName("NoteContent")]
    [PrimaryKey("NoteContentId")]
    public class NoteContent
    {
        public int NoteContentId { get; set; }
        public int NoteId { get; protected set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
    }
}