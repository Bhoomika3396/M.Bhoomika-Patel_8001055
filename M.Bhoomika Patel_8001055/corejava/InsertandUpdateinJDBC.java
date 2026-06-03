import java.sql.*;

class StudentDAO {

    Connection con;

    StudentDAO() throws Exception {

        con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb",
            "root",
            "root"
        );
    }

    void insertStudent(int id, String name, int age)
        throws Exception {

        String query =
            "INSERT INTO students VALUES (?, ?, ?)";

        PreparedStatement ps =
            con.prepareStatement(query);

        ps.setInt(1, id);
        ps.setString(2, name);
        ps.setInt(3, age);

        ps.executeUpdate();

        System.out.println("Student Inserted");
    }

    void updateStudent(int id, String name)
        throws Exception {

        String query =
            "UPDATE students SET name=? WHERE id=?";

        PreparedStatement ps =
            con.prepareStatement(query);

        ps.setString(1, name);
        ps.setInt(2, id);

        ps.executeUpdate();

        System.out.println("Student Updated");
    }

    public static void main(String[] args)
        throws Exception {

        StudentDAO dao = new StudentDAO();

        dao.insertStudent(3, "Kiran", 21);

        dao.updateStudent(3, "Arjun");
    }
}