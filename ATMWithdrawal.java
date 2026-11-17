public class ATMWithdrawal {
    public static void main(String[] args) {
        int balance = 5000;
        int withdrawal = 1500;

        System.out.println("===== ATM MACHINE =====");
        System.out.println("Initial Balance: ₱" + balance);
        System.out.println("Withdrawal: ₱" + withdrawal);

        if (withdrawal <= balance) {
            balance -= withdrawal;
            System.out.println("Transaction Successful!");
            System.out.println("Remaining Balance: ₱" + balance);
        } else {
            System.out.println("Insufficient Balance!");
        }
    }
}