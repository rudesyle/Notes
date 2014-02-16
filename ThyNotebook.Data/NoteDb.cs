using System.Collections.Generic;
using System.Linq;
using ThyNotebook.Business;

namespace ThyNotebook.Data
{
    public class NoteDb : BaseData
    {
        public List<Note> GetAll()
        {
            return GetDb().Query<Note>("SELECT * FROM Note").ToList();
        }
    }
}