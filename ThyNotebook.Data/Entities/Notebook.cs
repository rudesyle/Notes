using System;
using System.Collections.Generic;
using PetaPoco;

namespace ThyNotebook.Entities
{
    [TableName("Notebook")]
    [PrimaryKey("NotebookId")]
    [ExplicitColumns]
    public class Notebook
    {
        [Column(Name = "name")]
        public string Name { get; set; }

        [Column(Name = "description")]
        public string Description { get; set; }

        [Column(Name = "notebookid")]
        public int NotebookId { get; set; }

        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int UserId { get; set; }

        [ResultColumn]
        public ICollection<Note> Notes { get; set; }

        [ResultColumn]
        public bool IsDeleted { get; set; }
    }
}