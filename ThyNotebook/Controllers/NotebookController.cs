using System.Web.Http;
using System.Web.Http.Controllers;
using Breeze.WebApi2;
using ThyNotebook.Data;
using ThyNotebook.Entities;
using ThyNotebook.Web.ViewModels;

namespace ThyNotebook.Web.Controllers
{
    [BreezeController]
    public class NotebookController : ApiController
    {
        protected override void Initialize(HttpControllerContext controllerContext)
        {
        }

        [HttpGet]
        public NotebookViewModel GetAllNotebooks()
        {
            var notebookDb = new NotebookDb();
            var noteDb = new NoteDb();
            var vm = new NotebookViewModel {Notebooks = notebookDb.GetAll(), Notes = noteDb.GetAll()};

            return vm;
        }

        [HttpPost]
        public Notebook SaveNotebook(Notebook notebook)
        {
            var notebookDb = new NotebookDb();
            return notebookDb.Save(notebook);
        }

        [HttpPost]
        public Note SaveNote(Note note)
        {
            var noteDb = new NoteDb();
            return noteDb.Save(note);
        }

        [HttpPost]
        public void DeleteNote(Note note)
        {
            var noteDb = new NoteDb();
            noteDb.DeleteNote(note);
        }

        [HttpPost]
        public void DeleteNotebook(Notebook noteBook)
        {
            var notebookDb = new NotebookDb();
            notebookDb.Delete(noteBook);
        }
    }
}