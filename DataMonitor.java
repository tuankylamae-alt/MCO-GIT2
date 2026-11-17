public class DataMonitor {
    public static void main(String[] args) {
        int totalData = 50;
        int usedData = 25;
        int remaining = totalData - usedData;

        System.out.println("===== DATA USAGE REPORT =====");
        System.out.println("Total Data: " + totalData + " GB");
        System.out.println("Used Data: " + usedData + " GB");
        System.out.println("Remaining: " + remaining + " GB");

        if (remaining <= 5) {
            System.out.println("Warning: Low Data!");
        } else {
            System.out.println("Status: Data Available");
        }
    }
}