using System;
using System.Collections.Generic;
using PetaPoco;

namespace ThyNotebook.Business
{
    [PetaPoco.TableName("Notebook")]
    [PetaPoco.PrimaryKey("NotebookId")]
    public class Notebook
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int NotebookId { get; protected set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int UserId { get; set; }

        [PetaPoco.ResultColumn]
        public ICollection<Note> Notes { get; set; }

    }
}