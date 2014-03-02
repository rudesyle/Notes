using System;
using System.Collections.Generic;
using System.Linq;
using ThyNotebook.Entities;

namespace ThyNotebook.Data
{
    public class NoteDb : BaseData
    {
        public List<Note> GetAll()
        {
            return GetDb().Query<Note>("SELECT * FROM Note").ToList();
        }

        public void Save(Note note)
        {
            note.UpdateDate = DateTime.Now;

            if (note.NoteId == 0)
            {
                note.CreateDate = note.UpdateDate;
                GetDb().Insert("note", "noteid", note);
            }
            else
            {
                GetDb().Update("note", "noteid", note);
            }
        }

        public void DeleteNote(Note note)
        {
            GetDb().Delete("note", "noteid", note);
        }
    }
}