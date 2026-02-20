namespace OrderingSystemMenza.Models
{
    public class Person
    {
        //temp study programs
        private string[] studyPrograms = { "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology" };

        #region getters and setters
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        private double Balance { get; set; } = 0.0;
        private List<Order> Orders = new List<Order>();

        #endregion


    }
}
