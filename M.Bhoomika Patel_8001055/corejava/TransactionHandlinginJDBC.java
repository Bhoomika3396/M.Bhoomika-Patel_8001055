import java.sql.*;

class TransactionDemo {

    static void transfer(
        Connection con,
        int from,
        int to,
        double amount
    ) throws Exception {

        con.setAutoCommit(false);

        try {

            PreparedStatement debit =
                con.prepareStatement(
                    "UPDATE accounts SET balance = balance - ? WHERE id=?"
                );

            debit.setDouble(1, amount);
            debit.setInt(2, from);

            debit.executeUpdate();

            PreparedStatement credit =
                con.prepareStatement(
                    "UPDATE accounts SET balance = balance + ? WHERE id=?"
                );

            credit.setDouble(1, amount);
            credit.setInt(2, to);

            credit.executeUpdate();

            con.commit();

            System.out.println("Transaction Successful");

        } catch(Exception e) {

            con.rollback();

            System.out.println("Transaction Failed");

        }
    }

    public static void main(String[] args)
        throws Exception {

        Connection con =
            DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/testdb",
                "root",
                "root"
            );

        transfer(con, 1, 2, 500);

        con.close();
    }
}